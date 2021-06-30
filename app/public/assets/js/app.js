// on objet qui contient des fonctions
const app = {
  base_url: `http://localhost:3000`,
  ok :new Sortable(sortablelist, {
    animation: 300,
    onEnd: (evt) => {
    const formList = evt.from.closest('.column');
    const cards = formList.querySelectorAll('[data-list-id]');
    cards.forEach( (item, index) => {
        const data = new FormData();
        data.append('position', `${index}`)
        const listId = item.dataset.listId;
        fetch(app.base_url+'/list/'+listId, {method: 'PATCH', body: data });
    });
  }
  }),
/*
Sortable.create(list, {
            animation: 100,
            onChange: () => {
                const myCard = document.querySelector(`[draggable="false"]`);
                const idCard = myCard.closest('.box').getAttribute('data-card-id')
                const mytargetListId = myCard.closest(`[data-list-id="${targetListId}"]`)
                const positionList = mytargetListId.getAttribute('data-list-id');
                modulCard.UpdatePositionCardList(idCard, positionList)
            }
        });



  */
  

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    app.getListsFromAPI();
    app.addListenerToActions();
    tagModule.getAllTags();
  },

  addListenerToActions() {
    // Je séléctionne mon bouton ajouter une liste afin d'effectuer une action quand je clique dessus (afficher la modal)
    document.getElementById('addListButton').addEventListener('click', listModule.showAddListModal);

    // Récupérer toutes les boutons permettant de fermé la modal
    const closeModalElms = document.querySelectorAll('.modal .close');
    // Pour chacun de ses boutons, j'ajoute un écouteur d'événement au click afin de fermé les modals
    for (const closeModalElm of closeModalElms) {
      closeModalElm.addEventListener('click', app.hideModals);
    }

    document.querySelector('.btn-add-tag').addEventListener('click', tagModule.showAddTagsModal);
  
    // J'intercepte la soumission du formulare de création de list pour gérer moi même côté navigateur
    document.querySelector('#addListModal form').addEventListener('submit', listModule.handleAddListForm);

    const h2content = document.querySelectorAll('.column')
    for (const elem of h2content) {

      elem.addEventListener('dblclick', listModule.changeTitleFromList)
    };
    // J'intercepte la soumission du formulare de création de carte pour gérer moi même côté navigateur
    document.querySelector('#addCardModal form').addEventListener('submit', cardModule.handleAddCardForm);

    // On va écouter les événements sur les boutons d'ajout de carte
    const btnAddCardElms = document.querySelectorAll('.btn-add-card');
    for (const btnAddCardElm of btnAddCardElms) {
      btnAddCardElm.addEventListener('click', cardModule.showAddCardModal);
    }


    const deleteAllList = document.querySelector('#deleteAllEmptyList').addEventListener('click', listModule.deleteAllList)
  },

  deleteModal(event) {
    document.querySelector('#deleteCard').classList.add('is-active')
    const inputValeur = event.target.closest('.box').getAttribute('data-card-id');
    const cardInput = document.querySelector('#deleteCard')
    cardInput.querySelector('#deleteCardInput').value = `${inputValeur}`;
    cardInput.querySelector('.is-danger').addEventListener('click', cardModule.deleteCard)
  },
  deleteListModal(event) {
    document.querySelector('#deleteListConfirm').classList.add('is-active')
    const inputValeur = event.target.closest('[data-list-id]').getAttribute('data-list-id');

    const cardInput = document.querySelector('#deleteListConfirm')
    cardInput.querySelector('#deleteListInput').value = `${inputValeur}`;
    cardInput.querySelector('.is-danger').addEventListener('click', listModule.deleteListFromBoard)
  },
  hideModals() {
    const modalElms = document.querySelectorAll('.modal');
    for (const modalElm of modalElms) {
      modalElm.classList.remove('is-active');
    }
  },

  makeTagsInCard(element, cardId) {

    const newTag = document.createElement('span')
    newTag.textContent = `${element.name}`
    newTag.style.backgroundColor = `${element.color}`
    newTag.setAttribute('tag_id', `${element.id}`);
    newTag.classList.add('tag');
    const currentCard = document.querySelector(`[data-card-id="${cardId}"]`)

    const addtoCard = currentCard.querySelector('.tags-title')
    addtoCard.appendChild(newTag);
  },

  async getListsFromAPI() {

    const response = await fetch(`${app.base_url}/list`)
    const result = await response.json();   

    for (const elem of result) {
      const template = document.getElementById('listTemplate');
      const listElm = document.importNode(template.content, true);

      listElm.querySelector(`[data-list-id]`).setAttribute(`data-list-id`, `${elem.id}`)
      listElm.querySelector('.list-title').textContent = elem.name;

      listElm.querySelector('.btn-add-card').addEventListener('click', cardModule.showAddCardModal);
      listElm.querySelector('#deleteList').addEventListener('click', app.deleteListModal);
      document.querySelector('.card-lists').append(listElm);

      const elemDrag = document.querySelectorAll('.sortableCard')
      for(const elem of elemDrag){
      var sortable = Sortable.create(elem,{
        animation: 150,
        draggable:'.box',
        group :'.box',
        onEnd: (evt) => {
          const formList = evt.from.closest('.panel');

          const newlistID = formList.dataset.listId;
          const toList = evt.to.closest('.panel');
          const listId = toList.dataset.listId;
          console.log(newlistID)
          const cards = toList.querySelectorAll('.box');
          console.log(cards[0]);
          
          cards.forEach( (item, index) => {
            console.log(formList.id)
            const data = new FormData();
            data.append('position', `${index}`)
            data.append('list_id', `${listId}`)
              const cardId = item.dataset.cardId;
              console.log(cardId);
              fetch(app.base_url+'/card/'+cardId, {method: 'PATCH', body: data });
          });
        // même chose avec les cartes de la list To
        }
    })
      }
        for(const card of elem.cards){
          cardModule.makeCardInDOM(card)
          let cardId = card.id
            for(const elem of card.tags){
              app.makeTagsInCard(elem, cardId)
        }
      }
    };  
    
  },
}


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);