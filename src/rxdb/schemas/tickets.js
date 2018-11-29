export const ticketsSchema = {
    title: 'tickets_schema',
    description: 'Schema to store the user tickets.',
    version: 0,
    type: 'object',
    properties: {
        ID: {
            type: 'number'
        },
        eventName: {
            type: 'string'
        },
        eventIMG: {
            type: 'string'
        },
        verified: {
            type: 'boolean'
        }
    },
    required: ['ID', 'verified']
};
