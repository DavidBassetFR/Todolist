const tagModule = {

     getAllTags: async () => {
       const tagPlace =  document.querySelector('#tagPlace')
       
       const response = await fetch(`${app.base_url}/tag`);
        const result = await response.json();
        console.log(result)
        for (const element of result){
        const newTag = document.createElement('span')
        newTag.textContent = `${element.name}`
        newTag.style.backgroundColor = `${element.color}`
        newTag.style.width = `90px`;
        newTag.style.margin = `10px`;
        newTag.setAttribute('tag_id', `${element.id}`);
        newTag.classList.add('tag');
        tagPlace.appendChild(newTag)
        }
    },
     showAddTagsModal : async ()  => {
            const modal = document.getElementById('addTagModal');
            modal.classList.add('is-active');

            // closeset va nous permettre de remonté au premier parent qui répond à notre selecteur, on récupère ensuite la valeur de l'attribut data-list-id
            const listId = event.target.closest('[data-list-id]').getAttribute('data-list-id');

            // Je selectionne l'input qui a pour name list_id et je lui met comme valeur la variable listId récupère juste au dessus
            modal.querySelector('[name="list_id"]').value = listId;
        },
    };

