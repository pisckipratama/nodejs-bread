const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');

db.all(`select * from mahasiswa`, (err, mhs) => {
    console.log(mhs);
})