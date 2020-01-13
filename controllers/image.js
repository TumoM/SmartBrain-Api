const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
    apiKey: 'f3ba43889e7946579ffb301dd5999467'
});

const handleApiCall = (req,res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        console.log('image url error',err);
        
        res.status(400).json('unable to work with api');
    })
}

const handleImage = (req, res, knex) => {
    const id = req.body.id
    knex('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then((entires) =>{
        res.json(entires)
    })
    .catch((err) =>{
        console.error('Err',err);
        
        res.status(400).json('unable to get entries.')
    })

}

module.exports = {
    handleImage,
    handleApiCall
}