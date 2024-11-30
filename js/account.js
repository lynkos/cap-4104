function register(){
    var user = document.getElementById('user');
    var pw = document.getElementById('pw');
    var email = document.getElementById('email');
    var name = document.getElementById('name');

    // TODO Input validation for email and name, and rewrite if-else block
    if(user.value.length == 0 && pw.value.length == 0) {
        alert('Please fill in username and password');
    } else if(user.value.length == 0) {
        alert('Please fill in username');
    } else if(pw.value.length == 0) {
        alert('Please fill in password');
    } else {
        localStorage.setItem('user', user.value);
        localStorage.setItem('pw', pw.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('name', name.value);
        alert('Your account has been created');
    }
}

function login() {
    var storedUser = localStorage.getItem('user');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    if(userName.value == storedUser && userPw.value == storedPw) {
        alert('You are logged in.');
    } else {
        alert('Error on login');
    }
}