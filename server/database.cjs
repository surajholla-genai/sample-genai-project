const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.json');

function initDB() {
  if (!fs.existsSync(dbFile)) {
    const initial = { categories: [], quizzes: [], results: [], users: [] };
    fs.writeFileSync(dbFile, JSON.stringify(initial, null, 2));
  }
}

function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB, initDB, dbFile };
