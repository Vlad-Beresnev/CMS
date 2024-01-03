

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
    const pageOpenElement = document.getElementById('esim-h1-open');
    const pageFinishElement = document.getElementById('esim-h1-finish');
    const pageInputElement = document.getElementById('esim-h1-input');
    
    // Fetch the initial greeting text from the server
    fetch('/database.json')
    .then(response => response.json())
    .then(data => {
        
    })
    .catch(error => console.error(error));

    pageOpenElement.addEventListener('click', () => {
        pageFinishElement.style.display = 'inline';
        pageInputElement.style.display = 'inline';
        pageOpenElement.style.display = 'none';
        pageInputElement.focus();
    });
        
    // Send a PUT request to update the greeting text
    pageFinishElement.addEventListener('click', () => {
        const newNameElement = pageInputElement.value;

        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_name: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {
        })
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenElement.contains(event.target);
        const isClickInsideFinishIcon = pageFinishElement.contains(event.target);
        const isClickInsideGreetingInput = pageInputElement.contains(event.target) 
        
        
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishElement.style.display === 'inline') {
            
            pageFinishElement.style.display = 'none';
            pageInputElement.style.display = 'none';
            pageOpenElement.style.display = 'inline';
            const newNameElement = pageInputElement.value;
              
            
            fetch('/home/esimerkkisivu', {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ page_name: newNameElement }),
            })
            .then(response => response.json())
            .then(updatedPage => {    
            })
            .catch(error => console.error(error));
            location.reload();
        }
    });

    pageInputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishElement.click()
        }
    });
});