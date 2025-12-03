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

    btnHelpNeeded.addEventListener('click', (e) => {
        e.preventDefault();
        addClickEffect(btnHelpNeeded);
        setTimeout(() => { window.location.href = 'need_help.html'; }, 150);
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
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 2000);
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

            })
            .catch(error => {
                console.error('Un problème est survenu avec data.json :', error);
                functionSelect.innerHTML = '<option value="">Erreur de chargement des options</option>';
            });
    }

    // --- LOGIQUE POUR LA PAGE TABLEAU DE BORD (dashboard.html) ---
    // --- LOGIQUE POUR LA PAGE TABLEAU DE BORD (dashboard.html) ---
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('logout-button');
const profileForm = document.getElementById('profile-form');
const profileMessage = document.getElementById('profile-message');

if (welcomeMessage && logoutButton && profileForm) {
    
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    
    if (loggedInUserEmail) {
        const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
        welcomeMessage.textContent = `Bonjour, ${userData.username} !`;

        // --- RÉFÉRENCES AUX ÉLÉMENTS DU FORMULAIRE ---
        const profilePictureInput = document.getElementById('profile-picture');
        const experienceInput = document.getElementById('experience');
        const diplomasInput = document.getElementById('diplomas');
        const functionSelect = document.getElementById('offer-function');
        const optionSelect = document.getElementById('offer-option');
        const descriptionInput = document.getElementById('offer-description');
        const scheduleSelect = document.getElementById('offer-schedule');
        const priceInput = document.getElementById('offer-price');
        const citySelect = document.getElementById('offer-city');
        const districtSelect = document.getElementById('offer-district');

        // --- FONCTION POUR CHARGER LES DONNÉES ET PEUPLER LES MENUS ---
        const populateForm = async () => {
            try {
                const [functionsResponse, citiesResponse] = await Promise.all([
                    fetch('data.json'),
                    fetch('cities.json')
                ]);
                const functionsData = await functionsResponse.json();
                const citiesData = await citiesResponse.json();

                const allOptions = functionsData.options;
                const allCities = citiesData.cities;

                // Peupler les menus (fonctions et villes)
                Object.keys(allOptions).forEach(func => {
                    const option = document.createElement('option');
                    option.value = func;
                    option.textContent = func.charAt(0).toUpperCase() + func.slice(1);
                    functionSelect.appendChild(option);
                });
                Object.keys(allCities).forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                
                // LOGIQUE DES MENUS LIÉS (identique à avant)
                functionSelect.addEventListener('change', () => {
                    const selectedFunction = functionSelect.value;
                    optionSelect.innerHTML = '<option value="">--Choisir une option--</option>';
                    if (selectedFunction && allOptions[selectedFunction]) {
                        optionSelect.disabled = false;
                        allOptions[selectedFunction].forEach(optText => {
                            const option = document.createElement('option');
                            option.value = optText;
                            option.textContent = optText;
                            optionSelect.appendChild(option);
                        });
                    } else {
                        optionSelect.disabled = true;
                    }
                });
                citySelect.addEventListener('change', () => {
                    const selectedCity = citySelect.value;
                    districtSelect.innerHTML = '<option value="">--Choisir un quartier--</option>';
                    if (selectedCity && allCities[selectedCity]) {
                        districtSelect.disabled = false;
                        allCities[selectedCity].forEach(districtText => {
                            const option = document.createElement('option');
                            option.value = districtText;
                            option.textContent = districtText;
                            districtSelect.appendChild(option);
                        });
                    } else {
                        districtSelect.disabled = true;
                    }
                });

                // --- CHARGER LES DONNÉES SAUVEGARDÉES DU PROFIL ---
                const profileData = JSON.parse(localStorage.getItem(`profile_${loggedInUserEmail}`));
                if (profileData) {
                    profilePictureInput.value = profileData.profilePicture || '';
                    experienceInput.value = profileData.experience || '';
                    diplomasInput.value = profileData.diplomas || '';
                    functionSelect.value = profileData.function || '';
                    functionSelect.dispatchEvent(new Event('change'));
                    optionSelect.value = profileData.option || '';
                    descriptionInput.value = profileData.description || '';
                    scheduleSelect.value = profileData.schedule || '';
                    priceInput.value = profileData.price || '';
                    citySelect.value = profileData.city || '';
                    citySelect.dispatchEvent(new Event('change'));
                    districtSelect.value = profileData.district || '';
                }

            } catch (error) {
                console.error("Une erreur est survenue lors du chargement des données du formulaire:", error);
                profileMessage.textContent = "Erreur de chargement des données. Veuillez réessayer plus tard.";
                profileMessage.style.color = "red";
            }
        };

        // Lancer la fonction
        populateForm();

        // --- SOUMISSION DU FORMULAIRE ---
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newProfileData = {
                profilePicture: profilePictureInput.value,
                experience: experienceInput.value,
                diplomas: diplomasInput.value,
                function: functionSelect.value,
                option: optionSelect.value,
                description: descriptionInput.value,
                schedule: scheduleSelect.value,
                price: priceInput.value,
                city: citySelect.value,
                district: districtSelect.value,
                userEmail: loggedInUserEmail
            };

            localStorage.setItem(`profile_${loggedInUserEmail}`, JSON.stringify(newProfileData));
            
            profileMessage.textContent = "Votre profil a été mis à jour avec succès !";
            profileMessage.style.color = "green";
            setTimeout(() => { profileMessage.textContent = ''; }, 3000);
        });

    } else {
        window.location.href = 'login.html';
    }

    // --- GESTION DE LA DÉCONNEXION ---
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}
// --- LOGIQUE POUR LA PAGE DE RECHERCHE (need_help.html) ---
const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');

