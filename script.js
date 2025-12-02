document.addEventListener('DOMContentLoaded', () => {

    // --- FONCTIONS UTILITAIRES ---
    function addClickEffect(button) {
        if (button) {
            button.classList.add('button-clicked');
            setTimeout(() => button.classList.remove('button-clicked'), 150);
        }
    }

    // --- LOGIQUE POUR LA PAGE D'ACCUEIL (index.html) ---
    const btnHelpNeeded = document.getElementById('btn-help-needed');
    const btnCanHelp = document.getElementById('btn-can-help');
    if (btnHelpNeeded && btnCanHelp) {
        btnHelpNeeded.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le saut instantané
            addClickEffect(btnHelpNeeded);
            setTimeout(() => { window.location.href = 'need_help.html'; }, 150); // Laisse le temps à l'animation
        });

        btnCanHelp.addEventListener('click', (e) => {
            e.preventDefault();
            addClickEffect(btnCanHelp);
            setTimeout(() => { window.location.href = 'can_help.html'; }, 150);
        });
    }

    // --- LOGIQUE POUR LES BOUTONS DE RETOUR ---
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // --- LOGIQUE POUR LA PAGE "I can Help" (can_help.html) ---
    const goToLoginBtn = document.getElementById('go-to-login');
    const goToRegisterBtn = document.getElementById('go-to-register');
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', () => window.location.href = 'login.html');
    }
    if (goToRegisterBtn) {
        goToRegisterBtn.addEventListener('click', () => window.location.href = 'register.html');
    }

    // --- LOGIQUE POUR LA PAGE D'INSCRIPTION (register.html) ---
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = registerForm.querySelector('button[type="submit"]');
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            submitButton.disabled = true;
            submitButton.textContent = 'Création en cours...';

            if (localStorage.getItem(email)) {
                registerMessage.textContent = "Cet email est déjà utilisé.";
                registerMessage.style.color = "red";
                submitButton.disabled = false;
                submitButton.textContent = "S'inscrire";
            } else {
                localStorage.setItem(email, JSON.stringify({ username, password }));
                registerMessage.textContent = "Compte créé avec succès ! Redirection vers la connexion...";
                registerMessage.style.color = "green";
                setTimeout(() => { window.location.href = 'login.html'; }, 2500);
            }
        });
    }

    // --- LOGIQUE POUR LA PAGE DE CONNEXION (login.html) ---
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const userData = JSON.parse(localStorage.getItem(email));

            submitButton.disabled = true;
            submitButton.textContent = 'Connexion...';

            if (userData && userData.password === password) {
                localStorage.setItem('loggedInUser', email);
                loginMessage.textContent = "Connexion réussie ! Redirection vers votre tableau de bord...";
                loginMessage.style.color = "green";
                // Pour l'instant, on redirige vers l'accueil car dashboard.html n'existe pas encore
                setTimeout(() => { window.location.href = 'index.html'; }, 2000); 
            } else {
                loginMessage.textContent = "Email ou mot de passe incorrect.";
                loginMessage.style.color = "red";
                submitButton.disabled = false;
                submitButton.textContent = "Se connecter";
            }
        });
    }
    
    // --- LOGIQUE POUR LA PAGE "I need help" (need_help.html) ---
    const functionSelect = document.getElementById('function-select');
    const optionSelect = document.getElementById('option-select');
    const selectionResult = document.getElementById('selection-result');

    if (functionSelect && optionSelect) {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier data.json");
                }
                return response.json();
            })
            .then(data => {
                const allOptions = data.options;

                functionSelect.addEventListener('change', () => {
                    const selectedFunction = functionSelect.value;
                    
                    // On vide le menu des options précédentes
                    optionSelect.innerHTML = '<option value="">--Choose an option--</option>';
                    selectionResult.textContent = '';

                    if (selectedFunction && allOptions[selectedFunction]) {
                        optionSelect.disabled = false; // On active le deuxième menu
                        
                        const options = allOptions[selectedFunction];
                        
                        // On remplit le deuxième menu avec les nouvelles options
                        options.forEach(optionText => {
                            const option = document.createElement('option');
                            option.value = optionText.toLowerCase().replace(/\s+/g, '-');
                            option.textContent = optionText;
                            optionSelect.appendChild(option);
                        });
                    } else {
                        optionSelect.disabled = true; // On désactive si pas de choix
                    }
                });

                // Écouteur pour afficher le choix final
                optionSelect.addEventListener('change', () => {
                    if (optionSelect.value) {
                        const selectedOptionText = optionSelect.options[optionSelect.selectedIndex].text;
                        selectionResult.textContent = `Vous avez choisi : ${selectedOptionText}`;
                    } else {
                        selectionResult.textContent = '';
                    }
                });

            })
            .catch(error => {
                console.error('Un problème est survenu :', error);
                // On peut afficher un message à l'utilisateur si le JSON ne se charge pas
                functionSelect.innerHTML = '<option value="">Erreur de chargement des options</option>';
            });
    }
});
// --- LOGIQUE POUR LA PAGE TABLEAU DE BORD (dashboard.html) ---
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('logout-button');

// On vérifie si les éléments existent bien sur la page
if (welcomeMessage && logoutButton) {
    
    // Vérifier si un utilisateur est connecté
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    
    if (loggedInUserEmail) {
        // Récupérer les données de l'utilisateur
        const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
        
        if (userData && userData.username) {
            // Afficher le message de bienvenue personnalisé
            welcomeMessage.textContent = `Bonjour, ${userData.username} !`;
        } else {
            welcomeMessage.textContent = "Bonjour !";
        }
    } else {
        // Si personne n'est connecté, rediriger vers la page de connexion
        window.location.href = 'login.html';
    }

    // Gérer le clic sur le bouton de déconnexion
    logoutButton.addEventListener('click', () => {
        // Supprimer la session de l'utilisateur
        localStorage.removeItem('loggedInUser');
        
        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
    });
}