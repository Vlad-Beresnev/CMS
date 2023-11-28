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
    const greetingTextElement = document.querySelector('.view1 h1');
    const greetEditIcon = document.getElementById('greetEdit');
    const greetingInput = document.getElementById('greetingInput');

    let isEditing = false;
 

    const editGreeting = () => {
        const newGreetingText = greetingInput.value;

        fetch('/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newGreetingText }),
        })
            .then((res) => res.text())
            .then((message) => {
                alert(message);
                greetingTextElement.style = originalGreetingTextStyle;
                greetEditIcon.style = originalGreetEditIconStyle;
                greetingTextElement.textContent = newGreetingText;
                greetingTextElement.classList.remove('editing');
                greetingTextElement.style.display = 'inline';
                greetingInput.style.display = 'none';
                greetEditIcon.style.marginTop = '-22px'
                
                greetingTextElement.addEventListener('mouseover', () => {
                    greetEditIcon.style.display = 'inline';
                });
                greetEditIcon.addEventListener('mouseover', () => {
                    greetEditIcon.style.display = 'inline';
                });
            
                greetingTextElement.addEventListener('mouseout', () => {
                    greetEditIcon.style.display = 'none';
                });
    

                isEditing = false;
            })
            .catch((error) => console.error(error));
    };

    const toggleEdit = () => {
        if (isEditing) {
            editGreeting();
        } else {

            greetingTextElement.classList.add('editing');
            greetingTextElement.style.display = 'none';
            greetingInput.style.display = 'inline';
            greetEditIcon.style.display = 'inline';
            greetEditIcon.style.marginTop = '336px';
            greetingInput.style.marginTop = '-60px';
        
            isEditing = true;
        }
    };

    greetEditIcon.addEventListener('click', toggleEdit);

    document.addEventListener('click', (event) => {
        if (isEditing && event.target !== greetEditIcon && event.target !== greetingInput) {
            editGreeting();
        }
    });
});