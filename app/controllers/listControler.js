// Il récupère l'index quand aucun fichier n'est précisé
// S'il n y a pas d'index, cela générera une errur
const { List } = require('../models');


module.exports = {
    get : async (req, res, next) => {
        try { 
          const result = await List.findAll({
                    order : ['position'],
                    include :{
                        association : 'cards' 
                    
                    }, 
                });
            if(!result){
                return next()
            }
            res.json(result)

        } catch(error){
            console.error(error);
            res.json({error: 'Message d\'erreur'})
        }},

    send : async (req, res, next) => {
        try {
            const result = await List.build({name : req.body.name , position : req.body.position}).save();
            if(!result){
                return next()
            }
            res.json(result)
        }
        catch (error) {
            console.error(error);
            res.json({error: 'Message d\'erreur'})
    }},

    getByPk : async (req, res, next) => {
        try {
        const result = res.json(await List.findByPk(req.params.id))
        if(!result){
            return next()
        }
        res.json(result)
        }
        catch (error) {
            console.error(error);
            res.json({error: 'Message d\'erreur'})
        }},
    patchByPK : async (req, res, next) => {
        try {
        const result = await List.update({
            name : req.body.name,
            position : req.body.position}, 
            { where : {id : req.params.id}
        });
        if(!result){
            return next()
        }
        res.json(result)
    }catch (error) {
        console.error(error);
        res.json({error: 'Message d\'erreur'})
    }},

    deleteByPK : async (req, res, next) => {
        try {
        const result = await List.destroy({
            where : {id : req.params.id }  
        })
        if(!result){
            return next()
        }
        res.json(result)
    } catch (error) {
        console.error(error)
        res.json({error: 'Message d\'erreur'})
    }}
}; 