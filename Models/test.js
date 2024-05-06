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

var id = "66394a6bfefd43a913c6c8d8";

BlogPost.findByIdAndDelete(id)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })


