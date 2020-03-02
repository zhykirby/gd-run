const router = require('koa-router')()
const User = require('../controller/user')

router.prefix('/users')

// 有机会改成restful api
router.post('/login', User.login)
router.post('/add', User.addDaily)
router.get('/list', User.getDaily)
router.post('/delete', User.deleteDaily)
router.get('/total', User.total)
router.post('/edit', User.editDaily)

module.exports = router
