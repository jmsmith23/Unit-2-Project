# Unit-2-Project

## Blog API

This API allows a user to create, update, delete, like and comment on blog posts. The user, once signed up with a username/email/password, will be able to login/logout, create and interact with other blog posts, update their login credentials and also delete their profile.

## Prerequisites

- node.js (https://nodejs.dev/en/learn/how-to-install-nodejs/)
- nodemon (https://www.npmjs.com/package/nodemon)
- VS Code (https://code.visualstudio.com/docs/setup/setup-overview)
- Postman (https://learning.postman.com/docs/getting-started/installation-and-updates/)

## Getting Started

1. Go to your computers terminal and create a new directory to store this project in (ex. `mkdir Blog_API`) and cd into that directory.

2. Towards the top of this page (https://github.com/jmsmith23/Unit-2-Project) click on the green button that says "<> Code".

3. Make sure 'SSH' is highlighted and copy the code to your clipboard,

4. Return to your terminal and under the directory you created type `git clone` and then paste the contents of the clipboard after it.

5. Once the project is cloned you need to cd into the directory called 'Unit-2-Project'

6. From 'Unit-2-Project' type `code .` to launch the project in VS Code.

7. When VS Code opens you will want to open the terminal at the bottom of the screen and type `npm i` to install all of the packages needed to run the app. The packages installed include mongoose, morgan, express, jsonwebtoken, bcrypt, dotenv as well as jest, supertest, mongodb-memory-server, and artillery (at version 1.7.9 intentionally) as dev dependencies.

8. Next, in your terminal, you will have to touch a file called `.env`. This file contains sensitive information which is why it is listed in the .gitignore file. The .gitignore file will keep this information from being made public in any way.

9. In the `.env` file, create an environment variable called `MONGO_URI=`. After the "=" paste in your personal URI string to connect to the database (ex. `MONGO_URI= mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin`).You will also want to make another variable called `SECRET=` which will contain your password for your authorization token. Use this site (https://emn178.github.io/online-tools/sha256.html) to create a hash of your password to keep it secret and paste it into your .env (ex `SECRET= 123456....`)

10. Lastly you will want to start the server by opening a second terminal and typing `npm run dev`.

## Using the Blog API

### Running Automated Tests

To run **unit tests**, simply type `npm run test` in the terminal. Once tests finish running you will see the passing tests in green, indicating they passed successfully. To run the **load test**, type `npm run load` in the terminal. The server must be operational for Artillery to work properly. Artillery will run the load test for 60 seconds, showing the status update every 10 seconds. The load test is successful when all tests pass with a status code of 200. The code for these tests can be reviewed in the **tests** folder for the unit tests, and in the **artillery.yml** file for the load test.

### User Routes

| **HTTP Method** | **End Point** |         **Action** |
| :-------------- | :-----------: | -----------------: |
| POST            |    /users     | creates a new user |
| POST            | /users/login  |       logs in user |
| POST            | /users/logout |      logs out user |
| PUT             |  /users/:id   |   update user info |
| DELETE          |  /users/:id   |       deletes user |

### Create A New User

1. To use the Blog API, launch Postman.

2. In the URL connect to port 3000 by typing `http://localhost:3000`,

3. To create a user, first add `/users` to the end of the URL (ex. `http://localhost:3000/users`).

4. In the box/drop-down menu to the left of the URL, select the `POST` option.

5. Under the URL select the "Body" option. On the next line down, be sure to select the "raw" box and in the drop down menu all the way to the right, set to `JSON`.

6. In the "Request" box directly below these options, create your user. To do so, first type a pair of curly brackets. Within the brackets, you will need to complete 3 fields: "name", "email", and "password". These must be written in JSON format, keys and values must be in quotes, keys must end with a colon and values must have a comma after them.

Ex:

            {
            "name": "User 1",
            "email": "user1@email.com",
            "password": "password"
            }

7. Once completed, press the `Send` button. Your created user info will be shown in the "Response" box. You will notice the password has been hashed for security purposes. You will also notice a few other attributes including a "posts" key with a value of an empty array, a unique user id which will be needed to perform other actions, a time stamp indicating the time of the users creation and another time stamp showing when the user was last updated, and finally a token at the bottom which will be used for authorization purposes.

_Example of a successfully created user_
![Imgur](https://i.imgur.com/sOWiTfg.png)

### Login User

1. To login the user add `/login` to the end of the current url (ex. `http://localhost:3000/users/login`)

2. In the body, following the previously discussed standards, type the correct email and password.

3. Leave method set to `POST` and press the `Send` button.

4. The user will now be signed in.

_Example of a successfully logged in user_
![Imgur](https://i.imgur.com/nzwtq2k.png)

### Authorize User

1. This **important step** is needed to perform any further action in this API so please don't skip!

2. In the Response body, copy the unique user token located at the very bottom.

3. Navigate to the line under the URL and select "Authorization".

4. In the drop down menu labeled "Type", select the "Bearer Token" option.

5. In the box to the right labeled "Token", paste the user token in the space provided.

6. The user is now authorized to update their profile, make posts, logout, delete their profile etc. as long as they remain logged in.

_Example of correctly authorizing user_
![Imgur](https://i.imgur.com/02Mvqk4.png)

### Update User Info

1. Copy the users id from the response body and paste it in the URL after `/users` (ex. `http://localhost:3000/users/_id`).

2. In the box to the left of the URL, select the `PUT` method.

3. Select "Body" and make sure "raw" is checked and "JSON" is selected.

4. In the body, type the updated user info in the correct format.

5. Press the `Send` button and the users updated info will be returned in the "Response" body.

_Example of correctly updating a user_
![Imgur](https://i.imgur.com/imhPP5R.png)

### Logout User

1. In the URL, be sure to have `/logout` following `users` (ex `http://localhost:3000/users/logout`),

2. From the drop-down menu select the `POST` method.

3. Press the `Send` button. In the "Response" body you will see the message "You are successfully logged out", confirming the user has indeed logged out.

_Example of successfully logged out a user_
![Imgur](https://i.imgur.com/RN5jp6P.png)

### Delete User

1. User must be logged in and authorized to delete themselves!!

2. In the URL, paste the users id after `users` (ex. `http://localhost:3000/users/_id`).

3. From the drop-down menu select the `DELETE` method.

4. Press the `Send` button. In the "Response" body you will see a 204 status and an empty box, indicating the user has been successfully deleted.

_Example of a successfully deleted user_
![Imgur](https://i.imgur.com/EWNSsPR.png)

### Post Routes

| **HTTP Method** |      **End Point**      |          **Action** |
| :-------------- | :---------------------: | ------------------: |
| POST            |         /posts          |      creates a post |
| GET             |       /posts/:id        | shows a single post |
| PUT             |       /posts/:id        |      updates a post |
| DELETE          |       /posts/:id        |      deletes a post |
| GET             |         /posts          |     shows all posts |
| PUT             |  /posts/:post_id/like   |         like a post |
| POST            | /posts/:post_id/comment |   comment on a post |

### Create A Post

1. To create a post, make sure you are logged in and authorized.

2. In the URL, add the end point `posts` (ex. `http://localhost:3000/posts`).

3. In the box/drop-down menu to the left of the URL, select the `POST` option.

4. Under the URL select the "Body" option. On the next line down, be sure to select the "raw" box and in the drop down menu all the way to the right, set to `JSON`.

5. Create your post by first typing a pair of curly brackets and within them you will need to complete 3 fields, "title", "category", and "post". These must be written in JSON format, keys and values must be in quotes, keys must end with a colon and values must have a comma after them.

Ex.

            {
                "title": "Post Title",
                "category": "Post Category",
                "post": "This is my first post"
            }

6. Once completed, press the `Send` button. Your created post will be shown in the "Response" box. In addition to the fields you completed, you will also see the id number of the user who created the post, a `likeUserIds` key with an empty array which will store "likes" for your specific post, a `comments` key with an empty array which will store comments for your specific post, a unique id attributed to your post, and a timestamp that shows when the post was created and updated.

_Example of successfully created post_
![Imgur](https://i.imgur.com/BKE3Ghr.png)

### Show An Individual Post

1. To show an individual post, simply paste the posts id into the URL after `posts` (ex. `http://localhost:3000/posts/:id`).

2. In the box/drop-down menu to the left of the URL, select the `GET` option.

3. Press the `Send` button. The specific post you requested by its id number will be shown in the "Response" box.

_Example of successfully recalled post_
![Imgur](https://i.imgur.com/wwSxtp5.png)

### Update A Post

1. To update an existing post, first paste the posts id into the URL after `posts` (ex. `http://localhost:3000/posts/:id`).

2. In the box/drop-down menu to the left of the URL, select the `PUT` option.

3. In the body, type your updated message in JSON format for the three fields required for the post ("title", "category", and "post").

4. Press the `Send` button. The updated post will be shown in the "Response" box.

_Example of successfully updated post_
![Imgur](https://i.imgur.com/L2AISFB.png)

### Delete A Post

1. To delete a post, paste the posts id into the URL after `posts` (ex. `http://localhost:3000/posts/:id`).

2. In the box/drop-down menu to the left of the URL, select the `DELETE` option.

3. Press the `Send` button. The specific post you requested by its id number will be deleted. The "Response" box will be empty and will show a status code of 204.

_Example of successfully deleted post_
![Imgur](https://i.imgur.com/oefgOWy.png)

### Show A List Of All Posts

1. To show a list of all created posts, use the end point `posts` in the URL (ex. `http://localhost:3000/posts`).

2. In the box/drop-down menu to the left of the URL, select the `GET` option.

3. Press the `Send` button. In the "Response" box you will see a list of all created posts.

_Example of successfully displaying all posts_
![Imgur](https://i.imgur.com/Zw6zMZE.png)

### Like A Post

1. To like a post, you will need to paste the posts id number in the URL followed by `/like` (ex. `http://localhost:3000/posts/:id/like`).

2. In the box/drop-down menu to the left of the URL, select the `PUT` option.

3. Press the `Send` button. In the "Response" box you will see the post you liked with your user id number listed in the array of `likeUserIds`.

_Example of successfully liked post_
![Imgur](https://i.imgur.com/beYl2xF.png)

### Comment On A Post

1. To leave a comment on a post, you will need to paste the posts id number in the URL followed by `/comment` (ex. `http://localhost:3000/posts/:id/comment`).

2. In the box/drop-down menu to the left of the URL, select the `POST` option.

3. In the "Request" box, write your comment by first typing `"content": ` followed by the comment (in parenthesis) between curly brackets.

4. Press the `Send` button. In the "Response" box you will see the comment posted. It will include the user who wrote the comments id number, the comment itself, the comments id number and the time it was created.

_Example of a comment on a post_
![Imgur](https://i.imgur.com/QmMNlZa.png)

## ERD/Pseudocode

![Imgur](https://i.imgur.com/TN3SB4i.png)

## UI Wireframe / Concept

![Imgur](https://i.imgur.com/rBjeVhe.png)

![Imgur](https://i.imgur.com/Fz0YoET.png)

![Imgur](https://i.imgur.com/UvCEmSR.png)

![Imgur](https://i.imgur.com/H6y4EfS.png)
