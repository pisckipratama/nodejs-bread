// challange 18
const readline = require('readline-sync');

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
let user = [{name: "piscki", admin: true, pass: "12345"}, {name:"pratama", admin:false, pass: "nopassword"}];

console.log(msg);
let username = readline.question('Username: ');
console.log('=================================================')
let password = readline.question('Password: ', {hideEchoBack: true, });
console.log('=================================================')

for(let i =0; i < user.length; i++) {
    if (user[i].name === username && user[i].pass === password) {
        console.log(`\nWelcome, ${user[i].name}. Your access level is: ${user[i].admin ? "ADMIN" : "MEMBER"}`);
        console.log(list);
        break;
    } else {
        console.log('User/Password is incorrect');
    }
}