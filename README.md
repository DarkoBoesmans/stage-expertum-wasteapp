# IVAGO Waste Management App - Proof of Concept

## Project Overview

This project is a proof of concept for IVAGO, Ghent's waste management company, aimed at modernizing their waste reporting and management system. The application allows citizens to report illegal dumping, which can then be processed and managed by IVAGO staff.

## Key Features

- **Modern UI**: Built with SAP UI5 and TypeScript for a responsive, user-friendly interface
- **Waste Report Management**: Create, view, update, and delete illegal dumping reports
- **Photo Management**: Upload, store, and associate photos with dumping reports
- **Cloud Storage Integration**: Photos stored in SAP BTP Object Store (in progress)
- **AI-based Categorization**: Automatic categorization of waste types from photos (planned)

## Technology Stack

- **Backend**: SAP Cloud Application Programming Model (CAP)
- **Frontend**: SAP UI5/Fiori with TypeScript
- **Storage**: SAP BTP Object Store for photo storage
- **AI Services**: SAP AI Business Services integration (planned)

## Project Structure

| File or Folder | Purpose |
|---------|----------|
| `app/` | Content for UI frontends goes here |
| `db/` | Your domain models and data go here |
| `srv/` | Your service models and code go here |
| `package.json` | Project metadata and configuration |
| `readme.md` | This project guide |

## Setup and Installation

### Prerequisites

- Node.js (LTS version)
- npm or Yarn
- SAP Cloud Platform account (for deployment)

### Local Development Setup

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Start the development server
   ```
   npm run start
   ```
   (In VS Code simply choose _**Terminal** > Run Task > cds watch_)
4. Access the application

## Available Scripts

- `npm run start`: Start the CAP server in hybrid profile mode
- `npm run upload-files`: Run the file upload script to process images
- `npm run cf:login`: Login to Cloud Foundry using SSO

## Features in Detail

### Illegal Dumping Reports

The application allows users to:
- View a list of dumping reports
- Create new reports with location, waste type, and photos
- Update existing reports (status, details, etc.)
- Delete reports
- Filter and search reports

### Photo Management

- Upload photos for dumping reports
- View photos in detail view
- Replace or delete photos
- Automatic processing of photos (via scripts)

### Object Store Integration (In Progress)

Photos are being moved to cloud storage via SAP BTP Object Store. The implementation includes:
- Upload of photos to cloud storage
- Association of stored photos with the correct reports
- Retrieval of photos from cloud storage for display

### AI-based Categorization (Planned)

Future enhancements include:
- Automatic analysis of waste photos
- AI-driven categorization of waste types
- Suggestion of appropriate priority based on image content
- Malware scanning of uploaded images

## Current Status

This project is in the proof of concept phase:
- Basic functionality is implemented
- UI has been modernized with SAP UI5
- Cloud storage integration is in progress
- AI functionality is planned for future implementation

## Next Steps

- Complete object store integration
- Implement AI-based categorization
- Enhance mobile responsiveness
- Add user authentication and role-based permissions
- Implement reporting and analytics

## Learn More

- [CAP Documentation](https://cap.cloud.sap/docs/get-started/)
- [UI5 Documentation](https://sapui5.hana.ondemand.com/)
- [SAP BTP Documentation](https://help.sap.com/docs/btp/sap-business-technology-platform/sap-business-technology-platform)