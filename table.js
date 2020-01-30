const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');

const Table = require('cli-table');

let table = new Table({
    head: ['TH 1 label', 'TH 2 label'],
    colWidths: [30,40]
});

let data = []

db.all(`select * from mahasiswa`, (err, mhs) => {
    data = mhs;
})

console.log(data);

console.log(table.toString());

// var Table = require('cli-table');
// var table = new Table({
//     head: ["", "Top Header 1", "Top Header 2"]
// });

// table.push({
//     'Left Header 1': ['Value Row 1 Col 1', 'Value Row 1 Col 2']
// }, {
//     'Left Header 2': ['Value Row 2 Col 1', 'Value Row 2 Col 2']
// });

// console.log(table.toString());