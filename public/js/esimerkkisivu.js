

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
    const pageOpenName = document.getElementById('esim-name-open');
    const pageFinishName = document.getElementById('esim-name-finish');
    const pageInputName = document.getElementById('esim-name-input');
    
    // Fetch the initial greeting text from the server
    fetch('/database.json')
    .then(response => response.json())
    .then(data => {
        
    })
    .catch(error => console.error(error));

    pageOpenName.addEventListener('click', () => {
        pageFinishName.style.display = 'inline';
        pageInputName.style.display = 'inline';
        pageOpenName.style.display = 'none';
        pageInputName.focus();
    });
        
    // Send a PUT request to update the greeting text
    pageFinishName.addEventListener('click', () => {
        const newNameElement = pageInputName.value;

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
        const isClickInsideEditIcon = pageOpenName.contains(event.target);
        const isClickInsideFinishIcon = pageFinishName.contains(event.target);
        const isClickInsideGreetingInput = pageInputName.contains(event.target) 
        
        
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishName.style.display === 'inline') {
            
            pageFinishName.style.display = 'none';
            pageInputName.style.display = 'none';
            pageOpenName.style.display = 'inline';
            const newElement = pageInputName.value;
              
            
            fetch('/home/esimerkkisivu', {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ page_name: newElement }),
            })
            .then(response => response.json())
            .then(updatedPage => {    
            })
            .catch(error => console.error(error));
            location.reload();
        }
    });

    pageInputName.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishName.click()
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const pageP1 = document.getElementById('esim-p1');
    const pageOpenP1 = document.getElementById('esim-p1-open');
    const pageFinishP1 = document.getElementById('esim-p1-finish');
    const pageInputP1 = document.getElementById('esim-p1-input');
/*
    fetch('/database.json')
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.log(error));
*/
    pageOpenP1.addEventListener('click', () => {
        pageFinishP1.style.display = 'inline';
        pageInputP1.style.display = 'inline';
        pageOpenP1.style.display = 'none';
        pageInputP1.focus();
    });

    pageFinishP1.addEventListener('click', () => {
        const newNameElement = pageInputP1.value;

        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph1: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP1.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP1.contains(event.target);
        const isClickInsideGreetingInput = pageInputP1.contains(event.target) 
        
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP1.style.display === 'inline') {

            pageFinishP1.style.display = 'none';
            pageInputP1.style.display = 'none';
            pageOpenP1.style.display = 'inline';
            const newElement = pageInputP1.value;

        fetch('/home/esimerkkisivu', {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ page_paragraph1: newElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {
        })
        .catch(error => console.error(error));
        location.reload();
        }
    });

    pageInputP1.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP1.click();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH1 = document.getElementById('esim-h1-open');
    const pageFinishH1 = document.getElementById('esim-h1-finish');
    const pageInputH1 = document.getElementById('esim-h1-input');

    fetch('/database.json')
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.log(error));

    pageOpenH1.addEventListener('click', () => {
        pageFinishH1.style.display = 'inline';
        pageInputH1.style.display = 'inline';
        pageOpenH1.style.display = 'none';
        pageInputH1.focus();
    });

    pageFinishH1.addEventListener('click', () => {
        const newNameElement = pageInputH1.value;

        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading1: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH1.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH1.contains(event.target);
        const isClickInsideGreetingInput = pageInputH1.contains(event.target) 
        
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH1.style.display === 'inline') {

            pageFinishH1.style.display = 'none';
            pageInputH1.style.display = 'none';
            pageOpenH1.style.display = 'inline';
            const newElement = pageInputH1.value;

        fetch('/home/esimerkkisivu', {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ page_heading1: newElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {
        })
        .catch(error => console.error(error));
        location.reload();
        }
    });

    pageInputH1.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH1.click();
        }
    });

})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP2 = document.getElementById('esim-p2-open');
    const pageFinishP2 = document.getElementById('esim-p2-finish');
    const pageInputP2 = document.getElementById('esim-p2-input');

    fetch('/database.json')
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.log(error));

    pageOpenP2.addEventListener('click', () => {
        pageFinishP2.style.display = 'inline';
        pageInputP2.style.display = 'inline';
        pageOpenP2.style.display = 'none';
        pageInputP2.focus();
    });

    pageFinishP2.addEventListener('click', () => {
        const newNameElement = pageInputP2.value;

        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph2: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP2.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP2.contains(event.target);
        const isClickInsideGreetingInput = pageInputP2.contains(event.target) 
        
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP2.style.display === 'inline') {

            pageFinishP2.style.display = 'none';
            pageInputP2.style.display = 'none';
            pageOpenP2.style.display = 'inline';
            const newElement = pageInputP2.value;

        fetch('/home/esimerkkisivu', {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ page_paragraph2: newElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {
        })
        .catch(error => console.error(error));
        location.reload();
        }

        pageInputP2.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                pageFinishP2.click();
            }
        });

    });
})