'use strict'

const {AddError} = require("../model/api_msg");

const Stat = require('../model/stat')


async function getAllStats() {
    return await Stat.find({}).select("-__v").exec()
}

async function addStat(stat) {

    let res = await Stat.create(stat)
    if(!res){
        throw AddError
    }
}

async function getAccessCount() {
    return await Stat.count().exec()
}

module.exports = {
    getAccessCount,
    addStat,
}