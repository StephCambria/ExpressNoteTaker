// === ROUTE PARAMETERS === //
// express.js
// express.Router()

// express.Router() is used to create a new router object
const router = require('express').Router();

// add our new route
const noteRoutes = require('./noteRoutes');

// router.use()
// this uses the specified middleware function (or functions).
// it more or less mounts middleware for the routes which are being served by the specific router
// pretty self-explanatory
router.use(noteRoutes);

// export this file
// module.exports = router maps a router and all of the logic required to map
module.exports = router;