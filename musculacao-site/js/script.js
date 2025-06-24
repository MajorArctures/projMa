// Variáveis globais
let currentImageIndex = 0;

const galleryImages = [
    {
        title: "Transformação Inspiradora 1",
        description: "João perdeu 25kg e ganhou massa muscular em 8 meses de treino consistente.",
        image: "./images/transformação-1.jfif"
    },
    {
        title: "Transformação Inspiradora 2", 
        description: "Maria aumentou sua força em 150% e melhorou sua autoestima significativamente.",
        image: "./images/transformação-2.jpg"
    },
    {
        title: "Transformação Inspiradora 3",
        description: "Carlos superou a depressão através da musculação e hoje é um exemplo de determinação.",
        image: "./images/transformação-4.jpg"
    },
    {
        title: "Transformação Inspiradora 4",
        description: "Ana descobriu na musculação uma paixão e hoje compete em campeonatos.",
        image: "./images/transformação-3.jfif"
    }
];

// Dados dos treinos
const workoutData = {
    iniciante: {
        title: "Programa Iniciante",
        description: "Ideal para quem está começando na musculação",
        schedule: "3x por semana (Segunda, Quarta, Sexta)",
        exercises: [
            "Aquecimento: 10 min de caminhada",
            "Agachamento livre: 3x12",
            "Supino com halteres: 3x12", 
            "Remada curvada: 3x12",
            "Desenvolvimento com halteres: 3x12",
            "Prancha: 3x30s",
            "Alongamento: 10 min"
        ],
        tips: [
            "Foque na técnica correta",
            "Descanse 48h entre treinos",
            "Hidrate-se bem",
            "Comece com cargas leves"
        ]
    },
    intermediario: {
        title: "Programa Intermediário",
        description: "Para quem já tem experiência e quer evoluir",
        schedule: "4x por semana (Seg/Ter/Qui/Sex)",
        exercises: [
            "Dia A - Peito/Tríceps:",
            "Supino reto: 4x8-10",
            "Supino inclinado: 3x10",
            "Crucifixo: 3x12",
            "Tríceps testa: 3x10",
            "",
            "Dia B - Costas/Bíceps:",
            "Levantamento terra: 4x6",
            "Puxada frontal: 3x10",
            "Remada baixa: 3x10",
            "Rosca direta: 3x12"
        ],
        tips: [
            "Aumente a carga progressivamente",
            "Varie os exercícios mensalmente",
            "Mantenha boa alimentação",
            "Durma pelo menos 7h por noite"
        ]
    },
    avancado: {
        title: "Programa Avançado",
        description: "Treinos intensos para atletas experientes",
        schedule: "5-6x por semana",
        exercises: [
            "Periodização avançada",
            "Técnicas de intensificação:",
            "Drop sets, Rest-pause, Negativas",
            "Treino específico por grupo muscular",
            "Controle rigoroso de cargas",
            "Análise de composição corporal",
            "Suplementação direcionada"
        ],
        tips: [
            "Monitore sinais de overtraining",
            "Faça deload a cada 4-6 semanas",
            "Acompanhamento profissional",
            "Exames médicos regulares"
        ]
    }
};

// 1. FUNÇÃO: Inicialização do site
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeModals();
    initializeFormValidation();
    
    // Adicionar listeners para navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });
});

// 2. FUNÇÃO: Alternador de Tema (Dark/Light Mode)
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema salvo
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Animação suave
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}
//ajustar icones aqui
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Limpa o conteúdo atual
        themeToggle.innerHTML = '';

        // Cria a nova imagem
        const img = document.createElement('img');
        if (theme === 'dark') {
            img.src = './images/theme-sun.png';    
            img.alt = 'Tema Claro';
        } else {
            img.src = './images/theme-moon.png'
            img.alt = 'Tema Escuro';
        }

        img.style.width = '24px'; 
        img.style.height = '24px';

        themeToggle.appendChild(img);
    }
}


// 3. FUNÇÃO: Mensagem de Boas-vindas
function showWelcomeMessage() {
    const userName = prompt("Qual é o seu nome?") || "Visitante";
    const currentHour = new Date().getHours();
    let greeting;
    
    if (currentHour < 12) {
        greeting = "Bom dia";
    } else if (currentHour < 18) {
        greeting = "Boa tarde";
    } else {
        greeting = "Boa noite";
    }
    
    const message = `${greeting}, ${userName}! 🎉\n\nSeja bem-vindo(a) ao FitLife!\n\nEstamos muito felizes em tê-lo(a) conosco nesta jornada de transformação através da musculação.\n\n💪 Prepare-se para descobrir como a musculação pode revolucionar sua saúde e bem-estar!\n\n🎯 Dica do dia: A consistência é a chave do sucesso. Pequenos passos todos os dias levam a grandes transformações!`;
    
    alert(message);
    
    // Adicionar efeito visual
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.animation = 'none';
        setTimeout(() => {
            heroSection.style.animation = 'fadeInUp 1s ease';
        }, 10);
    }
}

// 4. FUNÇÃO: Calculadora de IMC
function openIMCCalculator() {
    const modal = document.getElementById('imc-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Limpar campos
        document.getElementById('peso').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('resultado-imc').innerHTML = '';
    }
}

