const router = require('express').Router();
// const consoleLoggerMiddleware = require('../middlewares/consoleLoggerMiddleware')

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');

const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
// router.use(consoleLoggerMiddleware);

module.exports = router;
