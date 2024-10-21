const Sauce = require('../models/sauce');
const fs = require('fs');

// display all sauces
exports.getAllSauces = (request, response, next) => {
    Sauce.find().then(
        (sauces) => {
            response.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: 'Sauces were not found!'
            });
        }
    );
};

// return a single sauce
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({
        _id: request.params.id
    }).then(
        (sauce) => {
            response.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: 'Sauce was not found!'
            });
        }
    );
};

// create a new sauce with image
exports.createSauce = (request, response, next) => {
    request.body = JSON.parse(request.body.sauce);
    const url = request.protocol + '://' + request.get('host');
    const sauce = new Sauce({
        userId: request.body.userId,
        name: request.body.name,
        manufacturer: request.body.manufacturer,
        description: request.body.description,
        mainPepper: request.body.mainPepper,
        heat: request.body.heat,
        imageUrl: url + '/images/' + request.file.filename,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save().then(
        () => {
            response.status(201).json({
                message: 'New sauce created!'
            });
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: 'Sauce was not created!'
            });
        }
    );
};

// like or dislike made sauces
exports.likeSauce = (request, response, next) => {
    user = request.body.userId;
    like = request.body.like;

    Sauce.findOne({ _id: request.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return response.status(404).json({
                    error: 'Sauce not found!'
                });
            }
            // check who liked sauces
            usersLiked = sauce.usersLiked;
            usersDisliked = sauce.usersDisliked;
            switch (like) {
                // like the sauce
                case 1:
                    if (usersLiked.includes(user)) {
                        return response.status(401).json({
                            error: 'Sauce has already been liked!'
                        });
                    }
                    if (!usersLiked.includes(user)) {
                        usersLiked.push(user);
                        usersDisliked.remove(user);
                        sauce.save().then(
                            () => {
                                response.status(201).json({
                                    message: 'Sauce has been liked!'
                                });
                            }
                        ).catch(
                            (error) => {
                                response.status(400).json({
                                    error: 'Sauce could not be liked!'
                                });
                            }
                        );
                    };
                    break;
                // dislike the sauce
                case -1:
                    if (usersDisliked.includes(user)) {
                        return response.status(401).json({
                            error: 'Sauce has already been disliked!'
                        });
                    }
                    if (!usersDisliked.includes(user)) {
                        usersDisliked.push(user);
                        usersLiked.remove(user);
                        sauce.save().then(
                            () => {
                                response.status(201).json({
                                    message: 'Sauce has been disliked!'
                                });
                            }
                        ).catch(
                            (error) => {
                                response.status(400).json({
                                    error: 'Sauce could not be disliked!'
                                });
                            }
                        );
                    };
                    break;
                // remove (dis)like from the sauce
                case 0:
                    usersLiked.remove(user);
                    usersDisliked.remove(user);
                    sauce.save().then(
                        () => {
                            response.status(201).json({
                                message: 'Like has been reset!'
                            });
                        }
                    ).catch(
                        (error) => {
                            response.status(400).json({
                                error: 'Like could not be reset!'
                            });
                        }
                    );
                    break;
                default:
                    return response.status(401).json({
                        error: 'Like is not of the values -1, 0, or 1!'
                    });
            }
            // add up total number of likes & dislikes
            sauce.likes = usersLiked.length;
            sauce.dislikes = usersDisliked.length;
        }
    )
};

// modify contents of existing sauce
exports.modifySauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return response.status(404).json({
                    error: 'Sauce not found!'
                });
            }

            // parse images before validating user
            if (request.file) {
                request.body = JSON.parse(request.body.sauce);
            }

            // verify user authorization
            if (!((sauce.userId == request.auth.userId) && (sauce.userId == request.body.userId))) {
                return response.status(401).json({
                    error: 'Request not authorized!'
                });
            }
            else {
                if (request.file) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink('images/' + filename, () => {})
                        const url = request.protocol + '://' + request.get('host');
                        sauce = {
                            _id: request.params.id,
                            name: request.body.name,
                            manufacturer: request.body.manufacturer,
                            description: request.body.description,
                            mainPepper: request.body.mainPepper,
                            heat: request.body.heat,
                            imageUrl: url + '/images/' + request.file.filename,
                            userId: request.body.userId
                        };
                    
                } else {
                    sauce = {
                        _id: request.params.id,
                        name: request.body.name,
                        manufacturer: request.body.manufacturer,
                        description: request.body.description,
                        mainPepper: request.body.mainPepper,
                        heat: request.body.heat,
                        imageUrl: request.body.imageUrl,
                        userId: request.body.userId
                    };
                }
                Sauce.updateOne({ _id: request.params.id }, sauce).then(
                    () => {
                        response.status(201).json({
                            message: 'Sauce has been updated!'
                        });
                    }
                ).catch(
                    (error) => {
                        response.status(400).json({
                            error: 'Sauce was not updated!'
                        });
                    }
                );
            }
        }
    )
};

// delete an existing sauce
exports.deleteSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return response.status(404).json({
                    error: 'Sauce not found!'
                });
            }
            if (sauce.userId !== request.auth.userId) {
                return response.status(401).json({
                    error: 'Request not authorized!'
                });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: request.params.id }).then(
                    () => {
                        response.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        response.status(400).json({
                            error: 'Sauce could not be deleted!'
                        });
                    }
                );
            })
        }
    );
};