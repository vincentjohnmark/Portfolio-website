function showSection(sectionId) {
    // Hide welcome screen if not on home section
    if (sectionId === 'home') {
        document.getElementById('welcome-screen').style.display = 'flex'; // Show welcome screen
        document.getElementById('main-content').style.display = 'none'; // Hide main content
    } else {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }

    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    if (sectionId !== 'home') {
        document.getElementById(sectionId).style.display = 'block';
    }
}

// Initial setup to show the welcome screen with typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typingEffect = document.getElementById('typing-effect');
    typingEffect.classList.add('typing-effect');

    // Show home section by default
    showSection('home');
});
