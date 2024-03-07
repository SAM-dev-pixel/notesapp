const fs = require("fs");

//membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file note json jika belum ada
const dataPath = "./data/notes.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadNotes = () => {
  const fileBuffer = fs.readFileSync("data/notes.json", "utf-8");
  const notes = JSON.parse(fileBuffer);
  return notes;
};

module.exports = { loadNotes };