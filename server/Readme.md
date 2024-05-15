Task Manager Test API
This project is a RESTful API for a task manager application built with Express and MongoDB.

Prerequisites
Before running the API, ensure you have the following installed on your machine:

Node.js
MongoDB
Installation
Clone this repository to your local machine:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory of your project and define the following variables:

dotenv
Copy code
MONGO=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
Running the API
Start your MongoDB server.

Run the API:

bash
Copy code
npm start
The API will start running on port 3000 by default.

dotenv
Copy code
MONGO="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret-key"