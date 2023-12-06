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
const greetingElement = document.getElementById('greetingText')
document.addEventListener('DOMContentLoaded', () => {
    const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    const logOutPage = database.pages.find((page) => page.id === '1')
    const greetingText = logOutPage.page_heading
    greetingElement.textContent = greetingText

})