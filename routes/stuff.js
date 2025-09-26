const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.get('/', stuffCtrl.getAllStuff);
//router.post('/',auth(), stuffCtrl.createThing);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
//router.put('/:id',auth(), stuffCtrl.modifyThing);
router.delete('/:id',auth('admin'), stuffCtrl.deleteThing);

module.exports = router;