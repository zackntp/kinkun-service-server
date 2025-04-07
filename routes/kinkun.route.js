const express = require('express');

const router = express.Router();
const kinkunController = require('../controllers/kinkun.controller')

router.post('/',kinkunController.upload,kinkunController.createKinkun)

router.put('/:kinkunId',kinkunController.upload,kinkunController.editKinkun)

router.delete('/:kinkunId',kinkunController.deleteKinkun)

router.get('/kinkunall/:userId',kinkunController.showAllKinkun)

router.get('/kinkunonly/:kinkunId',kinkunController.showOnlyKinkun)



module.exports = router;