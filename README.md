# Cypress RealWorld Example

This project is based on the following projects:

* [React/Redux RealWorld Example - Frontend](https://github.com/gothinkster/react-redux-realworld-example-app)
* [Node/Express RealWorld Example - Backend](https://github.com/gothinkster/node-express-realworld-example-app.git)

The goal of this particular repository is to attach Cypress to the front-end project to demonstrate testing against a "real world" application.

## Front End

To get the frontend running locally:

- Go into the `react-redux-realworld-example-app` directory.
- `npm install` to install all of the required dependencies.
- `npm start` to start the local server.

The local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure the port in the scripts section of `package.json`. The general recommendation is to use [cross-env](https://github.com/kentcdodds/cross-env) to set the environment variable PORT for React scripts. This is a Windows-compatible way of setting environment variables.
 
Alternatively, you can add an `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive material. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, with this approach, you will want to remove any variables set via the script section of `package.json` because `dotenv` will never override variables if they are already set.

### Making Requests to the Backend API

There is a live API server running at https://conduit.productionready.io/api for the application to make requests against. You can view [the API spec here](https://github.com/GoThinkster/productionready/blob/master/api) which contains all routes and responses for the server.

You can also use the included backend from this repository. If you want to change the API URL to a local server, you would simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (example: `http://localhost:3000/api`).

### Functionality Overview

The example application is a social blogging site called "Conduit". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles

## Back End

To get the Node server running locally:

- Go into the `node-express-realworld-example-app` directory.
- `npm install` to install all of the required dependencies.
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`.
- `npm run dev` to start the local server.

### Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps by formatting the error like a normal mongoose `ValidationError`.
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format

### Application Structure

- `app.js` - The entry point to the application. This file defines the express server and connects it to MongoDB using mongoose. It also requires the routes and models being used in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for the API.
- `models/` - This folder contains the schema definitions for the Mongoose models.

### Error Handling

In `routes/api/index.js`, error-handling middleware is defined for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand](https://github.com/gothinkster/realworld/blob/master/API.md#errors-and-status-codes)

### Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. Two express middlewares are defined in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using the application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.
