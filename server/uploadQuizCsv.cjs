const formidable = require('formidable');
const fs = require('fs');
const { readDB, writeDB } = require('./database.cjs');

function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(v => v.trim());
}

function parseCSV(content) {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = splitCSVLine(line);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    return obj;
  });
}

function handleUploadQuizCsv(req, res) {
  const Formidable = formidable.IncomingForm;
  const form = new Formidable();
  form.parse(req, (err, fields, files) => {
    console.log('[upload-quiz-csv] Incoming request');
    console.log('[upload-quiz-csv] fields:', fields);
    console.log('[upload-quiz-csv] files:', files);
    if (err || !files.file) {
      console.error('[upload-quiz-csv] File upload error:', err, files);
      res.statusCode = 400;
      res.end('File upload error');
      return;
    }
    const fileObj = files.file instanceof Array ? files.file[0] : files.file;
    const filePath = fileObj && (fileObj.filepath || fileObj.path);
    console.log('[upload-quiz-csv] Uploaded file path:', filePath);
    if (!filePath) {
      res.statusCode = 400;
      res.end('File path not found in upload');
      return;
    }
    try {
      const csv = fs.readFileSync(filePath, 'utf8');
      console.log('[upload-quiz-csv] CSV file content:', csv.slice(0, 500)); // log first 500 chars
      const rows = parseCSV(csv);
      console.log('[upload-quiz-csv] Parsed rows:', rows.length);
      if (!rows.length) {
        console.error('[upload-quiz-csv] No rows found in CSV');
        res.statusCode = 400;
        res.end('No rows found in CSV');
        return;
      }
      const questions = rows.map((row, idx) => {
        const options = [row.option1, row.option2, row.option3, row.option4];
        let correctAnswer = options.findIndex(o => o === row.right_answer);
        if (correctAnswer === -1) {
          const letterIndex = ['A', 'B', 'C', 'D'].indexOf((row.right_answer || '').toUpperCase());
          if (letterIndex !== -1) {
            correctAnswer = letterIndex;
          } else {
            const num = parseInt(row.right_answer, 10);
            if (!isNaN(num)) {
              if (num >= 0 && num < options.length) correctAnswer = num;
              else if (num > 0 && num <= options.length) correctAnswer = num - 1;
            }
          }
        }
        return {
          id: idx + 1,
          topic: row.topic,
          question: row.question,
          options,
          correctAnswer,
          explanation: '',
          tags: (row.tags || '').split(',').map(t => t.trim()).filter(Boolean),
        };
      });
      const db = readDB();
      const quiz = {
        id: 'quiz_' + Date.now(),
        title: rows[0].topic || fields.title || 'Uploaded Quiz',
        questions,
        createdAt: new Date().toISOString(),
      };
      db.quizzes.push(quiz);
      writeDB(db);
      console.log('[upload-quiz-csv] Quiz saved:', quiz.id);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, quiz }));
    } catch (e) {
      console.error('[upload-quiz-csv] Failed to process CSV:', e);
      res.statusCode = 500;
      res.end('Failed to process CSV');
    }
  });
}

module.exports = { handleUploadQuizCsv };
