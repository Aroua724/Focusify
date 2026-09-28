document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');

    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            const firstName = document.getElementById('firstname').value;
            const lastName = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            localStorage.setItem('focusifyUser', firstName + ' ' + lastName);
            alert('Welcome ' + firstName + '! Account created successfully.');
            window.location.href = 'focucify.html';
        });
    }
});
