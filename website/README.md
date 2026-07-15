# Azure Cloud Resume

## Overview

This project is a personal portfolio website built to demonstrate practical Microsoft Azure skills. Rather than creating a static website, the project uses several Azure services to provide dynamic functionality through a serverless architecture.

The website is hosted using Azure Storage Static Website Hosting and retrieves project status information from Azure Table Storage through an Azure Function. 

Live site: http://127.0.0.1:5500/Azure%20Cloud%20Project/index.html

---
## Requirements 

| Requirement | Status | How |
|---|---|---|
| Hosted on Azure | Completed | Azure Storage static website hosting |
| Automatically deployed from GitHub | Completed | GitHub Actions, on every push to `main` |
| Uses Azure Functions | Completed | `GetProjectStatuses` HTTP-triggered function |
| Uses Azure Table Storage | Completed | `ProjectStatuses` table drives the status pills on the Projects section |
| Has HTTPS | Completed | Default on the Azure Storage static website endpoint |
| Includes documentation | Completed | This file |
| Uses Azure Monitor | Not yet | Planned next step — Application Insights on the Function App |
| Uses RBAC | Partial | See note below |

The original plan was to authenticate GitHub Actions to Azure using an Entra ID app registration with a role assignment scoped to just this storage account. However, this was blocked by Loughboroughs Entra ID tenant policy, which prevented me, as a student, from being able to create app registrations. Instead, I decided to authenticate using a storage account key and a Function App, both stored as GitHub encrypted secrets

---
## Architecture

The site is a static HTML/CSS/JS front end hosted on an Azure Storage Account's static website
feature. Both this repo and a separate cloud-resume-functions repo have their own GitHub Actions
workflow, each triggered on push to main: the site's workflow uploads index.html, styles.css
and script.js into the storage account's $web container, while the functions workflow publishes
the Function App using a publish profile.

On the backend, an Azure Function called GetProjectStatuses reads every row from a Table Storage
table named ProjectStatuses, where each row holds a project's slug and its current status
(Live, In Progress, or Planned). When someone visits the site, script.js calls that Function over
HTTP and uses the returned JSON to update the status pill on each project card. In practice, this
means updating a project's status is a one-line change in a Table Storage row rather than an edit
to the website's source code.

For a full account of how each piece was built, see PROCESS.md.

---
## Files 
**Site repo:**
| File | Purpose |
|---|---|
| `index.html` | Page structure and content |
| `styles.css` | Styling (light theme, sidebar layout, responsive) |
| `script.js` | Nav behaviour, active-section highlighting, fetches project statuses from the Function |
| `.github/workflows/deploy.yml` | Uploads site files to Azure Storage on push to `main` |
 
**Functions repo (separate):**
| File | Purpose |
|---|---|
| `src/functions/GetProjectStatuses.js` | Reads the `ProjectStatuses` table, returns JSON |
| `.github/workflows/deploy.yml` | Publishes the function to Azure on push to `main` |

---
## Next steps

---
