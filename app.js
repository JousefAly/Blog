const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./Models/BlogPost');

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', (req, res) => {
    console.log(req.body)

    BlogPost.create(req.body)
        .then((result) => {
            console.log('created Blog Post', result)
        })
        .catch((error) => {
            console.log(error)
        })


    res.redirect('/')
})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})