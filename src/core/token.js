const jwt = require('jsonwebtoken');
const SOALT = 'shhhhh'
const _ = require('lodash');
const _time = (num) =>{
    return num*1000
}
const LIMITTIME = _time(60)

class Token{
    constructor(){}
    sign(obj){
        return jwt.sign(obj, SOALT);
    }
    verify(token){
        return jwt.verify(token, SOALT, (err, data)=> {
            if (err) {
                return false
            }
            const {iat} = data
            const _nowTime = _.now()
            return _nowTime > LIMITTIME + iat ? false : data
        })
    }
}
module.exports = {
    Token
}