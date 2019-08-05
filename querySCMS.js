const apiConnection = require('./lib/modules/apiConnection.js');

const { connection } = apiConnection;

// Our data to post.
const data = {
  data: {
    type: 'user--user',
    attributes: {
      name: 'johnsmith@testing.com',
      status: true,
      mail: 'johnsmith@testing.com',
      field_first_name: 'John',
      field_last_name: 'Smith',
      password: 'pa55word',
    },
    relationships: {
      roles: {
        data: [
          {
            type: 'user_role--user_role',
            id: 'be10323e-18b1-4ada-9a6d-f46c9151af43',
          },
          {
            type: 'user_role--user_role',
            id: 'd0b515ce-89d5-4c37-a581-626df3b69a11',
          },
        ],
      },
    },
  },
};

// Simple get request to get roles in SCMS.
const getUserRoles = (done = f => f) => {
  connection.get('/user_role/user_role')
    .then((data) => { done(data); })
    .catch((error) => { done(error); });
};

// Post a new user with the data filled above.
const postNewUser = (done) => {
  connection.post('/user/user', data, {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
  })
    .then(response => done(response))
    .catch((error) => { done(error); });
};

// Post new user call.
postNewUser((data) => {
  console.log(data);
});

// Get user roles call.
getUserRoles((data) => { console.log(data.data); });
