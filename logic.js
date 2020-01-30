const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./university.db');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let msg = `=================================================
welcome to UPI
Jl. Kopo 163
=================================================`

let list = `=================================================
silahkan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] dosen
[4] mata kuliah
[5] kontrak
[6] keluar
=================================================`

let listMhs = `=================================================
silahkan pilih opsi di bawah ini
[1] daftar murid
[2] cari murid
[3] tambah murid
[4] hapus murid
[5] kembali
=================================================`

function menuMhs() {
    console.log(listMhs);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                db.all(`select * from mahasiswa`, (err, mhs) => {
                    console.log(mhs);
                    menuMhs();
                })
                break;
            case '2':
                console.log(`=================================================`)
                rl.question('Masukkan NIM: ', (answer) => {
                    if (answer) {}
                })
                console.log('cari mah nanti wkwkwkwkwwk');
                menuMhs();
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