if (searchForm && searchResults) {
    const functionSelect = document.getElementById('search-function');
    const citySelect = document.getElementById('search-city');

    // Charger les fonctions et les villes dans les menus
    Promise.all([
        fetch('data.json').then(res => res.json()),
        fetch('cities.json').then(res => res.json())
    ]).then(([functionsData, citiesData]) => {
        // Remplir le menu des fonctions
        Object.keys(functionsData.options).forEach(func => {
            const option = document.createElement('option');
            option.value = func;
            option.textContent = func.charAt(0).toUpperCase() + func.slice(1);
            functionSelect.appendChild(option);
        });
        // Remplir le menu des villes
        Object.keys(citiesData.cities).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }).catch(error => console.error('Erreur de chargement des données:', error));

    // Gérer la soumission du formulaire de recherche
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedFunction = functionSelect.value;
        const selectedCity = citySelect.value;

        // Récupérer toutes les offres depuis le localStorage
        const allOffers = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('offer_')) {
                const offerData = JSON.parse(localStorage.getItem(key));
                const userData = JSON.parse(localStorage.getItem(offerData.userEmail));
                if (userData) {
                    offerData.username = userData.username;
                    allOffers.push(offerData);
                }
            }
        }

        // Filtrer les offres
        const filteredOffers = allOffers.filter(offer => {
            const functionMatch = !selectedFunction || offer.function === selectedFunction;
            const cityMatch = !selectedCity || offer.city === selectedCity;
            return functionMatch && cityMatch;
        });

        // Afficher les résultats
        searchResults.innerHTML = ''; // Vider les anciens résultats
        if (filteredOffers.length > 0) {
            filteredOffers.forEach(offer => {
                const offerCard = document.createElement('div');
                offerCard.classList.add('offer-card');
                offerCard.innerHTML = `
                    <h3>${offer.function} - ${offer.option}</h3>
                    <p><strong>Description :</strong> ${offer.description}</p>
                    <p><strong>Disponibilités :</strong> ${offer.schedule}</p>
                    <p><strong>Prix moyen :</strong> <span class="price">${offer.price} Dh</span></p>
                    <p><strong>Localisation :</strong> ${offer.city}, ${offer.district}</p>
                    <div class="contact-info">
                        <strong>Proposé par :</strong> ${offer.username}
                    </div>
                `;
                searchResults.appendChild(offerCard);
            });
        } else {
            searchResults.innerHTML = '<p>Aucune offre trouvée pour ces critères.</p>';
        }
    });
}


