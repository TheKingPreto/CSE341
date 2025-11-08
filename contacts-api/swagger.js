const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for storing and retrieving contact information.',
  },
  host: 'https://cse341-rdu3.onrender.com', 
  schemes: ['https'],
  definitions: {
    Contact: {
      firstName: "Lucas",
      lastName: "Silva",
      email: "lucasoliveirasilva2008@gmail.com",
      favoriteColor: "Blue",
      birthday: "2001-03-27"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);