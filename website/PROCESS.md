# Project Build Process

## 1. Website Hosting

### Objective

Host a static portfolio website on Microsoft Azure.

### Implementation

Originally the project was intended to use Azure Static Web Apps. However, the Azure for Students subscription did not support the required deployment region. Therefore instead, the website was hosted using Azure Storage Static Website Hosting.

Steps completed:

- Created an Azure Storage Account
- Enabled Static Website Hosting
- Configured index.html as the default document
- Azure generated a public website endpoint

---

## 2. Website Deployment

The website consists of:

- index.html
- styles.css
- script.js
- images

These files were uploaded into the automatically created $web Blob Storage container.

Once uploaded, the website became publicly accessible through the Storage Account endpoint.

---

## 3. Storage Authentication

Authentication to the Storage Account was completed using the Storage Account Access Keys.

The Storage Account connection string is later reused by the Azure Function to communicate securely with Azure Table Storage.

---

## 4. Azure Table Storage

### Objective

Store project statuses outside the website so they can be updated without changing HTML.

A table named ProjectStatuses was created.

Example data:

| Project | Status |
|----------|---------|
| azure-cloud-resume | InProgress |
| azure-vm-lab | Planned |
| entra-id-lab | Planned |
| formula-1-data-analysis | Live |
| hybrid-ad | Planned |

This separates application data from presentation.

---

## 5. Azure Function

### Objective

Create an API that retrieves project statuses from Azure Table Storage.

Implementation:

- Created a Node.js Azure Functions project
- Installed the Azure Data Tables SDK
- Created an HTTP Trigger function called GetProjectStatuses
- Connected the function to Azure Table Storage using the Storage Account connection string
- Queried all rows within the ProjectStatuses table
- Returned the results as JSON

Example response:

```json
{
  "azure-cloud-resume": "InProgress",
  "azure-vm-lab": "Planned",
  "entra-id-lab": "Planned",
  "formula-1-data-analysis": "Live",
  "hybrid-ad": "Planned"
}
```

---

## 6. API Testing

The Azure Function was executed locally using Azure Functions Core Tools.

The endpoint was tested by browsing to:

```
http://localhost:7072/api/GetProjectStatuses
```

Successful responses confirmed the Azure Function could retrieve data from Azure Table Storage.

---

## 7. Dynamic Website Content

The project status pills were originally hardcoded inside the HTML.

This was replaced with JavaScript that:

- Calls the Azure Function using the Fetch API
- Retrieves the JSON response
- Locates each project's status pill
- Updates the text dynamically
- Applies the correct CSS styling

Updating a project's status now only requires editing Azure Table Storage rather than modifying the website source code.

---

## 8. Cross-Origin Resource Sharing (CORS)

During local development the browser blocked requests between:

- Live Server
- Azure Functions

CORS was configured within the Azure Function project to allow requests from the local development server.

After enabling CORS the website successfully communicated with the Azure Function.

---
