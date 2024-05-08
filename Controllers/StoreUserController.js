const UserModel = require('../Models/User')

module.exports = async(req, res) => {
    var user = await UserModel.create(req.body)
    if(user !== null)
        console.log(user);

    res.redirect('/');
}