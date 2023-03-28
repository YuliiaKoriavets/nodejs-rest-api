
# Node.js REST API


This is a simple RESTful API project built with Node.js, Express.js, and MongoDB.

## Getting Started 

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/YuliiaKoriavets/nodejs-rest-api.git`.

2. Install the dependencies: `npm install`.

3. Create .env file and fill in the necessary environment variables.

4. Start the development server: `npm run start:dev`.

5. The API should now be accessible at http://localhost:3000.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`NODE_ENV` = dev;

`PORT` = 3000;

`DB_URI` = mongodb+srv://yuliya:rJKRsd2pSz7k4Ir6@cluster0.dwb0krt.mongodb.net/db-contacts?retryWrites=true&w=majority

## API Endpoints

The following endpoints are available:

| Method | Endpoint     | Description                |
| :-------- | :------- | :------------------------- |
| GET | / api / contacts | Get all contacts |
| GET | / api / contacts / :contactId | Get a single contact by id |
| POST | / api / contacts | Create a new contact |
| PUT | / api / contacts / :contactId | Update a contact by id |
| PATCH | / api / contacts / :contactId / favorite | Update status of a contact by id |
| DELETE | / api / contacts / :contactId | Delete a contact by id |


