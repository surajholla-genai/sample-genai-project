const http = require('http');
const { readDB, writeDB } = require('./database.cjs');
const { handleUploadQuizDoc } = require('./uploadQuiz.cjs');
const { handleUploadQuizCsv } = require('./uploadQuizCsv.cjs');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const db = readDB();

  if (req.method === 'GET' && req.url === '/quizzes') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(db.quizzes));
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/quizzes/')) {
    const id = req.url.split('/')[2];
    const quiz = db.quizzes.find(q => q.id === id);
    if (quiz) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(quiz));
    } else {
      res.statusCode = 404;
      res.end('Quiz not found');
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/quizzes') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const newQuiz = JSON.parse(body);
        db.quizzes.push(newQuiz);
        writeDB(db);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(newQuiz));
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/signup') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        if (!email || !password) {
          res.statusCode = 400;
          res.end('Email and password required');
          return;
        }
        if (db.users.find(u => u.email === email)) {
          res.statusCode = 409;
          res.end('User already exists');
          return;
        }
        db.users.push({ email, password });
        writeDB(db);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const user = db.users.find(u => u.email === email && u.password === password);
        if (user) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        } else {
          res.statusCode = 401;
          res.end('Invalid credentials');
        }
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/upload-quiz-doc') {
    handleUploadQuizDoc(req, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/upload-quiz-csv') {
    handleUploadQuizCsv(req, res);
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
