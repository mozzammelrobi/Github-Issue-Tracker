document.getElementById('login-btn').addEventListener('click', (event) => {
    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
    
    if(userName === 'admin' && password ==='admin123'){
        alert('Login successfull')
        window.location.assign('main.html')

    }else{
        alert('invalid password')
    }
})