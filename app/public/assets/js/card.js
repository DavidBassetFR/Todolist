const cardModule = {

    showAddCardModal(event) {
            const modal = document.getElementById('addCardModal');
            modal.classList.add('is-active');

            // closeset va nous permettre de remonté au premier parent qui répond à notre selecteur, on récupère ensuite la valeur de l'attribut data-list-id
            const listId = event.target.closest('[data-list-id]').getAttribute('data-list-id');

            // Je selectionne l'input qui a pour name list_id et je lui met comme valeur la variable listId récupère juste au dessus
            modal.querySelector('[name="list_id"]').value = listId;
        },

    async handleAddCardForm(event) {
            // J'empêche le comportement par défault du formulaire (rechargement de la page)
            event.preventDefault();
            const modal = document.getElementById('addCardModal');
            const listId= modal.querySelector('[name="list_id"]').value


            // Le event.target contient notre formulaire HTML comme si on l'avait récupéré depuis un selecteur (querySelector)
            const formDataCard = new FormData(event.target);
            const maxPosition = await fetch(`${app.base_url}/card/max/${listId}`, {
            });

            const positionaIncrementer = await maxPosition.json();

            const newformDataCard = ((positionaIncrementer[0][0].max) +1);

            // Je créer un FormData avec mon formulaire soumis afin de pouvoir récupéré toutes les données du formulaire
            // Le event.target contient notre formulaire HTML comme si on l'avait récupéré depuis un selecteur (querySelector)
            const formData = new FormData(event.target);
            formData.append('position', `${newformDataCard}`)
            // Je transforme les données du formulaire en un objet JS "classique"
            const card = Object.fromEntries(formData);

            const response = await fetch(`${app.base_url}/card`, {
                method: "POST",
                body: formData,
            });

            const hello = await response.json()
            card.card_id = hello.id
            cardModule.makeCardInDOM(card);
            app.hideModals();
        },
        makeCardInDOM(result) {

            const template = document.getElementById('cardTemplate');
            // On va faire une copie du contenu du template 
            const cardElm = document.importNode(template.content, true);
            cardElm.querySelector('.box').style.backgroundColor = `${result.color}`;
            cardElm.querySelector('.card-title').textContent = result.title;
            cardElm.querySelector('.box').setAttribute('data-card-id', `${result.id}`);
            //cardElm.querySelector('.card-title').style.color = `${ele.color}`;
            cardElm.querySelector('a').addEventListener('click', cardModule.modifyCardContent)
            cardElm.querySelector('#deletecard').addEventListener('click', app.deleteModal)
            document.querySelector(`[data-list-id="${result.list_id}"] .panel-block`).append(cardElm)
                
        },

        modifyCardContent(event) {
            const cardId = event.target.closest('[data-card-id]').getAttribute('data-card-id')
            const cardContent = document.querySelector('#modifyCardContent')
            cardContent.classList.add('is-active');
            cardContent.querySelector('input').value = `${cardId}`;
            cardContent.querySelector('.changeCardName').addEventListener('submit', cardModule.updateCardFromUser);
        },

        async updateCardFromUser(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const list = Object.fromEntries(formData);

                const response = await fetch(`${app.base_url}/card/${list.card_id}`, {
                method: "PATCH",
                body: formData,
            });
            const result = await response.json();
            const hihi = document.querySelector(`[data-card-id="${list.card_id}"]`);
            hihi.querySelector('.column').textContent = `${list.title}`;
            hihi.style.backgroundColor = `${list.color}`;
            const cardContent = document.querySelector('#modifyCardContent')
            cardContent.classList.remove('is-active');
            },

        async deleteCard(event) {
            const cardADelete = event.target.closest('.modal').querySelector('input').value;
            const response = await fetch(`${app.base_url}/card/${cardADelete}`, {
                method: "DELETE",
            });
            const responsee = response.json()
            cardModule.removeCardFromDom(cardADelete)
                },
        removeCardFromDom(id) {
                const cardADelete = document.querySelector(`[data-card-id="${id}"]`)
                cardADelete.remove();
                document.querySelector('#deleteCard').classList.remove('is-active')
                }
}