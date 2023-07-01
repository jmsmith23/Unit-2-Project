# Unit-2-Project

## Blog API

This API allows a user to create, update, delete, like and comment on blog posts. The user, once signed up with a username/email/password, will be able to login/logout, create and interact with other blog posts, update their login credentials and also delete their profile.

## Prerequisites

- node.js
- nodemon
- VS Code

## Getting Started

1. Go to your computers terminal and create a new directory to store this project in (ex. `mkdir Blog_API`) and cd into that directory.

2. Towards the top of this page (https://github.com/jmsmith23/Unit-2-Project) click on the green button that says "<> Code".

3. Make sure 'SSH' is highlighted and copy the code to your clipboard,

4. Return to your terminal and under the directory you created type `git clone` and then paste the contents of the clipboard after it.

5. Once the project is cloned you need to cd into the directory called 'Unit-2-Project'

6. From 'Unit-2-Project' type `code .` to launch the project in VS Code.

7. When VS Code opens you will want to open the terminal at the bottom of the screen and type `npm i` to install all of the packages needed to run the app. The packages installed include mongoose, morgan, express, jsonwebtoken, bcrypt, dotenv as well as jest, supertest, mongodb-memory-server, and artillery (at version 1.7.9 intentionally) as dev dependencies.

8. Next, in your terminal, you will have to touch a file called `.env`. This file contains sensitive information which is why it is listed in the .gitignore file. The .gitignore file will keep this information from being posted to github or making it public in any way.

9. In the `.env` file, create an environment variable called `MONGO_URI=`. After the "=" paste in your personal URI string to connect to the database (ex. `MONGO_URI= mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin`).You will also want to make another variable called `SECRET=` which will contain your password for your authorization token. Use this site (https://emn178.github.io/online-tools/sha256.html) to create a hash of your password to keep it secret and paste it into your .env (ex `SECRET= 123456....`)

10. Lastly you will want to start the server by typing `npm run dev` in the terminal.

## Using the Blog API
