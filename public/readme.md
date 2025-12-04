### BACKEND setup
```
cd backend
npm init -y
npm install express mongoose cors dotenv nodemon
```

Express is a Node.js framework that makes it easy to create servers, handle routes, and manage HTTP requests.

Mongoose is a javascript library that conncects Node.js to MongoDB and lets you define data models easily.

CORS is a middleware that allows your frontend to access backend APIs from a different origin.

Dotenv is a library that loads environment variables from a .env file to keep sensitive info safe.

Nodemon is a tool that automatically restarts your Node.js server whenever backend code changes.


create a new connection in mongodb atlas cloud

npm install mongodb

- Create a `.env` file in the `backend/`:

- create a contact js file and created a mongodb schema and then create a model for performing crud operations.

- create a routes file

-Import necessary packages and initiate a router method


### FRONTEND setup

- npm create vite@latest frontend

- npm install axios

- npm install bootstrap

- delete app.css
- delete assets

- remove unwanted contents from the app.jsx( except import usestate, function app(){}, return(), export default app)

- create a components folder inside src
- create 2 files (contactForm, contactList)

- import both files in the app.jsx

# deployment


Backend
- To host the backend - Render
create a new web service. Add a name . Root directory name = backend 
Build comment = npm install
Start comment = npm start

Frontend
- To host the frontend - Netlify