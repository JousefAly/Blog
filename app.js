const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./Models/BlogPost');

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost/Blog');

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', async (req, res) => {
    const blogPosts = await BlogPost.find({});
    console.log(blogPosts);
    
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

app.get('/post/:id', async(req, res) => {
    console.log(req.params.id)
    const post = await BlogPost.findById(req.params.id)
    res.render('post',{
        post
    });
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', async (req, res) => {
    console.log('received request body from html form.  ', req.body);

    BlogPost.create(req.body)
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