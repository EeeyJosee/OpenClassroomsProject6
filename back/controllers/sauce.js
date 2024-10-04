const Sauce = require('../models/sauce');

// Display all sauces
exports.getAllSauces = (request, response, next) => {
    Sauce.find().then(
        (sauces) => {
            response.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: error
            });
        }
    );
};

// Create a new sauce with image
exports.createSauce = (request, response, next) => {
    const url = request.protocol + '://' + request.get('host');
    console.log(request.body.sauce);
    request.body = JSON.parse(request.body.sauce);
    //TODO after finishing part 4, update IMG url
    const sauce = new Sauce({
        userId: request.body.userId,
        name: request.body.name,
        manufacturer: request.body.manufacturer,
        description: request.body.description,
        mainPepper: request.body.mainPepper,
        heat: request.body.heat,
        imageUrl: "TODO",
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save().then(
        () => {
            response.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: error
            });
        }
    );
};

// exports.modifySauce = (request, response, next) => {
//     let sauce = new Sauce({ _id: request.params._id });
//     if (request.file) {
//         const url = request.protocol + '://' + request.get('host');
//         request.body.sauce = JSON.parse(request.body.sauce);
//         sauce = {
//             _id: request.params.id,
//             title: request.body.sauce.title,
//             description: request.body.sauce.description,
//             imageUrl: url + '/images/' + request.file.filename,
//             price: request.body.sauce.price,
//             userId: request.body.sauce.userId
//         };
//     } else {
//         sauce = {
//             _id: request.params.id,
//             title: request.body.title,
//             description: request.body.description,
//             imageUrl: request.body.imageUrl,
//             price: request.body.price,
//             userId: request.body.userId
//         };
//     }
//     Sauce.updateOne({ _id: request.params.id }, sauce).then(
//         () => {
//             response.status(201).json({
//                 message: 'Sauce updated successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             response.status(400).json({
//                 error: error
//             });
//         }
//     );
// };

// exports.deleteThing = (req, res, next) => {
//     Thing.findOne({ _id: req.params.id }).then(
//       (thing) => {
//         if (!thing) {
//           return res.status(404).json({
//             error: new Error('Objet non trouvé !')
//           });
//         }
//         if (thing.userId !== req.auth.userId) {
//           return res.status(401).json({
//             error: new Error('Requête non autorisée !')
//           });
//         }
//         Thing.deleteOne({_id: req.params.id}).then(
//           () => {
//             res.status(200).json({
//               message: 'Deleted!'
//             });
//           }
//         ).catch(
//           (error) => {
//             res.status(400).json({
//               error: error
//             });
//           }
//         );
//       }
//     );
//   };