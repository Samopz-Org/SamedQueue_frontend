# SamedQueue Backend

## Overview
SamedQueue is a backend application designed to manage patient queues and authentication for a clinic. It provides a set of APIs for user authentication, patient management, and queue operations.

## Features
- User authentication (login and signup)
- Patient registration, update, and removal
- Queue management (next patient, current queue, queue size, estimate wait time)
- Email-based patient retrieval and symptom updates

## Project Structure
```
samedqueue-backend
├── src
│   ├── controllers          # Contains the logic for handling requests
│   ├── models               # Defines the data models
│   ├── routes               # Sets up the API routes
│   ├── services             # Contains business logic
│   ├── app.js               # Entry point of the application
│   └── config               # Configuration files
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd samedqueue-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection string).

## Usage
To start the application, run:
```
npm start
```
The server will start on the specified port (default is 3000).

## API Endpoints
### Authentication
- **POST /api/auth/login**: Log in a user
- **POST /api/auth/signup**: Register a new user

### Patient Management
- **POST /api/patients/register**: Register a new patient
- **PUT /api/patients/update**: Update patient information
- **DELETE /api/patients/remove**: Remove a patient
- **GET /api/patients/email**: Get patient details by email

### Queue Management
- **GET /api/queue/next**: Get the next patient in the queue
- **GET /api/queue/current**: Get the current queue
- **GET /api/queue/size**: Get the size of the queue
- **GET /api/queue/wait-time**: Estimate wait time for the next patient

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.