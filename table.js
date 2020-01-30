const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
        console.log('Error when createing the database', err)
    } else {
        console.log('Database created!')
        createTab
    }
})