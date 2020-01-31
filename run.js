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

let listDosen = `${space}
silahkan pilih opsi di bawah ini
[1] daftar dosen
[2] cari dosen
[3] tambah dosen
[4] hapus dosen
[5] kembali
${space}`

let listJurusan = `${space}
silahkan pilih opsi di bawah ini
[1] daftar jurusan
[2] cari jurusan
[3] tambah jurusan
[4] hapus jurusan
[5] kembali
${space}`

let listMatkul = `${space}
silahkan pilih opsi di bawah ini
[1] daftar mata kuliah
[2] cari mata kuliah
[3] tambah mata kuliah
[4] hapus mata kuliah
[5] kembali
${space}`

let listKontrak = `${space}
silahkan pilih opsi di bawah ini
[1] daftar kontrak mata kuliah
[2] cari kontrak mata kuliah
[3] tambah kontrak mata kuliah
[4] hapus kontrak mata kuliah
[5] kembali
${space}`

const menuMhs = () => {
    console.log(listMhs);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                let table = new Table({
                    head: ['NIM', 'Nama', 'alamat', 'jurusan'],
                    colWidths: [7, 20, 15, 10]
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
                let table2 = new Table({
                    head: ['NIM', 'Nama', 'alamat', 'jurusan'],
                    colWidths: [7, 20, 15, 10]
                })
                console.log(space);
                console.log('lengkapi data dibawah ini: ');
                let forAddMhs = {
                    nim: 0,
                    name: '',
                    jurusan: 0,
                    alamat: ''
                };
                rl.question('nim: ', (jawab) => {
                    forAddMhs.nim = parseInt(jawab);
                    rl.question('nama: ', (jawab) => {
                        forAddMhs.name = jawab;
                        rl.question('jurusan: ', (jawab) => {
                            forAddMhs.jurusan = parseInt(jawab);
                            rl.question('alamat: ', (jawab) => {
                                forAddMhs.alamat = jawab;
                                console.log(space);
                                db.serialize(() => {
                                    let sql = `insert into mahasiswa (nim, nama_mahasiswa, alamat, id_jurusan) values(${forAddMhs.nim}, '${forAddMhs.name}', '${forAddMhs.alamat}', ${forAddMhs.jurusan})`
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        let sql = 'select * from mahasiswa';
                                        db.all(sql, (err, rows) => {
                                            if (err) throw err;
                                            if (rows) {
                                                rows.forEach(mhs => {
                                                    table2.push(
                                                        [`${mhs.nim}`, `${mhs.nama_mahasiswa}`, `${mhs.alamat}`, `${mhs.id_jurusan}`]
                                                    )
                                                })
                                                console.log(`${table2.toString()}`);
                                                menuMhs();
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                break;

            case '4':
                let table3 = new Table({
                    head: ['NIM', 'Nama', 'alamat', 'jurusan'],
                    colWidths: [7, 20, 15, 10]
                })
                console.log(space);
                rl.question('Masukkan NIM yang akan dihapus: ', (ans) => {
                    db.serialize(() => {
                        let sql = `delete from mahasiswa where nim=${parseInt(ans)}`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log(`Mahasiswa dengan NIM: ${ans} telah dihapus`)
                            console.log(space);
                            let sql = 'select * from mahasiswa';
                            db.all(sql, (err, rows) => {
                                if (err) throw err;
                                if (rows) {
                                    rows.forEach(mhs => {
                                        table3.push(
                                            [`${mhs.nim}`, `${mhs.nama_mahasiswa}`, `${mhs.alamat}`, `${mhs.id_jurusan}`]
                                        )
                                    })
                                    console.log(`${table3.toString()}`);
                                    menuMhs();
                                }
                            })
                        })
                    })
                })
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

const menuJurusan = () => {
    console.log(listJurusan);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                let table = new Table({
                    head: ['ID', 'Nama Jurusan'],
                    colWidths: [7, 20]
                })
                db.serialize(() => {
                    let sql = 'select * from jurusan';
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(jur => {
                                table.push(
                                    [`${jur.id_jurusan}`, `${jur.nama_jurusan}`]
                                )
                            })
                            console.log(`${table.toString()}`);
                            menuJurusan();
                        }
                    })
                });
                break;

            case '2':
                console.log(space);
                rl.question('masukkan id: ', (ans) => {
                    db.serialize(() => {
                        let sql = `select * from jurusan where id_jurusan=${parseInt(ans)}`;
                        db.all(sql, (err, rows) => {
                            if (err) throw err;
                            if (rows.length === 1) {
                                console.log(space);
                                console.log('jurusan details')
                                console.log(space);
                                rows.forEach(jur => {
                                    console.log(`id\t: ${jur.id_jurusan}\nID\t: ${jur.nama_jurusan}`);
                                })
                                menuJurusan();
                            } else {
                                console.log(`Jurusan dengan ID: ${ans} tidak terdaftar`);
                                menuJurusan();
                            }
                        })
                    });
                })
                break;

            case '3':
                let table2 = new Table({
                    head: ['ID', 'Nama Jurusan'],
                    colWidths: [7, 20]
                })
                console.log(space);
                console.log('lengkapi data dibawah ini: ');
                let forAddJurusan = {
                    id: 0,
                    name: '',
                };
                rl.question('ID: ', (answer) => {
                    forAddJurusan.id = parseInt(answer);
                    rl.question('Nama: ', (answer) => {
                        forAddJurusan.name = answer;
                        db.serialize(() => {
                            let sql = `insert into jurusan(id_jurusan, nama_jurusan) values(${forAddJurusan.id}, '${forAddJurusan.name}')`;
                            db.run(sql, (err) => {
                                if (err) throw err;
                                let sql = 'select * from jurusan';
                                db.all(sql, (err, rows) => {
                                    if (err) throw err;
                                    if (rows) {
                                        rows.forEach(jur => {
                                            table2.push(
                                                [`${jur.id_jurusan}`, `${jur.nama_jurusan}`]
                                            )
                                        })
                                        console.log(`${table2.toString()}`);
                                        menuJurusan();
                                    }
                                })
                            })
                        })
                    })
                })
                break;

            case '4':
                let table3 = new Table({
                    head: ['ID', 'Nama Jurusan'],
                    colWidths: [7, 20]
                })
                console.log(space);
                rl.question('Masukkan ID yang akan dihapus: ', (ans) => {
                    db.serialize(() => {
                        let sql = `delete from jurusan where id_jurusan=${parseInt(ans)}`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log(`Jurusan dengan ID: ${ans} telah dihapus`)
                            console.log(space);
                            let sql = 'select * from jurusan';
                            db.all(sql, (err, rows) => {
                                if (err) throw err;
                                if (rows) {
                                    rows.forEach(jur => {
                                        table3.push(
                                            [`${jur.id_jurusan}`, `${jur.nama_jurusan}`]
                                        )
                                    })
                                    console.log(`${table3.toString()}`);
                                    menuJurusan();
                                }
                            })
                        })
                    })
                })
                break;

            case '5':
                menu();
                break;
            default:
                console.log('List yang dimaksud tidak ada');
                menuJurusan();
                break;
        }
    })
}

const menuDosen = () => {
    console.log(listDosen);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                let table = new Table({
                    head: ['ID', 'Nama'],
                    colWidths: [7, 20]
                })
                db.serialize(() => {
                    let sql = 'select * from dosen';
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(dosen => {
                                table.push(
                                    [`${dosen.id_dosen}`, `${dosen.nama_dosen}`]
                                )
                            })
                            console.log(`${table.toString()}`);
                            menuDosen();
                        }
                    })
                });
                break;

            case '2':
                console.log(space);
                rl.question('masukkan ID dosen: ', (ans) => {
                    db.serialize(() => {
                        let sql = `select * from dosen where id_dosen=${parseInt(ans)}`;
                        db.all(sql, (err, rows) => {
                            if (err) throw err;
                            if (rows.length === 1) {
                                console.log(space);
                                console.log('dosen details')
                                console.log(space);
                                rows.forEach(dosen => {
                                    console.log(`ID\t: ${dosen.id_dosen}\nnama\t: ${dosen.nama_dosen}`);
                                })
                                menuDosen();
                            } else {
                                console.log(`dosen dengan ID ${ans} tidak terdaftar`);
                                menuDosen();
                            }
                        })
                    });
                })
                break;

            case '3':
                let table2 = new Table({
                    head: ['ID', 'Nama'],
                    colWidths: [7, 20]
                })
                console.log(space);
                console.log('lengkapi data dibawah ini: ');
                let forAddDosen = {
                    id: 0,
                    name: '',
                };
                rl.question('ID: ', (answer) => {
                    forAddDosen.id = parseInt(answer);
                    rl.question('Nama: ', (answer) => {
                        forAddDosen.name = answer;
                        db.serialize(() => {
                            let sql = `insert into dosen(id_dosen, nama_dosen) values(${forAddDosen.id}, '${forAddDosen.name}')`;
                            db.run(sql, (err) => {
                                if (err) throw err;
                                let sql = 'select * from dosen';
                                db.all(sql, (err, rows) => {
                                    if (err) throw err;
                                    if (rows) {
                                        rows.forEach(dosen => {
                                            table2.push(
                                                [`${dosen.id_dosen}`, `${dosen.nama_dosen}`]
                                            )
                                        })
                                        console.log(`${table2.toString()}`);
                                        menuDosen();
                                    }
                                })
                            })
                        })
                    })
                })
                break;

            case '4':
                let table3 = new Table({
                    head: ['ID', 'Nama'],
                    colWidths: [7, 20]
                })
                console.log(space);
                rl.question('Masukkan ID yang akan dihapus: ', (ans) => {
                    db.serialize(() => {
                        let sql = `delete from dosen where id_dosen=${parseInt(ans)}`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log(`Dosen dengan ID: ${ans} telah dihapus`)
                            console.log(space);
                            let sql = 'select * from dosen';
                            db.all(sql, (err, rows) => {
                                if (err) throw err;
                                if (rows) {
                                    rows.forEach(dosen => {
                                        table3.push(
                                            [`${dosen.id_dosen}`, `${dosen.nama_dosen}`]
                                        )
                                    })
                                    console.log(`${table3.toString()}`);
                                    menuDosen();
                                }
                            })
                        })
                    })
                })
                break;

            case '5':
                menu();
                break;
            default:
                console.log('List yang dimaksud tidak ada');
                menuDosen();
                break;
        }
    })
}

