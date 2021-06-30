const { Tag, List } = require('../models');
const sequelize = require('./../database');

module.exports = {
    get : async (req, res, next) => {

        try { 
          const result = await Tag.findAll();
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
            const result = await Tag.build({
            name : req.body.name,
            color: req.body.color
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
        const result = await Tag.findByPk(req.params.id)
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
        const result = await Tag.update({
            name : req.body.name,
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
        const result = await Tag.destroy({
            where : {id : req.params.id }  
        })
        if(!result){
            return next()
        }
        res.json(result)
    } catch (error) {
        console.error(error)
        res.json({error: 'Message d\'erreur'})
    }},

    

    
}; 