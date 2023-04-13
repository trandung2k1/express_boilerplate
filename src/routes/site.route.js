const { Router } = require('express');
const SiteController = require('../controllers/site.controller');

const router = Router();
router.get('/', SiteController.getHomePage);
module.exports = router;
