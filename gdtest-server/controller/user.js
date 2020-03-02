const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser)

const User = require('../models/User')
const Counter = require('../models/counter')

//移植
let ret = Counter.find({id:'daily'}).lean().exec((err, docs) => {return docs})
if (!ret) {
    let count = new Counter({
        id: 'daily',
        seq: 0
    })
    count = count.save()
} else {
    console.log('counter 不为空')
}

const login = async(ctx) => {
    let postData = ctx.request.body
    let userName = postData.userName
    let password = postData.password
    if (userName === 'admin' && password === 'password') {
        ctx.body = {
            code: 200,
            msg: '登陆成功！'
        }
    } else {
        ctx.body = {
            code: 304,
            msg: '用户名或者密码错误！',
            userName: userName,
            password: password
        }
    }
}

const addDaily = async(ctx) => {
    //let none = await ifNone()
    let dailyId = await getNextSequenceValue('daily')
    return new Promise((resolve,reject) => {
        let postData = ctx.request.body
        let start = postData.start
        let name = postData.name
        let end = postData.end
        let time = postData.time
        let use = postData.use
        let desc = postData.desc
        let daily = new User({
            dailyName: name,
            startTime: start,
            endTime: end,
            dailyTime: time,
            useTime: use,
            desc: desc,
            dailyId: dailyId
        })
        daily = daily.save()
        resolve()
    }).then(() => {
        ctx.body = {
            code: 200,
            msg: '添加成功!'
        }
    }).catch(err => {
        ctx.body = {
            code: 404,
            msg: 'err'
        }
    })
}

const editDaily = async(ctx) => {
    return new Promise((resolve, reject) => {
        let postData = ctx.request.body
        let id = postData.id
        let start = postData.start
        let name = postData.name
        let end = postData.end
        let time = postData.time
        let use = postData.use
        let desc = postData.desc
        User.findOneAndUpdate({dailyId:id},{
            dailyName: name,
            startTime: start,
            endTime: end,
            dailyTime: time,
            useTime: use,
            desc: desc
        })
        resolve()
    }).then(() => {
        ctx.body = {
            code: 200,
            msg: '请求成功！'
        }
    }).catch(err => {
        ctx.body = {
            code: 404,
            msg: '出错了'
        }
    })
}

const getDaily = async(ctx) => {
    return new Promise((resolve, reject) => {
        let postData = ctx.request.query
        let page = parseInt(postData.curPage)
        User.find({}).skip((page - 1) * 10).limit(10).lean().exec((err, docs) => {
            resolve(docs)
        })
    }).then((data) => {
        ctx.body = {
            code: 200,
            msg: '请求成功!',
            list: data
        }
    }).catch(err => {
        // console.log(err)
        ctx.body = {
            code: 404,
            msg: err
        }
    })
}

const deleteDaily = async(ctx) => {
    return new Promise((resolve, reject) => {
        let postData = ctx.request.body
        let id =  parseInt(postData.id)
        console.log(id)
        User.deleteOne({dailyId: id}, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    }).then(() => {
        ctx.body = {
            code: 200,
            msg: '请求成功！'
        }
    }).catch(err => {
        ctx.body = {
            code: 404,
            msg: err
        }
    })
}

const total = async(ctx) => {
    return new Promise((resolve, reject) => {
        User.countDocuments({}, (err, count) => {
            resolve(count)
        })
    })
    .then((data) => {
        ctx.body = {
            code: 200,
            msg: '请求成功！',
            count: data
        }
    }).catch(err => {
        ctx.body = {
            code: 404,
            msg: err,
            count: 10
        }
    })
}

const getNextSequenceValue = (sequenceName) => {
    return new Promise((resolve, reject) => {
        let sequenceDocument = Counter.findOneAndUpdate(
            {id: sequenceName},
            {$inc: {seq: 1}},
            {new: true}
        ).lean().exec((err,docs) => {
            resolve(docs.seq)
        })   
    })
}

module.exports = {
    login: login,
    addDaily: addDaily,
    getDaily: getDaily,
    deleteDaily: deleteDaily,
    total: total,
    editDaily: editDaily
}