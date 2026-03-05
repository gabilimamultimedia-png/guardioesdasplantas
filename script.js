// Configurações do Estado
let state = {
    xp: 0,
    currentScenario: 0,
    scenarios: [
        { name: "Horta", img: "images/fundo-horta.jpg", pests: 4 },
        { name: "Floresta", img: "images/fundo-floresta.jpg", pests: 5 },
        { name: "Cidade Verde", img: "images/fundo-cidade.jpg", pests: 4 }
    ],
    pestsFound: 0
};

// Cursor
document.addEventListener('mousemove', (e) => {
    document.getElementById('cursor').style.left = e.clientX + 'px';
    document.getElementById('cursor').style.top = e.clientY + 'px';
    setTimeout(() => {
        document.getElementById('cursor-f').style.left = e.clientX - 11 + 'px';
        document.getElementById('cursor-f').style.top = e.clientY - 11 + 'px';
    }, 50);
});

// Typing Effect Inicial
const heroText = "Sabias que as plantas produzem quase todo o oxigénio que respiramos?";
let charIdx = 0;
function typeHero() {
    if (charIdx < heroText.length) {
        document.getElementById("typing-hero").innerHTML += heroText.charAt(charIdx);
        charIdx++;
        setTimeout(typeHero, 50);
    }
}
window.onload = typeHero;

// Navegação
function goTo(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if(sectionId === 'game') initGame();
}

// Lógica do Jogo
function initGame() {
    const viewport = document.getElementById('game-viewport');
    const scenario = state.scenarios[state.currentScenario];
    
    viewport.style.backgroundImage = `url(${scenario.img})`;
    viewport.innerHTML = '<div class="scan-line"></div>'; // Reset
    document.getElementById('scenario-name').innerText = `Cenário: ${scenario.name}`;
    
    state.pestsFound = 0;

    for(let i=0; i < scenario.pests; i++) {
        let pest = document.createElement('img');
        pest.src = 'images/praga.png';
        pest.className = 'praga-obj';
        pest.style.top = Math.random() * 80 + 5 + '%';
        pest.style.left = Math.random() * 80 + 5 + '%';
        
        pest.onclick = function() {
            this.style.transform = "scale(0) rotate(180deg)";
            state.pestsFound++;
            state.xp += 150;
            updateXP();
            if(state.pestsFound === scenario.pests) nextScenario();
        };
        viewport.appendChild(pest);
    }
}

function nextScenario() {
    state.currentScenario++;
    if(state.currentScenario < state.scenarios.length) {
        confetti({ particleCount: 50, spread: 60 });
        setTimeout(initGame, 1000);
    } else {
        confetti({ particleCount: 150, spread: 100 });
        setTimeout(() => goTo('quiz'), 1500);
    }
}

function updateXP() {
    document.getElementById('xp-counter').innerText = `XP: ${state.xp.toString().padStart(4, '0')}`;
}

// Certificado com Canvas
function generateCertificate() {
    const name = document.getElementById('user-name').value || "Guardião da Natureza";
    const canvas = document.getElementById('c-canvas');
    const ctx = canvas.getContext('2d');

    // Estilo Diplomático
    ctx.fillStyle = '#1a472a';
    ctx.fillRect(0,0,1000,700);
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 15;
    ctx.strokeRect(30,30,940,640);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 50px Lexend';
    ctx.fillText('CREDENTIAL OF MERIT', 500, 150);
    
    ctx.font = '30px Lexend';
    ctx.fillText('Este certificado confirma que', 500, 250);
    
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 60px Lexend';
    ctx.fillText(name.toUpperCase(), 500, 380);
    
    ctx.fillStyle = 'white';
    ctx.font = '25px Lexend';
    ctx.fillText('é um Guardião Oficial da Saúde das Plantas (ONU 2024)', 500, 500);

    const imgURL = canvas.toDataURL();
    document.getElementById('cert-result').innerHTML = `
        <img src="${imgURL}" style="width:100%; border-radius:15px; margin-top:20px;">
        <br><br>
        <a href="${imgURL}" download="certificado_ONU.png" class="btn-main">Descarregar Credencial</a>
    `;
}

// Modais
function openModal(type) {
    const m = document.getElementById('info-modal');
    const contents = {
        oxigenio: { t: "Plantas e Oxigénio", d: "As plantas captam o CO2 e libertam o oxigénio que usamos para respirar. Sem florestas saudáveis, o ar fica doente." },
        comida: { t: "Segurança Alimentar", d: "Se as plantas ficam doentes, não há colheitas. O Dia 12 de Maio ensina-nos a proteger o que comemos." },
        equilibrio: { t: "Equilíbrio Global", d: "As plantas regulam a temperatura do planeta e dão casa a milhões de animais." }
    };
    document.getElementById('m-title').innerText = contents[type].t;
    document.getElementById('m-desc').innerText = contents[type].d;
    m.style.display = 'flex';
}

function closeModal() { document.getElementById('info-modal').style.display = 'none'; }
