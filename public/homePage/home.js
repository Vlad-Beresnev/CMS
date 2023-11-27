document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton')

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            alert('Logout clicked! Implemented your log in logic.')
        })
    }
})