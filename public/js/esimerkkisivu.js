

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

document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH2 = document.getElementById('esim-h2-open');
    const pageFinishH2 = document.getElementById('esim-h2-finish');
    const pageInputH2 = document.getElementById('esim-h2-input');

    pageOpenH2.addEventListener('click', () => {
        pageFinishH2.style.display = 'inline';
        pageInputH2.style.display = 'inline';
        pageOpenH2.style.display = 'none';
        pageInputH2.focus();
    });

    pageFinishH2.addEventListener('click', () => {
        const newNameElement = pageInputH2.value;

        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading2: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH2.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH2.contains(event.target);
        const isClickInsideGreetingInput = pageInputH2.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH2.style.display === 'inline') {
            pageFinishH2.click();
        }    
    });

    pageInputH2.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH2.click();
        }
    });
})



document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP3 = document.getElementById('esim-p3-open');
    const pageFinishP3 = document.getElementById('esim-p3-finish');
    const pageInputP3 = document.getElementById('esim-p3-input');

    pageOpenP3.addEventListener('click', () => {
        pageFinishP3.style.display = 'inline';
        pageInputP3.style.display = 'inline';
        pageOpenP3.style.display = 'none';
        pageInputP3.focus();
    });

    pageFinishP3.addEventListener('click', () => {
        const newNameElement = pageInputP3.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph3: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP3.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP3.contains(event.target);
        const isClickInsideGreetingInput = pageInputP3.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP3.style.display === 'inline') {
            pageFinishP3.click();
        }        
    });

    pageInputP3.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP3.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH3 = document.getElementById('esim-h3-open');
    const pageFinishH3 = document.getElementById('esim-h3-finish');
    const pageInputH3 = document.getElementById('esim-h3-input');

    pageOpenH3.addEventListener('click', () => {
        pageFinishH3.style.display = 'inline';
        pageInputH3.style.display = 'inline';
        pageOpenH3.style.display = 'none';
        pageInputH3.focus();
    });

    pageFinishH3.addEventListener('click', () => {
        const newNameElement = pageInputH3.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading3: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH3.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH3.contains(event.target);
        const isClickInsideGreetingInput = pageInputH3.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH3.style.display === 'inline') {
            pageFinishH3.click();
        }        
    });

    pageInputH3.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH3.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP4 = document.getElementById('esim-p4-open');
    const pageFinishP4 = document.getElementById('esim-p4-finish');
    const pageInputP4 = document.getElementById('esim-p4-input');

    pageOpenP4.addEventListener('click', () => {
        pageFinishP4.style.display = 'inline';
        pageInputP4.style.display = 'inline';
        pageOpenP4.style.display = 'none';
        pageInputP4.focus();
    });

    pageFinishP4.addEventListener('click', () => {
        const newNameElement = pageInputP4.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph4: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP4.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP4.contains(event.target);
        const isClickInsideGreetingInput = pageInputP4.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP4.style.display === 'inline') {
            pageFinishP4.click();
        }        
    });

    pageInputP4.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP4.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH4 = document.getElementById('esim-h4-open');
    const pageFinishH4 = document.getElementById('esim-h4-finish');
    const pageInputH4 = document.getElementById('esim-h4-input');

    pageOpenH4.addEventListener('click', () => {
        pageFinishH4.style.display = 'inline';
        pageInputH4.style.display = 'inline';
        pageOpenH4.style.display = 'none';
        pageInputH4.focus();
    });

    pageFinishH4.addEventListener('click', () => {
        const newNameElement = pageInputH4.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading4: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH4.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH4.contains(event.target);
        const isClickInsideGreetingInput = pageInputH4.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH4.style.display === 'inline') {
            pageFinishH4.click();
        }        
    });

    pageInputH4.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH4.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP5 = document.getElementById('esim-p5-open');
    const pageFinishP5 = document.getElementById('esim-p5-finish');
    const pageInputP5 = document.getElementById('esim-p5-input');

    pageOpenP5.addEventListener('click', () => {
        pageFinishP5.style.display = 'inline';
        pageInputP5.style.display = 'inline';
        pageOpenP5.style.display = 'none';
        pageInputP5.focus();
    });

    pageFinishP5.addEventListener('click', () => {
        const newNameElement = pageInputP5.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph5: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP5.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP5.contains(event.target);
        const isClickInsideGreetingInput = pageInputP5.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP5.style.display === 'inline') {
            pageFinishP3.click();
        }        
    });

    pageInputP5.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP5.click();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH5 = document.getElementById('esim-h5-open');
    const pageFinishH5 = document.getElementById('esim-h5-finish');
    const pageInputH5 = document.getElementById('esim-h5-input');

    pageOpenH5.addEventListener('click', () => {
        pageFinishH5.style.display = 'inline';
        pageInputH5.style.display = 'inline';
        pageOpenH5.style.display = 'none';
        pageInputH5.focus();
    });

    pageFinishH5.addEventListener('click', () => {
        const newNameElement = pageInputH5.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading5: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH5.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH5.contains(event.target);
        const isClickInsideGreetingInput = pageInputH5.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH5.style.display === 'inline') {
            pageFinishH5.click();
        }        
    });

    pageInputH5.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH5.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP6 = document.getElementById('esim-p6-open');
    const pageFinishP6 = document.getElementById('esim-p6-finish');
    const pageInputP6 = document.getElementById('esim-p6-input');

    pageOpenP6.addEventListener('click', () => {
        pageFinishP6.style.display = 'inline';
        pageInputP6.style.display = 'inline';
        pageOpenP6.style.display = 'none';
        pageInputP6.focus();
    });

    pageFinishP6.addEventListener('click', () => {
        const newNameElement = pageInputP6.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph6: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP6.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP6.contains(event.target);
        const isClickInsideGreetingInput = pageInputP6.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP6.style.display === 'inline') {
            pageFinishP6.click();
        }        
    });

    pageInputP6.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP6.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenH6 = document.getElementById('esim-h6-open');
    const pageFinishH6 = document.getElementById('esim-h6-finish');
    const pageInputH6 = document.getElementById('esim-h6-input');

    pageOpenH6.addEventListener('click', () => {
        pageFinishH6.style.display = 'inline';
        pageInputH6.style.display = 'inline';
        pageOpenH6.style.display = 'none';
        pageInputH6.focus();
    });

    pageFinishH6.addEventListener('click', () => {
        const newNameElement = pageInputH6.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_heading6: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenH6.contains(event.target);
        const isClickInsideFinishIcon = pageFinishH6.contains(event.target);
        const isClickInsideGreetingInput = pageInputH6.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishH6.style.display === 'inline') {
            pageFinishH6.click();
        }        
    });

    pageInputH6.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishH6.click();
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const pageOpenP7 = document.getElementById('esim-p7-open');
    const pageFinishP7 = document.getElementById('esim-p7-finish');
    const pageInputP7 = document.getElementById('esim-p7-input');

    pageOpenP7.addEventListener('click', () => {
        pageFinishP7.style.display = 'inline';
        pageInputP7.style.display = 'inline';
        pageOpenP7.style.display = 'none';
        pageInputP7.focus();
    });

    pageFinishP7.addEventListener('click', () => {
        const newNameElement = pageInputP7.value;
        fetch('/home/esimerkkisivu', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_paragraph7: newNameElement }),
        })
        .then(response => response.json())
        .then(updatedPage => {})
        .catch(error => console.error(error));
        location.reload();
    });

    document.addEventListener('click', (event) => {
        const isClickInsideEditIcon = pageOpenP7.contains(event.target);
        const isClickInsideFinishIcon = pageFinishP7.contains(event.target);
        const isClickInsideGreetingInput = pageInputP7.contains(event.target) 
        if (!isClickInsideEditIcon && !isClickInsideFinishIcon && !isClickInsideGreetingInput && pageFinishP7.style.display === 'inline') {
            pageFinishP7.click();
        }        
    });

    pageInputP7.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            pageFinishP7.click();
        }
    });
})

function choosePic(newSrc) {
    const image = document.getElementById('esim-image');
    image.src = newSrc;
    localStorage.setItem('selectedImageSrc', newSrc);
}

document.addEventListener('DOMContentLoaded', () => {
    const imageIcon = document.getElementById('esim-image-icon');
    const imageStore = document.getElementById('esim-image-store');
    const image = document.getElementById('esim-image');
    const images = document.getElementsByClassName('choosen-images');

    const savedImageSrc = localStorage.getItem('selectedImageSrc');
    if ( savedImageSrc) {
        image.src = savedImageSrc;
    }

    imageIcon.addEventListener('click', () => {
        imageIcon.style.display = "none";
        imageStore.style.display = "flex";
    })

    for (let img of images) {
        img.addEventListener('click', () => {
            choosePic(img.src);
            imageStore.style.display = "none";
            imageIcon.style.display = 'inline';
        });
    }
});