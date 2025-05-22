const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { readDB, writeDB } = require('./database.cjs');

function parseMCQsFromText(text) {
  // Example MCQ format: Q: ...\nA) ...\nB) ...\nC) ...\nD) ...\nAnswer: ...\nTags: ...
  const mcqBlocks = text.split(/\n(?=Q: )/g);
  return mcqBlocks
    .map((block, index) => {
      const qMatch = block.match(/Q: (.*)/);
      const aMatch = block.match(/A\) (.*)/);
      const bMatch = block.match(/B\) (.*)/);
      const cMatch = block.match(/C\) (.*)/);
      const dMatch = block.match(/D\) (.*)/);
      const answerMatch = block.match(/Answer: (.*)/);
      const tagsMatch = block.match(/Tags: (.*)/);
      if (!qMatch) return null;

      const options = [aMatch?.[1] || '', bMatch?.[1] || '', cMatch?.[1] || '', dMatch?.[1] || ''];

      let correctAnswer = -1;
      if (answerMatch) {
        const ans = answerMatch[1].trim();
        const letterIndex = ['A', 'B', 'C', 'D'].indexOf(ans.toUpperCase());
        if (letterIndex !== -1) {
          correctAnswer = letterIndex;
        } else {
          const optIndex = options.findIndex(o => o === ans);
          if (optIndex !== -1) {
            correctAnswer = optIndex;
          } else {
            const num = parseInt(ans, 10);
            if (!isNaN(num)) {
              if (num >= 0 && num < options.length) correctAnswer = num;
              else if (num > 0 && num <= options.length) correctAnswer = num - 1;
            }
          }
        }
      }

      return {
        id: index + 1,
        question: qMatch[1]?.trim() || '',
        options,
        correctAnswer,
        explanation: '',
        tags: tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean) || [],
      };
    })
    .filter(Boolean);
}

function handleUploadQuizDoc(req, res) {
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      res.statusCode = 400;
      res.end('File upload error');
      return;
    }
    const filePath = files.file.filepath || files.file.path;
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const mcqs = parseMCQsFromText(result.value);
      if (!mcqs.length) {
        res.statusCode = 400;
        res.end('No MCQs found in document');
        return;
      }
      const db = readDB();
      const quiz = {
        id: 'quiz_' + Date.now(),
        title: fields.title || 'Generated Quiz',
        questions: mcqs,
        createdAt: new Date().toISOString(),
      };
      db.quizzes.push(quiz);
      writeDB(db);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, quiz }));
    } catch (e) {
      res.statusCode = 500;
      res.end('Failed to process document');
    }
  });
}

module.exports = { handleUploadQuizDoc };
