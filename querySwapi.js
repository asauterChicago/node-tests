const apiConnection = require('./lib/modules/apiConnection.js');

// Grab flags from the command line.
const grab = (flag) => {
  const indexAfterFlag = process.argv.indexOf(flag) + 1;
  return process.argv[indexAfterFlag];
};

const entity = grab('--entity');

const id = grab('--id');

// Query the Star Wars API.
apiConnection.getRequest(entity, id);

// Do something if data is received.
apiConnection.apiEmitter.on('dataReceived', (data) => {
  console.log(data.data);
});

// Do something if an error occurs.
apiConnection.apiEmitter.on('responseError', (error) => {
  console.log(error);
});