const menuMatkul = () => {
    console.log(listMatkul);
    rl.question('masukkan opsi: ', (answer) => {
        switch (answer) {
            case '1':
                let table = new Table({
                    head: ['ID', 'Nama', 'SKS'],
                    colWidths: [7, 30, 7]
                })
                db.serialize(() => {
                    let sql = 'select * from mata_kuliah';
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(matkul => {
                                table.push(
                                    [`${matkul.id_matkul}`, `${matkul.nama_matkul}`, `${matkul.sks}`]
                                )
                            })
                            console.log(`${table.toString()}`);
                            menuMatkul();
                        }
                    })
                });
                break;

            case '2':
                console.log(space);
                rl.question('masukkan ID matkul: ', (ans) => {
                    db.serialize(() => {
                        let sql = `select * from mata_kuliah where id_matkul=${parseInt(ans)}`;
                        db.all(sql, (err, rows) => {
                            if (err) throw err;
                            if (rows.length === 1) {
                                console.log(space);
                                console.log('mata kuliah details')
                                console.log(space);
                                rows.forEach(matkul => {
                                    console.log(`ID\t: ${matkul.id_matkul}\nnama\t: ${matkul.nama_matkul}\nsks\t: ${matkul.sks}`);
                                })
                                menuMatkul();
                            } else {
                                console.log(`mata kuliah dengan ID ${ans} tidak terdaftar`);
                                menuMatkul();
                            }
                        })
                    });
                })
                break;

            case '3':
                console.log(space);
                console.log('lengkapi data dibawah ini: ');
                let forAddMatkul = {
                    id: 0,
                    name: '',
                    sks: 0
                };
                let table2 = new Table({
                    head: ['ID', 'Nama', 'SKS'],
                    colWidths: [7, 30, 7]
                })
                rl.question('ID: ', (ans) => {
                    forAddMatkul.id = parseInt(ans);
                    rl.question('Nama: ', (ans) => {
                        forAddMatkul.name = ans;
                        rl.question('SKS: ', (ans) => {
                            forAddMatkul.sks = ans;
                            db.serialize(() => {
                                let sql = `insert into mata_kuliah(id_matkul, nama_matkul, sks) values(${forAddMatkul.id}, '${forAddMatkul.name}', ${forAddMatkul.sks})`;
                                db.run(sql, (err) => {
                                    if (err) throw err;
                                    let sql = 'select * from mata_kuliah';
                                    db.all(sql, (err, rows) => {
                                        if (err) throw err;
                                        if (rows) {
                                            rows.forEach(matkul => {
                                                table2.push(
                                                    [`${matkul.id_matkul}`, `${matkul.nama_matkul}`, `${matkul.sks}`]
                                                )
                                            })
                                            console.log(`${table2.toString()}`);
                                            menuMatkul();
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
                break;

            case '4':
                let table3 = new Table({
                    head: ['ID', 'Nama', 'SKS'],
                    colWidths: [7, 30, 7]
                })
                console.log(space);
                rl.question('Masukkan ID yang akan dihapus: ', (ans) => {
                    db.serialize(() => {
                        let sql = `delete from mata_kuliah where id_matkul=${parseInt(ans)}`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log(`Mata kuliah dengan ID: ${ans} telah dihapus`)
                            console.log(space);
                            let sql = 'select * from mata_kuliah';
                            db.all(sql, (err, rows) => {
                                if (err) throw err;
                                if (rows) {
                                    rows.forEach(matkul => {
                                        table3.push(
                                            [`${matkul.id_matkul}`, `${matkul.nama_matkul}`, `${matkul.sks}`]
                                        )
                                    })
                                    console.log(`${table3.toString()}`);
                                    menuMatkul();
                                }
                            })
                        })
                    })
                })
                break;

            case '5':
                menu();
                break;
            default:
                console.log('List yang dimaksud tidak ada');
                menuMatkul();
                break;
        }
    })
}

const menuKontrak = () => {
    console.log(listKontrak);
    rl.question('Masukkan opsi: ', (ans) => {
        switch (ans) {
            case '1':
                let table = new Table({
                    head: ['ID', 'Nilai', 'NIM', 'ID Matkul', 'ID Dosen'],
                    colWidths: [7, 7, 7, 10, 10]
                })
                db.serialize(() => {
                    let sql = 'select * from kontrak';
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(kontrak => {
                                table.push(
                                    [`${kontrak.id_kontrak}`, `${kontrak.nilai}`, `${kontrak.nim}`, `${kontrak.id_matkul}`, `${kontrak.id_dosen}`]
                                )
                            })
                            console.log(`${table.toString()}`);
                            menuKontrak();
                        }
                    })
                });
                break;
            
            case '5':
                menu();
                break;
                
            default:
                console.log('Baru ada fitur read aja ya broo wkwkw, sabar');
                menuKontrak();
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

            case '2':
                menuJurusan();
                break;

            case '3':
                menuDosen();
                break;

            case '4':
                menuMatkul();
                break;

            case '5':
                menuKontrak();
                break;

            case '6':
                console.log(space)
                console.log('Bye!');
                console.log(msg);
                rl.question('username: ', (answer) => {
                    if (answer === 'piscki') {
                        console.log(space)
                        rl.question('password: ', (answer) => {
                            if (answer === '12345') {
                                console.log(space)
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
        console.log(space)
        rl.question('password: ', (answer) => {
            if (answer === '12345') {
                console.log(space)
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