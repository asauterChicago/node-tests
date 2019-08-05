const request = require('axios');
const events = require('events');

const apiEmitter = new events.EventEmitter();

// Example of creating an instance of a connection with auth.
const connection = request.create({
  baseURL: 'http://scms-THE-URL.COM/jsonapi/',
  timeout: 1000,
  auth: {
    username: 'email@email.com',
    password: 'password',
  },
});

const logData = (response) => {
  apiEmitter.emit('dataReceived', response);
};
const logError = (error) => {
  apiEmitter.emit('responseError', error);
};

// Example of a simple GET Request with with event listeners.
const getRequest = (entity, id, done = f => f) => {
  request.get(`https://swapi.co/api/${entity}/${id}/`)
    .then((data) => { logData(data); done(data); })
    .catch((error) => { logError(error); done(error); });
};

module.exports = {
  apiEmitter,
  getRequest,
  connection,
};
