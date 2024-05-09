const UserModel = require('../Models/User');


module.exports = async (req, res, next) =>{
    const user = await UserModel.findById(req.session.userId);

    if(user === null)
        return res.redirect('/auth/login');
    next();
}