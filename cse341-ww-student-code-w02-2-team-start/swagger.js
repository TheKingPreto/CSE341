const { request, response } = require('express');
const { put } = require('./routes/temple');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Temple API',
        description: 'An API to manage a list of temples'
    },

    host: 'localhost:8080',
    schemes: ['http'],
    tags: [
        {
            name: 'Temples', description: 'Endpoints for managing temples'
        }
    ],
    paths: {
        '/temples': {
            get: {
                tags: ['Temples'],
                summary: 'Get all temples',
                responses: {
                    200: { description: 'A list of temples' }
                }
            },
            post: {
                tags: ['Temples'],
                summary: 'Create a new temple',
                requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/definitions/TempleInput' } } } },
                responses: {
                    201: { description: 'Temple created successfully' } }
          }
     },
        '/temples/{temple_id}': {
            get: {
                tags: ['Temples'],
                summary: 'Get a temple by ID',
                parameters: [
                    { name: 'temple_id', in: 'path', required: true, schema: { type: 'string' }, description: 'ID of the temple to retrieve' }],
                    responses: { '200': { description: 'Temple details' }, '404': { description: 'Temple not found' } }
    },

    put: {
        tags: ['Temples'],
        summary: 'Update a temple',
        parameters: [
            { name: 'temple_id', in: 'path', required: true, schema: { type: 'string' }, description: 'ID of the temple to update' }],
            requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/definitions/TempleInput' } } } },
            responses: { '200': { description: 'Temple updated successfully' }, '404': { description: 'Temple not found' } }
    },

    delete: {
        tags: ['Temples'],
        summary: 'Delete a temple',
        parameters: [{ name: 'temple_id', in: 'path', required: true, schema: { type: 'string' }, description: 'ID of the temple to delete' }],
        responses: { '200': { description: 'Temple deleted successfully' }, '404': { description: 'Temple not found' } }
    }
    }
    },
    definitions: {
        TempleInput: {
            temple_id: 999,
            name: 'Sample Temple',
            location: 'Sample Location',
            dedicated: 'In construction',
            additional_info: true
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);