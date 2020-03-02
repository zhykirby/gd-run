const mongoose = require('mongoose')
const Schema = require('../db/index')

const userDaily = new Schema({
    dailyId: Number,
    dailyName: String,
    startTime: String,
    endTime: String,
    dailyTime: String,
    useTime: String,
    desc: String
},{collection:'daily'})
module.exports = mongoose.model('Daily', userDaily)
