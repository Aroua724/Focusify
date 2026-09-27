document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');

    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة

            // جلب القيم من حقول الإدخال
            const firstName = document.getElementById('firstname').value;
            const lastName = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;

            // حفظ اسم المستخدم في ذاكرة المتصفح (LocalStorage)
            localStorage.setItem('focusifyUser', firstName + ' ' + lastName);

            // رسالة ترحيبية والانتقال للصفحة الرئيسية
            alert('Welcome ' + firstName + '! Account created successfully.');
            window.location.href = 'focucify.html';
        });
    }
});