const mongoose = require('mongoose')
const BlogPost = require('./BlogPost')

mongoose.connect('mongodb://localhost/Blog');

BlogPost.create({
    title: "test title 2",
    body: "test body hehehe 2"
})
.then((result) => {
    console.log(result)
})
.catch((error) => {
    console.log(error)
})

