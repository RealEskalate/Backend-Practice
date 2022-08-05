# Starter Project - Backend - G33 - A2SV Blog and Shout Outs

- Overview and description of what the project is going to be
- Workflow as a backend team member and
- Source of any additional information you might need

## Overview

A2Sv has a famous telegram channel called A2SV celebrations where we celebrate community members on their special days and their great achievements. However, all that showering of blessings and best wishes plus those great achievements get buried in the background as new members join the community and legends become forgotten, teaching stories become shadowed.

In this project you'll be required to develop a blog application where people will be able to write their blog articles, comment on articles as well as clap and celebrate people's articles. People should register as well as complete an authentication process if they want to apply write related features in their system.

## Features

- People should be allowed to register and sign in to their respective accounts
- People can write/update/delete articles of their own as well as see what other people have written
- People can write/update/delete comments of their own as well as see what other people have written on a particular article
- People can clap/UnClap for articles
- People should only be allowed to update articles/comments when it's their own

## Workflow

### Before you begin, read the following rules

- **Unit Testing is mandatory at every feature you add or modify**
- **Documentation is mandatory at every phase**
- **Set a PR and assign a reviewer always for the changes you want to push to master**

### Phase-1 - Basic CRUD Stage

- No Authorization implementation
- No Authentication implementation
- No interlinking between models. Set their values statically for now

1. Implement CRUD for Users
2. Implement CRUD for Articles
3. Implement CRUD for Comments
4. Implement CRUD for Claps

### Phase-2 - Interlink between models

1. Interlink Articles with Users
2. Interlink Comments with Articles
3. Interlink Claps with Articles and Comments

### Phase-3 - Add Authorization and Authentication

1. Add security measures for Users
2. Add security measures for Articles
3. Add security measures for Comments
4. Add security measures for Claps

### Phase-4 - Add File Management

1. Allow users to upload their profile pictures (Use Cloudinary service)
2. Allow users to upload a photo for their Articles (Use Cloudinary service)

## Architecture

We will use MVC Architecture. i.e we will have models, routes and controllers.

- server.ts file is used to create our express app and create mongodb connection through mongoose package.
- under the routes file we will set up our express routers for each model
- under controllers we will use models and do CRUD operations and this operations are going to be called by routes
- routes are called by app.ts based on paths
- look at the scripts under package.json file on how to run the project(you just need to use 'npm run dev')

## Sample Task Divisions

### User

POST → Signin User

POST -> signup User

GET → Get user by Id

GET → Get All user

PATCH → Update user by Id

DEL → Delete user by Id

### Article

POST → Add article

GET → Get article by Id

GET → Get All article

PATCH → Update article by Id

DEL → Delete article by Id

### Comment

POST → Add comment

GET → Get comment by Id

GET → Get All comments

GET → Get specific comment

PATCH → Update comment by Id

DEL → Delete comment by Id

### Future Works

- Add xss and helmet middleware for security on headers
- Add newsletter options
- Cron Scheduled emails going out to all users on saturday with contest link
- Add a search feature for articles for any user and search users for admins
- Emailing service for sending emails to users
- Add sentry for error logging and performance metrics
- Use a message broker and queue (rabbit-mq) for sending emails to users for decoupling
- Automated birthday reminders and other holidays, celebration notifications
