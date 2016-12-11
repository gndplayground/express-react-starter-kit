#Express React Starter Kit

The project right now is just for the showcase. There are still many  things missing like build process for the nodeJS server (Right now just run through node-babel), testing for client and server...
Regardless, adding many things might be overkill and hard for begin develop as soon as possible. You can customize it and choose the right plugin, build process your own.

## Demo
Demo online here http://express-react-starter-kit.gndplayground.com/
Use nginx proxy_pass backend to http://express-react-starter-kit.gndplayground.com/api
With nginx proxy_pass we can prevent cors and preflight request 

##Project overview
The project aims for a starter kit easy to start as possible.

###Client

Using react stacks and combine with react-hot-loader 3 to develop a react app easy.


- React
- React Router
- Redux
- Redux Saga
- Webpack
- React hot loader
- Babel

###Server

Using express and MongoDB for the backend. Built in JSON Web Token Authentication. Added hash password via bcrypt.

- Express
- Mongoose
- jsonwebtoken
- dotenv


In the folders

There are 3 files config env, you should copy them and remove 'example'. Each file is the config file for each environment

- .env (config file for nodejs app) 
- .env.client.dev (config file for webpack bundle in development)
- .env.client.build (config file for webpack bundle in final build process)


##How to start to develop.

I recommended using yarn rather than npm.

First install yarn as global
```javascript
npm install -g yarn
```

Then go to root project and  install all the packages.
```javascript
yarn install
```
Make sure you install babel-node as global.
```javascript
npm install -g babel-node
```

There are  3 file dot env
.env
.env.client.build
.env.client.dev

Make sure you read it and config right for your environment. Most likely you just need reserve localhost port 3030 and port 3031, start MongoDB localhost.

Then run
```javascript
yarn run client:dev
```

To start client app dev mode

```javascript
yarn run server:dev
```

Go to localhost:3030 to see client app. 

To start server dev mode

Open server dev location and got to route localhost 3031/dev/setup to add a user to MongoDB. Change username and password in file src/server/index.js

There are few more command for development

Debug express app. Using debugger built in nodejs

```javascript
yarn run server:debug
```

Lint js code style via eslint

```javascript
yarn run client:lint

yarn run server:lint
```

##How to start to deploy

For now, I didn't add build process convert all the code to ES 5 for a server. Express app have to run through node-babel. I will add it shortly

For client, run command

```javascript
yarn run client:build
```

Check .client/ folder. It hold the bundle files

You can run 

```javascript
yarn run client:analyze
```

To generate build stat to client-build-analyze.json file then upload to http://webpack.github.io/analyse/ to analyze the bundle

##Todos

- Added server build process. Convert ES6 to ES5.
- Support server side rendering.
- Add testing example.




