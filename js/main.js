/* 
 * Biomove - Scripts principais
 * Desenvolvido para a startup Biomove
 * Maio 2025
 */

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Inicialização AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Contador de números
    startCounters();
    
    // Smooth scroll para links de âncora
    setupSmoothScroll();
    
    // Formulários
    setupForms();
    
    // Back to top button
    setupBackToTop();
});

// Contador de números na seção de impacto
function startCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    // Verifica se o elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para iniciar o contador quando o elemento estiver visível
    function checkCounters() {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => checkCounters(), 1);
                } else {
                    counter.innerText = target;
                }
            }
        });
    }
    
    // Verifica os contadores ao carregar e ao rolar a página
    window.addEventListener('scroll', checkCounters);
    checkCounters();
}

// Configuração de rolagem suave para links de âncora
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                // Calcula a posição de rolagem considerando a altura da navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuração dos formulários
function setupForms() {
    // Formulário de demonstração
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                // Exibe mensagem de sucesso
                this.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <i class="fas fa-check-circle me-2"></i> Solicitação enviada com sucesso! Entraremos em contato em breve.
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                // Cria elemento de alerta
                const alertElement = document.createElement('div');
                alertElement.className = 'alert alert-success mt-3';
                alertElement.innerHTML = '<i class="fas fa-check-circle me-2"></i> Mensagem enviada com sucesso! Responderemos em breve.';
                
                // Insere o alerta após o botão
                submitButton.parentNode.insertBefore(alertElement, submitButton.nextSibling);
                
                // Restaura o botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Limpa o formulário
                this.reset();
                
                // Remove o alerta após alguns segundos
                setTimeout(() => {
                    alertElement.style.opacity = '0';
                    setTimeout(() => {
                        alertElement.remove();
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
    
    // Formulário de newsletter no footer
    const newsletterForm = document.querySelector('.footer-links form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                // Cria elemento de alerta
                const alertElement = document.createElement('div');
                alertElement.className = 'alert alert-success mt-3';
                alertElement.style.fontSize = '0.9rem';
                alertElement.innerHTML = 'Inscrição realizada com sucesso!';
                
                // Insere o alerta após o formulário
                this.parentNode.insertBefore(alertElement, this.nextSibling);
                
                // Restaura o botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Limpa o formulário
                this.reset();
                
                // Remove o alerta após alguns segundos
                setTimeout(() => {
                    alertElement.style.opacity = '0';
                    setTimeout(() => {
                        alertElement.remove();
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
}

// Configuração do botão "Voltar ao topo"
function setupBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Mostra/oculta o botão com base na posição de rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Ação de clique
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animação para elementos quando entram na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-up');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('in-view');
        }
    });
}

// Adiciona evento de rolagem para animações
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Adiciona estilos para o botão "Voltar ao topo"
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 40px;
            height: 40px;
            background: var(--primary);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});
