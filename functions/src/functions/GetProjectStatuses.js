const { app } = require('@azure/functions');

app.http('GetProjectStatuses', {
    methods: ['GET'],
    authLevel: 'anonymous',

    handler: async (request, context) => {

        return {
            status: 200,
            jsonBody: {
                "azure-cloud-resume": "InProgress",
                "azure-vm-lab": "Planned",
                "entra-id-lab": "Planned",
                "formula-1-data-analysis": "Live",
                "hybrid-ad": "Planned"
            }
        };

    }
});