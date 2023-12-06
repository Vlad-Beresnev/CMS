function toggleSidebar() {
    const sidebar = document.getElementById('sidebar')
    const menuIcon = document.querySelector('.menu-icon i')

    if (!sidebar.classList.contains('open')) {
        // If sidebar is not open, open it
        sidebar.classList.remove('close');
        sidebar.classList.add('open');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-x');
    } else {
        // If sidebar is open, close it
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
        menuIcon.classList.remove('fa-x');
        menuIcon.classList.add('fa-bars');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greetingText')
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const logOutPage = database.pages.find((page) => page.id === '1')
    const greetingText = logOutPage.page_heading
    greetingElement.textContent = greetingText

})


document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greetingText');
    const greetEdit = document.getElementById('greetEdit');
    const greetFinish = document.getElementById('greetFinish');
    const greetingInput = document.getElementById('greetingInput');


    // Function to update greeting text on the page
    const updateGreetingText = (newGreetingText) => {
        greetingElement.textContent = newGreetingText;
    };

    // Fetch the initial greeting text from the server
    fetch('/database.json')
        .then(response => response.json())
        .then(data => {
            const logOutPage = data.pages.find((page) => page['id'] === '1');
            if (logOutPage) {
                updateGreetingText(logOutPage.page_heading);
            }
        })
        .catch(error => console.error(error));


    greetEdit.addEventListener('click', () => {
        greetingInput.style.display = 'inline'
        greetFinish.style.display = 'inline'

        greetingInput.focus()
        
        // Send a PUT request to update the greeting text
    greetFinish.addEventListener('click', () => {
        const newGreetingText = greetingInput.value;
        
        fetch('/home', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading: newGreetingText }),
        })
        .then(response => response.json())
        .then(updatedPage => {
            updateGreetingText(updatedPage.page_heading);
            // You can perform additional actions or show messages here if needed
        })
        .catch(error => console.error(error));
        location.reload();
    })
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = greetEdit.contains(event.target);
        const isClickInsideFinishIcon = greetFinish.contains(event.target);
        const isClickInsideGreetingInput = greetingInput.contains(event.target) 

        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && greetFinish.style.display === 'inline') {
            greetingInput.style.display = 'none';
            greetFinish.style.display = 'none';
            const newGreetingText = greetingInput.value;
        
            fetch('/home', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ page_heading: newGreetingText }),
            })
            .then(response => response.json())
            .then(updatedPage => {
                updateGreetingText(updatedPage.page_heading);
                // You can perform additional actions or show messages here if needed
            })
            .catch(error => console.error(error));
            location.reload();
            }
    })

    greetingInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            greetFinish.click()
        }
    })

});