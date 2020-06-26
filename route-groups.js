const router = require('express').Router();


router.use('/paytm',require("./api/router/paytm.routes"));

module.exports = router;