const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

// const Sauce = require('./models/sauce');

// grab DB details from .env file
dotenv.config();
const mongoUsername = process.env.DB_USERNAME;
const mongoPassword = process.env.DB_PASSWORD;
const mongoHost = process.env.DB_HOST;

// start up express
const app = express();

// connect to MongoDb
mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHost}`)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

// create API routes
app.use(express.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// signup route
app.use('/api/auth/signup', signupRoutes);

// login route
// app.use('/api/auth/login', loginRoutes);

// sauce route
// app.post('/api/sauces', (request, response, next) => {
//     const sauce = new Sauce({
//         sauce: request.body.sauce,
//         image: request.body.image
//     });
//     sauce.save().then(
//         () => {
//             response.status(201).json({
//                 message: 'Post saved successfully!'
//             })
//         }
//     ).catch(
//         (error) => {
//             response.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

// app.get('/api/auth/signup:id', (request, response, next) => {
//     Credential.findOne({
//         _id: request.params.id
//     }).then(
//         (credential) => {
//             response.status(200).json(crednetial);
//         }
//     ).catch(
//         (error) => {
//             response.datatis(404).json({
//                 error: error
//             });
//         }
//     );
// })

// app.use('/api/auth/signup', (request, response, next) => {
//     Credential.find().then(
//         (credentials) => {
//             response.status(200).json(credentials);
//         }
//     ).catch(
//         (error) => {
//             response.status(400).json({
//                 error: error
//             });
//         }
//     );
// });

module.exports = app;