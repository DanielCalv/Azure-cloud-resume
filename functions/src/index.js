const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
});

// Load functions
require('./functions/GetProjectStatuses');