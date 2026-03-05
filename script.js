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
