const allModels  = require('../models');
const sequelize = require('./../database');
const { Card, Tag, List } = require('../models')

const capture = require('../factorisation/capture');


module.exports = {

    query : capture (async (req, res) => { 
        const result = (await allModels[req.modelName].findAll())
        res.json(result)  
    }),
       
    send : capture (async (req, res, next) => {
            const result = await allModels[req.modelName].create(req.body);
            res.json(result)
    }),

    getByPk : capture(async (req, res, next) => {
        const result = await allModels[req.modelName].findByPk(req.params.id)
        res.json(result)  
    }),


    patchByPK : capture(async (req, res, next) => {
        console.log(req.body);
        const result = await allModels[req.modelName].update(req.body,
            { where : {id : req.params.id}});
        res.json(result)
        }),

    deleteByPK : capture (async (req, res, next) => {

        const result = await allModels[req.modelName].destroy({
            where : {id : req.params.id }  
        })
        res.json(result)
    }),

    cardByListPK :  capture (async (req, res, next) => {
            const result = await Card.findAll({
            include: [{ all: true, nested: true }],
            where : {list_id : req.params.id }})
            res.json(result);
        }),

    postTaginCard : capture (async (req, res, next) => {
            const card = await Card.findByPk(req.params.id)
            const result = card.addTag(req.body.tag_id , { where : { id : req.params.id }});
            res.json(result);
    }), 

    deleteAssociationCardAndTag: capture (async (req, res, next) => {
            const card = await Card.findByPk(req.params.card_id)
            const result = card.removeTag(req.params.tag_id, { where : { id : req.params.card_id}});
            res.json(result);
    }),
    deleteAllEmpty : async (req, res, next)=> {
        try {
        const result = await sequelize.query("DELETE from list where id in (SELECT list.id from list left outer join card on list.id = card.list_id where card.list_id is NULL)")
        res.json(result)
    } catch (error) {
        console.error(error);
    }
    },
    queryAll : capture (async (req, res) => { 
        const result = (await allModels[req.modelName].findAll({
            where: {position : {$NOTIN : req.params.id}}
        }
        ))
        res.json(result)  
    }),

    queryMax : async (req, res, next)=> {
        try {
        const result = await sequelize.query("SELECT max(position) FROM list;")
        res.json(result)
    } catch (error) {
        console.error(error);
    }},
    queryMaxCard : async (req, res, next)=> {
        try {
        const result = await sequelize.query(`SELECT max(position) FROM card WHERE list_id = ${req.params.id};`)
        res.json(result)
    } catch (error) {
        console.error(error);
    }},
};


