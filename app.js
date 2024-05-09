const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./Models/BlogPost');
const expressSession = require('express-session');

const NewPostController = require('./Controllers/NewPost');
const NewUserController = require('./Controllers/NewUserController');
const StoreUserController = require('./Controllers/StoreUserController');

const LoginController = require('./Controllers/Login');
const LoginUserController = require('./Controllers/LoginUser');
const LogoutController = require('./Controllers/Logout');

const authenticationMiddleware = require('./Middleware/AuthenticationMiddleware');

const app = new express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({ secret: 'keyboard cat' }));

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

mongoose.connect('mongodb+srv://jousefaly3:0000@mymongodbcluster.4kcckcm.mongodb.net/Blog');

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/auth/register', NewUserController);
app.post('/users/register', StoreUserController);

app.get('/auth/logout', LogoutController);

app.get('/auth/login', LoginController);
app.post('/users/login', LoginUserController);

app.get('/', async (req, res) => {
    var blogPosts;
    if (loggedIn)
        blogPosts = await BlogPost
            .find({})
            .populate('userId');
    else
        blogPosts = await BlogPost
            .find({})
            .populate('userId');
    console.log(blogPosts);
    console.log(req.session);
    res.render('index', {
        blogPosts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    console.log(req.params.id)
    const post = await BlogPost.findById(req.params.id)
    res.render('post', {
        post
    });
})


app.get('/posts/new', authenticationMiddleware, NewPostController);

app.post('/posts/store', authenticationMiddleware, async (req, res) => {
    console.log('received request body from html form.  ', req.body);

    BlogPost.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.session.userId,
        datePosted: new Date()
    })
        .then((result) => {
            console.log('result from create: ', result)
        })
        .catch((error) => {

            console.log(error);
            return res.status(500).send('Error occurred while creating blog post.');
        })

    console.log('redirecting now')
    res.redirect('/')

})


app.listen(4000, () => {
    console.log('App listening on port 4000')
})