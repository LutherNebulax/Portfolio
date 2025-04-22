/**
 * ============================================================================
 * COMPOSANT : Menu Mobile
 * Description : Gestion du menu hamburger pour les appareils mobiles
 * Fonctionnalités :
 * - Toggle du menu au clic
 * - Animation du bouton hamburger
 * ============================================================================
 */
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

/**
 * ============================================================================
 * COMPOSANT : Navigation Scroll Spy
 * Description : Mise à jour de la navigation active en fonction de la section visible
 * Fonctionnalités :
 * - Détection de la section visible
 * - Mise à jour des classes actives
 * - Fonctionne avec le menu mobile et desktop
 * ============================================================================
 */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a, #menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/**
 * ============================================================================
 * COMPOSANT : Animation des barres de compétences
 * Description : Animation des barres de progression au scroll
 * Fonctionnalités :
 * - Animation au chargement
 * - Utilisation de l'Intersection Observer
 * - Réinitialisation et animation des barres
 * ============================================================================
 */
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('#skills').forEach(section => {
    observer.observe(section);
});

/**
 * ============================================================================
 * COMPOSANT : Gestion du thème
 * Description : Gestion du basculement entre les modes clair et sombre
 * Fonctionnalités :
 * - Basculement du thème au clic
 * - Persistance du choix dans le localStorage
 * - Détection de la préférence système
 * ============================================================================
 */
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Vérification du thème stocké ou de la préférence système
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark');
    }
}

// Basculement du thème
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initialisation du thème au chargement
initTheme();
