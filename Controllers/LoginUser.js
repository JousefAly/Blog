const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    var user = await UserModel.findOne({ username: username });

    if (!user) {
        res.redirect('/auth/login');

    }
    else {        
            const passwordMatched =  await bcrypt.compare(password, user.password);
            if(!passwordMatched)
                res.redirect('/auth/login');

            else{
                //store user session
                console.log('user logined ', username)
                res.redirect('/')
            }        
    }


}