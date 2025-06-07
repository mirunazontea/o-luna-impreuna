// Variabile globale
let currentMessage = 0;
const totalMessages = 4;
let wishes = [];

// Funcție pentru inițializare
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Event listeners pentru butoanele planetelor
    const planetBtns = document.querySelectorAll('.planet-btn');
    planetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const planet = this.getAttribute('data-planet');
            openModal(planet);
        });
    });

    // Event listeners pentru închiderea modalelor
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal();
        });
    });

    // Închide modalul când se face clic în afara lui
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Inițializare componente specifice
    initializeWishJar();
    initializeMessages();
    initializeCake();
}

function openModal(planet) {
    closeModal(); // Închide orice modal deschis
    
    switch(planet) {
        case 'sun':
            document.getElementById('spotify-modal').style.display = 'block';
            break;
        case 'venus':
            document.getElementById('wish-modal').style.display = 'block';
            break;
        case 'moon':
            document.getElementById('chart-modal').style.display = 'block';
            break;
        case 'earth':
            document.getElementById('messages-modal').style.display = 'block';
            break;
        case 'saturn':
            document.getElementById('cake-modal').style.display = 'block';
            break;
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Funcționalitate Wish Jar
function initializeWishJar() {
    const addWishBtn = document.getElementById('add-wish');
    const wishInput = document.getElementById('wish-input');
    
    addWishBtn.addEventListener('click', addWish);
    wishInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addWish();
        }
    });
}

function addWish() {
    const wishInput = document.getElementById('wish-input');
    const wishText = wishInput.value.trim();
    
    if (wishText) {
        wishes.push(wishText);
        displayWishes();
        wishInput.value = '';
        
        // Animație de adăugare
        const wishesContainer = document.getElementById('wishes-container');
        const lastWish = wishesContainer.lastElementChild;
        if (lastWish) {
            lastWish.style.animation = 'none';
            setTimeout(() => {
                lastWish.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        }
    }
}

function displayWishes() {
    const container = document.getElementById('wishes-container');
    container.innerHTML = '';
    
    wishes.forEach((wish, index) => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.textContent = wish;
        wishElement.addEventListener('click', function() {
            removeWish(index);
        });
        container.appendChild(wishElement);
    });
}

function removeWish(index) {
    wishes.splice(index, 1);
    displayWishes();
}

// Funcționalitate Messages
function initializeMessages() {
    const prevBtn = document.getElementById('prev-message');
    const nextBtn = document.getElementById('next-message');
    
    prevBtn.addEventListener('click', previousMessage);
    nextBtn.addEventListener('click', nextMessage);
    
    updateMessageDisplay();
}

function previousMessage() {
    currentMessage = (currentMessage - 1 + totalMessages) % totalMessages;
    updateMessageDisplay();
}

function nextMessage() {
    currentMessage = (currentMessage + 1) % totalMessages;
    updateMessageDisplay();
}

function updateMessageDisplay() {
    // Ascunde toate mesajele
    const messages = document.querySelectorAll('.message-card');
    messages.forEach(msg => {
        msg.classList.remove('active');
    });
    
    // Afișează mesajul curent
    const currentMsg = document.getElementById(`message-${currentMessage}`);
    if (currentMsg) {
        currentMsg.classList.add('active');
    }
    
    // Actualizează contorul
    const counter = document.getElementById('message-counter');
    if (counter) {
        counter.textContent = `${currentMessage + 1} / ${totalMessages}`;
    }
}

// Funcționalitate Cake
function initializeCake() {
    const blowBtn = document.getElementById('blow-candle');
    blowBtn.addEventListener('click', blowCandle);
}

function blowCandle() {
    const flame = document.querySelector('.flame');
    const celebration = document.getElementById('celebration');
    const blowBtn = document.getElementById('blow-candle');
    
    // Animație pentru stingerea lumânării
    flame.style.animation = 'none';
    flame.style.opacity = '0';
    flame.style.transform = 'scale(0)';
    flame.style.transition = 'all 0.5s ease';
    
    // Schimbă textul butonului
    blowBtn.textContent = '🎉 La mulți ani! 🎉';
    blowBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)';
    
    // Creează confetti
    createConfetti();
    
    // Resetează după 5 secunde
    setTimeout(() => {
        flame.style.opacity = '1';
        flame.style.transform = 'scale(1)';
        flame.style.animation = 'flicker 1s infinite alternate';
        blowBtn.textContent = 'Suflă în Lumânare! 🌬️';
        blowBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
        celebration.innerHTML = '';
    }, 5000);
}

function createConfetti() {
    const celebration = document.getElementById('celebration');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Forme diferite pentru confetti
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        celebration.appendChild(confetti);
        
        // Elimină confetti după animație
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Efecte interactive suplimentare
function addInteractiveEffects() {
    // Efect pentru butoanele planetelor
    const planetBtns = document.querySelectorAll('.planet-btn');
    planetBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efect de particule pentru titlu
    const title = document.querySelector('.title');
    title.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 107, 107, 0.5)';
    });
    
    title.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    });
}

// Funcție pentru efecte de fundal dinamice
function createDynamicBackground() {
    const starsContainer = document.querySelector('.stars');
    
    // Creează stele în mișcare
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        starsContainer.appendChild(star);
    }
}

// Funcție pentru salvarea și încărcarea dorințelor (simulare)
function saveWishes() {
    // În aplicația reală, aici ai putea salva în localStorage
    // localStorage.setItem('wishes', JSON.stringify(wishes));
    console.log('Dorințele au fost salvate:', wishes);
}

function loadWishes() {
    // În aplicația reală, aici ai putea încărca din localStorage
    // const savedWishes = localStorage.getItem('wishes');
    // if (savedWishes) {
    //     wishes = JSON.parse(savedWishes);
    //     displayWishes();
    // }
    
    // Pentru demonstrație, adăugăm câteva dorințe inițiale
    wishes = [
        "Sa mergem la concert Vama din nouu",
        "Să avem o casă cu grădină si un caine.",
        "Să iau licenta si sa intru la master"
    ];
    displayWishes();
}

// Inițializare completă
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    addInteractiveEffects();
    createDynamicBackground();
    loadWishes();
    
    // Mesaj de bun venit
    console.log('🎉 Aplicația de aniversare a fost încărcată cu succes! 🎉');
    console.log('💕 La mulți ani pentru o lună împreună! 💕');
});

// Funcții pentru navigarea cu tastatura
document.addEventListener('keydown', function(event) {
    // ESC pentru închiderea modalelor
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // Săgețile pentru navigarea prin mesaje (când modalul de mesaje este deschis)
    const messagesModal = document.getElementById('messages-modal');
    if (messagesModal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            previousMessage();
        } else if (event.key === 'ArrowRight') {
            nextMessage();
        }
    }
});

// Funcție pentru efecte de hover pe cardurile de mesaje
function addMessageHoverEffects() {
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('active')) {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 15px 30px rgba(255, 255, 255, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Apelează efectele de hover după încărcarea completă
setTimeout(addMessageHoverEffects, 1000);
