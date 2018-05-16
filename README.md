#InfoTrack Development Project: SEO Analysis


This is a basic isomorphic app, built with react, node/express, ES6, webpack etc.

### install

* `npm i` - install dependencies

### run in dev

* `npm run build:watch:server` - runs babel to transpile the server from es6 to es5 (watch mode)
* `npm run build:watch:client` - runs webpack to build bundle (watch mode)
* `npm run start:dev`          - in parallel shells it calls `build:watch:client` `build:watch:server` and then runs the app in watch mode, using nodemon

### prod

* `npm run build:server` - runs babel to transpile the server from es6 to es5
* `npm run build:client` - runs webpack to build bundle
* `npm run build`        - builds both client and server
* `npm run start`        - in parallel shells it calls `build:prod` and then runs the app
* `npm start`            - same as `npm run start`
