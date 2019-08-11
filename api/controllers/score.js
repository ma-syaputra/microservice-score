const response = require('./../response/response')

const _ = require('lodash') 
const scoreAi = require('./../schema/scoreDefinition').mdbCounterScoreSchema

const statusAppCode = require('./../config/status').statusAppCrud
const statusErrCode = require('./../config/status').errorApp
var statusResp = null
// const {convertAny,convertLower} = require('./../helper/lower')


// async function create(req, res) {
//     const scoreDetails = _.pick(req.body, ['userid'])
//     const { validateScore } = require('../validation/scoreValidation')
//     const { error } = validateScore(scoreDetails)
//     if(error){
//         const statusErrValidation = statusErrCode('validation')
//         return response.bad_app(error,statusErrValidation.code,res)
//     } 
//     const scoreIncrement = await scoreAi.findByIdAndUpdate({_id: 'score'}, {$inc: { seq: 1}});
//     if(!scoreIncrement){
//         const statusErrInc = statusErrCode('inc')
//         return response.bad_app(statusResp,statusErrInc.code,res)
//     } 
//     scoreDetails["_id"] = scoreIncrement.seq

//     try {
//         const docScore =  new req.crudder(scoreDetails)
//         await docScore.save()
//         const statusApp = statusAppCode('success')
//         return response.success_app(statusApp.message,statusApp.code,res)
//     } catch (error) {
//         const statusErrDb = statusErrCode('errdb')
//         return response.bad_app(statusResp,statusErrDb.code,res)
//     }
    
// }
async function checkUser(req, res) {
    const scoreDetails = _.pick(req.body, ['userid'])
    const { validateScore } = require('../validation/scoreValidation')
    const { error } = validateScore(scoreDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)
    } 
    const userFindbyId = await req.crudder.findOne(scoreDetails)
    if(!userFindbyId){
        const scoreIncrement = await scoreAi.findByIdAndUpdate({_id: 'score'}, {$inc: { seq: 1}});
        if(!scoreIncrement){
            const statusErrInc = statusErrCode('inc')
            return response.bad_app(statusResp,statusErrInc.code,res)
        } 
        scoreDetails["_id"] = scoreIncrement.seq
        try {
            const docScore =  new req.crudder(scoreDetails)
            await docScore.save()
            const statusApp = statusAppCode('success')
            return response.success_app(statusApp.message,statusApp.code,res)
        } catch (error) {
            const statusErrDb = statusErrCode('errdb')
            return response.bad_app(statusResp,statusErrDb.code,res)
        }
    }else{
        const statusApp = statusAppCode('success')
        return response.success_app(statusApp.message,statusApp.code,res)
    }

}

async function list(req, res) {

   
}


async function detail(req, res) {
    if(req.data.is_admin){
        var userid = req.query.userid
    }else{
        var userid = req.data['_id'] 
    }
    const scoreDetails ={'userid':userid}
   
    const { validateScore } = require('../validation/scoreValidation')
    const { error } = validateScore(scoreDetails)
    if(error){
        const statusErrValidation = statusErrCode('validation')
        return response.bad_app(error,statusErrValidation.code,res)
    } 
    const userFindbyId = await req.crudder.findOne(scoreDetails)
    if(!userFindbyId){
        const statusErrUsername = statusErrCode('usernotfound')
        return response.bad_app(statusErrUsername.message,statusErrUsername.code,res)
    } 
    const statusApp = statusAppCode('success')
    const responseScore = {
        '_id':userFindbyId._id,
        'score': userFindbyId.score,
        'level': userFindbyId.level
    }
    return response.success_app(responseScore,statusApp.code,res)
}





module.exports = {
    // create: create,
    checkUser:checkUser,
    list: list,
    detail:detail
}