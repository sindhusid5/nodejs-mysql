 

### Introducing MySQL Database to Your ExpressJS Application

#### Overview

This guide will help you integrate a MySQL database into your existing ExpressJS application. The database will store user information, allowing for scalability and simplification of your codebase.

#### Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- MySQL server installed and running
- Git

#### Instructions

1. **Clone the repository to your local machine:**

   ```bash
   git clone  https://github.com/sindhusid5/nodejs-mysql.git 
   ```

2. **Navigate to the project directory:**

   ```bash
   cd nodejs-mysql
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up MySQL Database:**

   - Ensure your MySQL server is running.
   - Create a new database and a `users` table.  

5. **Update MySQL Connection in Your Application:**

   Update your application (`app.js` or wherever your database connection is configured) to use the MySQL database. Here's a basic example of how you might set up the connection using `mysql2`:

   ```javascript
   const mysql = require('mysql2');
   const express = require('express');
   const app = express();

   const db = mysql.createConnection({
       host: 'localhost',
       user: 'your_mysql_username',
       password: 'your_mysql_password',
       database: 'node_authentication' // Change to your database name
   });

   // Check MySQL connection
   db.connect((err) => {
       if (err) {
           console.error('Error connecting to MySQL database:', err);
           return;
       }
       console.log('Connected to MySQL database...');
   });

   // Example route using MySQL
   app.get('/users/:id', (req, res) => {
       const userId = req.params.id;
       db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
           if (err) {
               console.error('Error querying MySQL:', err);
               res.status(500).send('Error fetching user');
               return;
           }
           res.json(results[0]);
       });
   });

   // Other routes and middleware setup...

   // Start the server
   const port = 4000;
   app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
   });
   ```

   Replace `'your_mysql_username'` and `'your_mysql_password'` with your MySQL username and password.

6. **Start the ExpressJS application:**

   ```bash
   npm start
   ```

   or

   ```bash
   node app.js
   ```

7. **Access Routes:**

   Once the server is running, you can access the following routes:

   - **POST `/users/login`:**
     - Returns a token (authorization header) for subsequent requests.
   
   - **GET `/users/:id`:**
     - Returns user details for a specific ID from the MySQL database.
   
   - **POST `/users`:**
     - Adds a new user to the MySQL database, but restricts this operation if the request is not sent from user ID 1 (for example, for administrative purposes).

   Example URLs:
   - Login: `http://localhost:4000/users/login`
   - Fetch user by ID: `http://localhost:4000/users/1`
   - Add user: `http://localhost:4000/users`

8. **Stop the server:**

   To stop the server, press `Ctrl + C` in the terminal.
 
