document.getElementById('submitButton').addEventListener('click', function() {
    var globalInputName = document.getElementById('inputName').value;
    var globalInputPass = document.getElementById('inputPass').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: globalInputName,
            password: globalInputPass
        })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});


