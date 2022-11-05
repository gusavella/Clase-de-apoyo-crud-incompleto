// ************ Require's ************
const express = require("express");
const router = express.Router();
const heroesController = require('../controllers/heroesController');
const uploadFile = require('../middlewares/multerMiddleware');

router.get('/',heroesController.showAll)

router.get('/detail/create',heroesController.showCreateHeroe)

router.post('/detail',uploadFile.single('imgFile'),heroesController.createHeroe)

router.get('/detail/:id',heroesController.detail)

// editar  heroe
router.get('/detail/edit/:id',heroesController.editHeroe)
router.put('/detail/edit/:id',uploadFile.single('imgFile'),heroesController.update)

//borrrar
router.delete('/detail/delete/:id',heroesController.destroy)

module.exports = router;
