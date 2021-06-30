const listModule = {

    
    showAddListModal() {
        const modalElm = document.getElementById('addListModal');
        modalElm.classList.add('is-active');
    },


    async handleAddListForm(event) {
        // J'empêche le comportement par défault du formulaire (rechargement de la page)
        event.preventDefault();
        
        // Je créer un FormData avec mon formulaire soumis afin de pouvoir récupéré toutes les données du formulaire
        // Le event.target contient notre formulaire HTML comme si on l'avait récupéré depuis un selecteur (querySelector)
        const formData = new FormData(event.target);
        const maxPosition = await fetch(`${app.base_url}/list/max`, {
        });
        const positionaIncrementer = await maxPosition.json();

        const newPosition = ((positionaIncrementer[0][0].max) +1);

        // Je transforme les données du formulaire en un objet JS "classique"
        const list = Object.fromEntries(formData);

        formData.append('position', (newPosition) )
        const response = await fetch(`${app.base_url}/list`, {
            method: "POST",
            body: formData,
        });
        const hello = await response.json();
        // J'appel la fonction qui va créer le html de ma list en passant en paramètre les informations de cette dernière
        listModule.makeListInDOM(list, hello.id);
        // Une fois la liste ajouter dans le DOM, je cache mes modals
        app.hideModals();
    },
    makeListInDOM(list, id) {
        // Je récupère mon template
        const template = document.getElementById('listTemplate');
        // On va faire une copie du contenu du template
        const listElm = document.importNode(template.content, true);
        listElm.querySelector('.list-title').textContent = list.name;
        listElm.querySelector(`[data-list-id]`).setAttribute(`data-list-id`, `${id}`)
        listElm.querySelector('.btn-add-card').addEventListener('click', cardModule.showAddCardModal);
        listElm.querySelector('#deleteList').addEventListener('click', app.deleteListModal);
        document.querySelector('.card-lists').append(listElm);
        const elemDrag = document.querySelectorAll('.sortableCard')

    },
    
    
    async updateTitleFromList(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const list = Object.fromEntries(formData);

        const response = await fetch(`${app.base_url}/list/${list.list_id}`, {
            method: "PATCH",
            body: formData,
        });
        const result = await response.json();
        const listId = event.target.closest('.column')
        const nameHidden = listId.querySelector('.list-title')
        const formHidden = listId.querySelector('form')
        formHidden.classList.add('is-hidden');
        nameHidden.textContent = `${list.name}`
        nameHidden.classList.remove('is-hidden');
    },
    changeTitleFromList(event) {
        event.preventDefault();
        const listId = event.target.closest('.column')
        const idCool = listId.closest('[data-list-id]').getAttribute('data-list-id');
        const nameHidden = listId.querySelector('.list-title')
        const formHidden = listId.querySelector('form')
        formHidden.classList.remove('is-hidden');
        nameHidden.classList.add('is-hidden');
        const inpute = formHidden.querySelector('.field');
        const inputed = inpute.querySelector('.input')
        listId.querySelector('#list_idTitle').value = `${idCool}`
        listId.querySelector('.changeTitle').addEventListener('submit', listModule.updateTitleFromList);
        const dataListId = document.querySelector(`[data-list-id="${idCool}"]`)
        const listTitle = dataListId.querySelector('.list-title').textContent
        inputed.value = `${listTitle}`;
    },

    async deleteAllList(event){

        const response = await fetch(`${app.base_url}/deleteall`, {
            method: "DELETE",
        });

        const responsee = await response.json()

    },
    async deleteListFromBoard(event){
            const listADelete = event.target.closest('.modal').querySelector('input').value;
            const response = await fetch(`${app.base_url}/list/${listADelete}`, {
                method: "DELETE",
            });
            const responsee = response.json()

            listModule.removeListinDom(listADelete)
            },
    removeListinDom(id) {

            const cardADelete = document.querySelector(`[data-list-id="${id}"]`)
            cardADelete.remove();
            document.querySelector('#deleteListConfirm').classList.remove('is-active')
                }
    
    };
