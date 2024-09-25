const Sauce = require('../models/sauce');

exports.createSauce = (request, response, next) => {
    const url = request.protocol + '://' + request.get('host');
    request.body.sauce = JSON.parse(request.body.sauce);

    const sauce = new Sauce({
        sauce: request.body.sauce,
        imageUrl: url + '/images/' + request.file.filename
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

exports.modifySauce = (request, response, next) => {
    let sauce = new Sauce({ _id: request.params._id });
    if (request.file) {
        const url = request.protocol + '://' + request.get('host');
        request.body.sauce = JSON.parse(request.body.sauce);
        sauce = {
            _id: request.params.id,
            title: request.body.sauce.title,
            description: request.body.sauce.description,
            imageUrl: url + '/images/' + request.file.filename,
            price: request.body.sauce.price,
            userId: request.body.sauce.userId
        };
    } else {
        sauce = {
            _id: request.params.id,
            title: request.body.title,
            description: request.body.description,
            imageUrl: request.body.imageUrl,
            price: request.body.price,
            userId: request.body.userId
        };
    }
    Sauce.updateOne({ _id: request.params.id }, sauce).then(
        () => {
            response.status(201).json({
                message: 'Sauce updated successfully!'
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