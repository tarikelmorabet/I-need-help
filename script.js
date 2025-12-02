document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIQUE POUR LA PAGE D'ACCUEIL (H_test) ---
    const btnHelpNeeded = document.getElementById('btn-help-needed');
    const btnCanHelp = document.getElementById('btn-can-help');

    if (btnHelpNeeded && btnCanHelp) {
        function addClickEffect(button) {
            button.classList.add('button-clicked');
            setTimeout(() => button.classList.remove('button-clicked'), 150);
        }

        btnHelpNeeded.addEventListener('click', () => {
            window.location.href = 'need_help.html';
            addClickEffect(btnHelpNeeded);
        });

        btnCanHelp.addEventListener('click', () => {
            window.open('https://www.wikipedia.org/', '_blank');
            addClickEffect(btnCanHelp);
        });
    }


    // --- LOGIQUE POUR LA PAGE "I need help" ---
    const functionSelect = document.getElementById('function-select');
    const optionSelect = document.getElementById('option-select');
    const selectionResult = document.getElementById('selection-result');

    // On vérifie si les éléments de la page "need_help" existent avant de continuer
    if (functionSelect && optionSelect) {

        // On charge les données depuis le fichier JSON
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du fichier data.json");
                }
                return response.json();
            })
            .then(data => {
                const allOptions = data.options;

                // Écouteur d'événement pour le premier menu
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