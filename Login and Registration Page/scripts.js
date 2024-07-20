document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('რეგისტრაცია წარმატებით დასრულდა!');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('შესვლა წარმატებით დასრულდა!');
    });
});
