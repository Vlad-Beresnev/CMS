document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.gallery-card');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function()  {
            dots.forEach(d => d.classList.remove('active'));

            cards.forEach(card => card.style.display = 'none');

            this.classList.add('active');

            const targetCard = document.getElementById(this.getAttribute('data-target'));
            targetCard.style.display = 'flex';
        });
    });
});

