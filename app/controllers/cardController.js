const { Card } = require('../models');

module.exports = {
    get : async (req, res, next) => {

        try { 
          const result = await Card.findAll({
                    order : ['position'],
                  
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
            const result = await Card.build({
                title : req.body.title,
                position : req.body.position,
                color: req.body.color,
                list_id : req.body.list_id
            }).save();

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
        const result = await Card.findByPk(req.params.id)
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
        const result = await Card.update({
            title : req.body.title,
            position : req.body.position,
            color: req.body.color }, 
            { where : {id : req.params.id}}
        );
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
        const result = await Card.destroy({
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