const JOI = require('joi');
const db = require('./connection');

const schema = JOI.object().keys({
    username: JOI.string().alphanum().required(),
    subject: JOI.string().required(),
    message: JOI.string().max(500).required(),
    imageURL: JOI.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const messages = db.get('messages');

function getAll(){
    return messages.find();
}

function create(message){
    if (!message.username) message.username = 'Anonymous';
    const result = JOI.validate(message, schema);
    if (result.error == null){
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create,
    getAll    
};