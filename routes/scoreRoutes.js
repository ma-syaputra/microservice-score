
const score = require('../api/controllers/score')
module.exports = function(app) {
    const auth = require('../middleware/auth')
    // app.route('/score').post(auth,score.create)
    // app.route('/generate').post(auth,score.generate)
    app.route('/checkuser').post(auth,score.checkUser)
    // app.route('/score').get(score.list)
    app.route('/detail').get(auth,score.detail)
    // app.route('/user/login').post(user)
    // app.route('/user/validate').post(user)
    // app.route('/user/logout').post(user)
}