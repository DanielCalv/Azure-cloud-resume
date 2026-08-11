
## Overview

This project is a personal portfolio website built to demonstrate practical Microsoft Azure skills. Rather than creating a static website, the project uses several Azure services to provide dynamic functionality through a serverless architecture.

The website is hosted using Azure Storage Static Website Hosting and retrieves project status information from Azure Table Storage through an Azure Function.

Live site: https://danielcalvertresume.z28.web.core.windows.net/

---

## Requirements

| Requirement                        | Status    | How                                                                     |
| ---------------------------------- | --------- | ----------------------------------------------------------------------- |
| Hosted on Azure                    | Completed | Azure Storage static website hosting                                    |
| Automatically deployed from GitHub | Completed | GitHub Actions, on every push to `main`                                 |
| Uses Azure Functions               | Completed | `GetProjectStatuses` HTTP-triggered function                            |
| Uses Azure Table Storage           | Completed | `ProjectStatuses` table drives the status pills on the Projects section |
| Has HTTPS                          | Completed | Default on the Azure Storage static website endpoint                    |
| Includes documentation             | Completed | This file                                                               |
| Uses Azure Monitor                 | Not yet   | Planned next step — Application Insights on the Function App            |
| Uses RBAC                          | Partial   | See note below                                                          |

The original plan was to authenticate GitHub Actions to Azure using an Entra ID app registration with a role assignment scoped to just this storage account. However, this was blocked by Loughboroughs Entra ID tenant policy, which prevented me, as a student, from being able to create app registrations. Instead, I decided to authenticate using a storage account key and a Function App, both stored as GitHub encrypted secrets

---

## Architecture

The website and Azure Function are now contained within a single GitHub repository. The repository contains the website frontend and the serverless backend, with GitHub Actions workflows used to deploy each component to Azure.

The site's workflow uploads index.html, styles.css and script.js into the storage account's `$web` container, while the functions workflow publishes the Function App using a publish profile.

On the backend, an Azure Function called GetProjectStatuses reads every row from a Table Storage table named ProjectStatuses, where each row holds a project's slug and its current status (Live, In Progress, or Planned). When someone visits the site, script.js calls that Function over HTTP and uses the returned JSON to update the status pill on each project card. In practice, this means updating a project's status is a one-line change in a Table Storage row rather than an edit to the website's source code.

For a full account of how each piece was built, see PROCESS.md.

---

## Files

**Website:**

| File                           | Purpose                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `index.html`                   | Page structure and content                                                             |
| `styles.css`                   | Styling (light theme, sidebar layout, responsive)                                      |
| `script.js`                    | Nav behaviour, active-section highlighting, fetches project statuses from the Function |
| `.github/workflows/deploy.yml` | Uploads site files to Azure Storage on push to `main`                                  |

**Azure Functions:**

| File                                  | Purpose                                           |
| ------------------------------------- | ------------------------------------------------- |
| `src/functions/GetProjectStatuses.js` | Reads the `ProjectStatuses` table, returns JSON   |
| `.github/workflows/deploy.yml`        | Publishes the function to Azure on push to `main` |

---

## Next steps

---
