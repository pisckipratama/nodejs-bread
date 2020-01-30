const db = require('./db');

db.all(`select * from mahasiswa`, (err, mhs) => {
    console.log(mhs);
})