const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

const authRouter = require('./auth.routes')
router.use('/auth', authRouter)

const habitoRouter = require('./habito.routes')
router.use('/huella', habitoRouter)

const postRouter = require('./post.routes')
router.use('/foro', postRouter)

const userRouter = require('./user.routes')
router.use('/user', userRouter)

module.exports = router