function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultadoDiv = document.getElementById('resultado-imc');
    
    // Validação
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = '<p style="color: #ef4444;">Por favor, insira valores válidos para peso e altura.</p>';
        return;
    }
    
    if (altura > 3) {
        resultadoDiv.innerHTML = '<p style="color: #ef4444;">Altura deve ser em metros (ex: 1.75).</p>';
        return;
    }
    
    // Cálculo do IMC
    const imc = peso / (altura * altura);
    let categoria, cor, dica;
    
    if (imc < 18.5) {
        categoria = "Abaixo do peso";
        cor = "#3b82f6";
        dica = "Considere aumentar a ingestão calórica e incluir exercícios de força.";
    } else if (imc < 25) {
        categoria = "Peso normal";
        cor = "#10b981";
        dica = "Parabéns! Mantenha uma alimentação equilibrada e exercícios regulares.";
    } else if (imc < 30) {
        categoria = "Sobrepeso";
        cor = "#f59e0b";
        dica = "Considere uma dieta balanceada e aumente a atividade física.";
    } else {
        categoria = "Obesidade";
        cor = "#ef4444";
        dica = "Recomendamos buscar orientação médica e nutricional.";
    }
    
    resultadoDiv.innerHTML = `
        <div style="background: ${cor}20; border: 2px solid ${cor}; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
            <h4 style="color: ${cor}; margin-bottom: 0.5rem;">Resultado do IMC</h4>
            <p style="font-size: 1.2rem; font-weight: bold; color: ${cor}; margin-bottom: 0.5rem;">
                IMC: ${imc.toFixed(1)} - ${categoria}
            </p>
            <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem;">
                ${dica}
            </p>
        </div>
    `;
}

// 5. FUNÇÃO: Galeria de Imagens Interativa
// FUNÇÃO: Abrir Galeria
function openGallery(index) {
    currentImageIndex = index;
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.style.display = 'block';
        updateGalleryDisplay();
    }
}

// FUNÇÃO: Atualizar Exibição da Galeria
function updateGalleryDisplay() {
    const image = galleryImages[currentImageIndex];
    const imageElement = document.getElementById('gallery-image');
    const titleElement = document.getElementById('gallery-title');
    const descriptionElement = document.getElementById('gallery-description');
    
    if (imageElement && titleElement && descriptionElement) {
        imageElement.innerHTML = `<img src="${image.image}" alt="${image.title}" class="gallery-photo">`;
        titleElement.textContent = image.title;
        descriptionElement.textContent = image.description;
    }
}

// Próxima imagem
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryDisplay();
}

// Imagem anterior
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryDisplay();
}
// FUNÇÃO: Exibir detalhes do treino
function showWorkoutDetails(level) {
    const modal = document.getElementById('workout-modal');
    const detailsDiv = document.getElementById('workout-details');
    const workout = workoutData[level];
    
    if (modal && detailsDiv && workout) {
        detailsDiv.innerHTML = `
            <h3>${workout.title}</h3>
            <p><strong>Descrição:</strong> ${workout.description}</p>
            <p><strong>Frequência:</strong> ${workout.schedule}</p>
            
            <h4>Exercícios:</h4>
            <ul style="margin-bottom: 2rem;">
                ${workout.exercises.map(exercise => 
                    exercise ? `<li>${exercise}</li>` : '<li style="list-style: none; height: 0.5rem;"></li>'
                ).join('')}
            </ul>
            
            <h4>Dicas Importantes:</h4>
            <ul>
                ${workout.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
        
        modal.style.display = 'block';
    }
}

// FUNÇÃO: Validação de Formulário
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (form) {
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Limpar erro anterior
    clearError(field);
    
    switch (fieldName) {
        case 'nome':
            if (!value) {
                errorMessage = 'Nome é obrigatório.';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'Email é obrigatório.';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Email inválido.';
                isValid = false;
            }
            break;
            
        case 'telefone':
            if (value) {
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Formato: (11) 99999-9999';
                    isValid = false;
                }
            }
            break;
            
        case 'assunto':
            if (!value) {
                errorMessage = 'Selecione um assunto.';
                isValid = false;
            }
            break;
            
        case 'mensagem':
            if (!value) {
                errorMessage = 'Mensagem é obrigatória.';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
                isValid = false;
            }
            break;
            
        case 'termos':
            if (!field.checked) {
                errorMessage = 'Você deve concordar com os termos.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    field.style.borderColor = '#ef4444';
}

function clearError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.style.borderColor = 'var(--border-color)';
}

function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    let isFormValid = true;
    
    // Validar todos os campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    // Validar campos opcionais que têm valor
    const optionalFields = form.querySelectorAll('input:not([required]), select:not([required])');
    optionalFields.forEach(field => {
        if (field.value.trim()) {
            validateField(field);
        }
    });
    
    if (isFormValid) {
        // Simular envio do formulário
        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Mostrar loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            // Esconder formulário e mostrar sucesso
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
            
            // Log dos dados (em produção, enviaria para servidor)
            console.log('Dados do formulário:', Object.fromEntries(formData));
            
            // Reset após 5 segundos
            setTimeout(() => {
                form.style.display = 'block';
                document.getElementById('form-success').style.display = 'none';
                form.reset();
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Limpar todos os erros
                const errorElements = form.querySelectorAll('.error-message');
                errorElements.forEach(error => {
                    error.textContent = '';
                    error.style.display = 'none';
                });
                
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = 'var(--border-color)';
                });
            }, 5000);
            
        }, 2000);
    } else {
        // Scroll para o primeiro erro
        const firstError = form.querySelector('.error-message[style*="block"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return false;
}

// FUNÇÃO: Menu Mobile
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// FUNÇÃO: Inicializar Modais
function initializeModals() {
    // Fechar modais ao clicar no X ou fora do modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Fechar modais com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// FUNÇÃO: Formatação automática de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});

// FUNÇÃO: Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// FUNÇÃO: Animações ao scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .program-card, .exercise-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

