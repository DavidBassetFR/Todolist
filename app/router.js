const express = require('express');
//const cardController = require('./controllers/cardController');
//const listControler = require('./controllers/listControler');
const mainController = require('./controllers/mainController')
const router = express.Router();
const getClassName =  require('./factorisation/getClassName')
const facto = require('./controllers/facto')
const capture = require('./factorisation/capture')

router.param('name', getClassName.facto);




router.route('/:name', )
.get(facto.query)
.post(facto.send);

router.route('/list/max',)
.get(facto.queryMax);

router.route('/card/max/:id',)
.get(facto.queryMaxCard);

router.route('/:name/all/:id', )
.get(facto.queryAll);


router.route('/:name/:id', )
.get(facto.getByPk)
.patch(facto.patchByPK)
.delete(facto.deleteByPK);


router.route('/list/:id/card', )
.get(facto.cardByListPK);

router.route('/card/:id/tag', )
.post(facto.postTaginCard)


router.route('/card/:card_id/tag/:tag_id', )
.delete(facto.deleteAssociationCardAndTag)

router.route('/deleteall')
.delete(facto.deleteAllEmpty);


/*router.route('updateAllExcept/:id', )
.get(facto.updateAllExcept)
/*router.route('/list')
.get(listControler.get)
.post(listControler.send);

router.route('/list/:id')
.get(listControler.getByPk)
.patch(listControler.patchByPK)
.delete(listControler.deleteByPK);

router.route('/card')
.get(cardController.get)
.post(cardController.send);

router.route('/card/:id')
.get(cardController.getByPk)
.patch(cardController.patchByPK)
.delete(cardController.deleteByPK);


router.route('/tag')
.get(tagController.get)
.post(tagController.send);

router.route('/tag/:id')
.get(tagController.getByPk)
.patch(tagController.patchByPK)
.delete(tagController.deleteByPK); */

router.use(mainController.notFound);

module.exports = router;