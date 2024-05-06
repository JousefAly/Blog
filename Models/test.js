const mongoose = require('mongoose')
const BlogPost = require('./BlogPost')

mongoose.connect('mongodb://localhost/Blog');

// BlogPost.create({
//     title: "test title 2",
//     body: "test body hehehe 2"
// })
// .then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log(error)
// })

// BlogPost.find({ body: 'test body hehehe' })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

var id = "663948f108d89c48bdfa51c2";

BlogPost.findByIdAndUpdate(id,{ body: 'test body hehehe updated' })
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })


