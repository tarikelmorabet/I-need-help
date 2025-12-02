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
    function addClickEffect(button) {
        if (button) {
            button.classList.add('button-clicked');
            setTimeout(() => button.classList.remove('button-clicked'), 150);
        }
    }

    // On ajoute l'effet de clic sur les nouveaux liens
    btnHelpNeeded.addEventListener('click', (e) => {
        addClickEffect(btnHelpNeeded);
    });

    btnCanHelp.addEventListener('click', (e) => {
        addClickEffect(btnCanHelp);
    });
}
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
            e.preventDefault(); // Empêche le rechargement de la page
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Vérifier si l'utilisateur existe déjà
            if (localStorage.getItem(email)) {
                registerMessage.textContent = "Cet email est déjà utilisé.";
                registerMessage.style.color = "red";
            } else {
                // Sauvegarder l'utilisateur
                localStorage.setItem(email, JSON.stringify({ username, password }));
                registerMessage.textContent = "Compte créé avec succès ! Vous pouvez maintenant vous connecter.";
                registerMessage.style.color = "green";
                setTimeout(() => { window.location.href = 'login.html'; }, 2000);
            }
        });
    }

    // --- LOGIQUE POUR LA PAGE DE CONNEXION (login.html) ---
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const userData = JSON.parse(localStorage.getItem(email));

            if (userData && userData.password === password) {
                // Connexion réussie
                localStorage.setItem('loggedInUser', email); // Sauvegarde la session
                loginMessage.textContent = "Connexion réussie ! Redirection...";
                loginMessage.style.color = "green";
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
            } else {
                loginMessage.textContent = "Email ou mot de passe incorrect.";
                loginMessage.style.color = "red";
            }
        });
    }
    
    // --- LOGIQUE POUR LA PAGE "I need help" (inchangée) ---
    const functionSelect = document.getElementById('function-select');
    const optionSelect = document.getElementById('option-select');
    const selectionResult = document.getElementById('selection-result');
    if (functionSelect && optionSelect) {
        fetch('data.json').then(response => response.json()).then(data => {
            const allOptions = data.options;
            functionSelect.addEventListener('change', () => {
                const selectedFunction = functionSelect.value;
                optionSelect.innerHTML = '<option value="">--Choose an option--</option>';
                selectionResult.textContent = '';
                if (selectedFunction && allOptions[selectedFunction]) {
                    optionSelect.disabled = false;
                    const options = allOptions[selectedFunction];
                    options.forEach(optionText => {
                        const option = document.createElement('option');
                        option.value = optionText.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = optionText;
                        optionSelect.appendChild(option);
                    });
                } else {
                    optionSelect.disabled = true;
                }
            });
            optionSelect.addEventListener('change', () => {
                if (optionSelect.value) {
                    const selectedOptionText = optionSelect.options[optionSelect.selectedIndex].text;
                    selectionResult.textContent = `Vous avez choisi : ${selectedOptionText}`;
                } else {
                    selectionResult.textContent = '';
                }
            });
        }).catch(error => console.error('Erreur de chargement du JSON:', error));
    }
});