function toggleSidebar() {
    const sidebar = document.getElementById('sidebar')
    const menuIcon = document.querySelector('.menu-icon i')

    sidebar.classList.toggle('open')
    sidebar.classList.toggle('close')


    if (sidebar.classList.contains('open')) {
        menuIcon.classList.remove('fa-bars')
        menuIcon.classList.add('fa-x') 
    } else {
        menuIcon.classList.remove('fa-x');
        menuIcon.classList.add('fa-bars');
    }
}