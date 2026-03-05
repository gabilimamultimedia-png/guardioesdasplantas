// Lógica do Cursor
const cursor = document.createElement('div');
cursor.id = 'cursor';
const cursorF = document.createElement('div');
cursorF.id = 'cursor-f';
document.body.appendChild(cursor);
document.body.appendChild(cursorF);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        cursorF.style.left = e.clientX - 10 + 'px';
        cursorF.style.top = e.clientY - 10 + 'px';
    }, 50);
});

// Mensagem de Log para debug (ajuda a ver se o JS carregou)
console.log("Sistema Guardiões das Plantas Ativo!");
// Abrir/Fechar Menu Mobile
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animação das barras do menu
    menuToggle.classList.toggle('is-active');
});

// Fechar menu ao clicar num link (importante para mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
