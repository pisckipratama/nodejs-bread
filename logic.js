// challange 18 Rubicamp: University

// cli-table
const Table = require('cli-table');

// database connection
const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/db/university.db";
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});

// readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let space = '=================================================';

let msg = `${space}
welcome to UPI
Jl. Kopo 163
${space}`

let list = `${space}
silahkan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] dosen
[4] mata kuliah
[5] kontrak
[6] keluar
${space}`

let listMhs = `${space}
silahkan pilih opsi di bawah ini
[1] daftar murid
[2] cari murid
[3] tambah murid
[4] hapus murid
[5] kembali
${space}`

function menuMhs() {
    console.log(listMhs);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                let table = new Table({
                    head: ['NIM', 'Nama', 'alamat', 'jurusan'],
                    colWidths: [7, 20, 10, 10]
                })
                db.serialize(() => {
                    let sql = 'select * from mahasiswa';
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(mhs => {
                                table.push(
                                    [`${mhs.nim}`, `${mhs.nama_mahasiswa}`, `${mhs.alamat}`, `${mhs.id_jurusan}`]
                                )
                            })
                            console.log(`${table.toString()}`);
                            menuMhs();
                        }
                    })
                });
                break;

            case '2':
                console.log(space);
                rl.question('masukkan nim: ', (ans) => {
                    db.serialize(() => {
                        let sql = `select * from mahasiswa where nim=${parseInt(ans)}`;
                        db.all(sql, (err, rows) => {
                            if (err) throw err;
                            if (rows.length === 1) {
                                console.log(space);
                                console.log('student details')
                                console.log(space);
                                rows.forEach(mhs => {
                                    console.log(`nim\t: ${mhs.nim}\nnama\t: ${mhs.nama_mahasiswa}\nalamat\t: ${mhs.alamat}\njurusan\t: ${mhs.id_jurusan}`);
                                })
                                menuMhs();
                            } else {
                                console.log(`mahasiswa dengan nim ${ans} tidak terdaftar`);
                                menuMhs();
                            }
                        })
                    });
                })
                break;

            case '3':
                console.log('tambah mah nanti wkwkwkwkwwk');
                menuMhs();
                break;
            case '4':
                console.log('hapus mah nanti wkwkwkwkwwk');
                menuMhs();
                break;
            case '5':
                menu();
                break;
            default:
                console.log('List yang dimaksud tidak ada');
                menuMhs();
                break;
        }
    })
}

const menu = () => {
    console.log(list);
    rl.question('masukkan no list diatas: ', (answer) => {
        switch (answer) {
            case '1':
                menuMhs();
                break;
            case '6':
                console.log('=================================================')
                console.log('Bye!');
                console.log(msg);
                rl.question('username: ', (answer) => {
                    if (answer === 'piscki') {
                        console.log('=================================================')
                        rl.question('password: ', (answer) => {
                            if (answer === '12345') {
                                console.log('=================================================')
                                console.log('\nWelcome piscki. Your access is: ADMIN')
                                menu();
                            } else {
                                console.log('password salah')
                                rl.close();
                            }
                        })
                    } else {
                        console.log('Username tidak ada!');
                        rl.close();
                    }
                })
                break;
            default:
                console.log('gaada');
                menu()
                break;
        }
    });
}

console.log(msg);

rl.question('username: ', (answer) => {
    if (answer === 'piscki') {
        console.log('=================================================')
        rl.question('password: ', (answer) => {
            if (answer === '12345') {
                console.log('=================================================')
                console.log('\nWelcome piscki. Your access is: ADMIN')
                menu();
            } else {
                console.log('password salah')
                rl.close();
            }
        })
    } else {
        console.log('Username tidak ada!');
        rl.close();
    }
})