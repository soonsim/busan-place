document.querySelector('form[action="/signup"]').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('회원가입 성공!');
        window.location.href = 'login.html';
    } else {
        alert('회원가입 실패: ' + await response.text());
    }
});

document.querySelector('form[action="/login"]').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('로그인 성공!');
        window.location.href = 'main.html';
    } else {
        alert('로그인 실패: ' + await response.text());
    }
});
