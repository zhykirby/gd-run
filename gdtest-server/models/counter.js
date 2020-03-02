// id自增
const mongoose = require('mongoose')
const Schema = require('../db/index')

const CounterSchema = new Schema({
    id: String,
    seq: {
        type: Number,
        default: 0
    },
    
},{collection:'counter'})

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter