request = require('request')

module.exports = function(req, res, next) {
    
    const token = req.headers["authorization"]
    if(!token) return res.status(401).json('unauthorized');
    const options = {
        headers: {
            'authorization' : token
        },
        method: 'GET',
        url: 'http://localhost:4001/validate',
        json : true  
    };
    request(options, function(err, response, body) {
        console.log(err)
        if(response.statusCode == 200){
            req.data = body.response
            next()
        }else{
            return res.status(401).json("unauthorized");
        }
    });


};
