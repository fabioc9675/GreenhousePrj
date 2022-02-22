# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## folders:

app: contains react code
models: contains database models
public: contains html and css code coverted from reactjs
routes: contains routing between code

## init nodejs app

`npm init --yes`

## Modules

- `npm install express` framework for nodejs
- `npm install nodemon -D` to automatically restart server when the code changes
- `npm install morgan` allows to watch the request from clients
- `npm install mongoose` allows to connect withh database
- `npm install webpack -D` convert code from react to javascript, HTML and CSS
- `npm install webpack-cli -D` run with webpack
- `npm install react react-dom -D` install react components just development way
- `npm install babel-core babel-loader -D` translate jsx code use babel-loader@7
- `npm install babel-preset-react babel-preset-env -D` translate for React
- `npm install react axios`
- `npm install react bootstrap`
- `npm install react dotenv`
- `npm install concurrently` run concurrently server and frontend
- `npm install recharts` library to use charts and plots https://github.com/recharts/recharts
- `npm install react-plotly.js plotly.js` library to use plots https://plotly.com/javascript/react/
- `npm install socket.io`
- `npm install socket.io-client` Packages to add socket io functionallity
- `npm install http-proxy-middleware --save` to use proxy in the server
- `npm install cors`
- `npm install react-materialize` use materialize components
- `npm install moment` use date time formater
- `npm install --save materialize-social` Use of social icons
- `npm install react-icons --save` Icons https://react-icons.github.io/react-icons/
- `npm install react-router react-router-dom` to use router in Application

Use of MaterializeCSS through CDN www.materializecss.com copy the CSS part into index.html, alse add the icons provided for materialize

It is necessary to add JSON Web Token to guarant that the res api is just accessed by the app, and the use of login

Example with socketio https://github.com/JackZheng10/Thought-Wall.git

## Creation of visit counter

Use the api counter api,

- Create the visit counter api: `https://api.countapi.xyz/create?namespace=jfk-school&key=greenhouse&value=0`
- Get the visit counter api: `https://api.countapi.xyz/get/jfk-school/greenhouse`
- To update visit counter api: `https://api.countapi.xyz/update/jfk-school/greenhouse?amount=1`

## Local Database

### Run ReplicaSet

- `sudo systemctl stop mongod`
- `sudo nohup mongod --dbpath ~/data/db --replSet replocal`

### Initialization

- `sudo apt install mongodb`
- `sudo systemctl enable mongodb`
- `sudo systemctl start mongodb`
- `mongod` these commands initiate the daemon to execute mongodb

### Mongosse types

Visit the URL: https://mongoosejs.com/docs/schematypes.html

### MongoDB installation in Raspberry Pi

Follow the indications provided in the link: https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/

If you have problems with initialization of the DB into raspberry follow the URL: https://www.mongodb.com/community/forums/t/error-couldnt-connect-to-server-127-0-0-1-27017/705/3

Create a data/db in your home directory

1. cd /Users
2. cd to your home directory
3. mkdir data
4. cd data
5. mkdir db
6. mongod --dbpath ~/data/db press enter then just keep it running.

### Export and import data to mongoDB

- import: use `mongoimport --db mern-tasks --collection greenhouses --file /Users/fing140323/Desktop/huertaprueba.json`
- export: `mongoexport --db mern-tasks -c greenhouses --out /Users/fing140323/Desktop/huertaprueba.json`
- run: sudo mongod --dbpath ~/data/db --replSet replocal`don't need to modificate mongod.conf, just use after this`rs.initiate({\_id: "replocal", members: [{_id: 0, host: "127.0.0.1:27017"}] })`

### MongoDB Replica set configuration

Follow the indications on this URL: https://gist.github.com/davisford/bb37079900888c44d2bbcb2c52a5d6e8

- Add the `replication` section to the mongod.conf file:

```
$cat /usr/local/etc/mongod.conf
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  engine: mmapv1
  dbPath: /usr/local/var/repl-emagine-data
net:
  bindIp: 127.0.0.1
replication:
  replSetName: replocal
```

- Restart mongod (I use brew):

```sh
$ brew services restart mongodb
```

- Connect with local mongo shell and initiate the replica set:

This step is necessary to deploy the database in mongodb

```
$mongo
MongoDB shell version: 3.2.9
connecting to: test
> rs.initiate({_id: "replocal", members: [{_id: 0, host: "127.0.0.1:27017"}] })
{ "ok" : 1 }
```

- Now you'll be secondary, but then it will promote you to primary since you're the only one:

```
replocal:SECONDARY> rs.status
function () {
    return db._adminCommand("replSetGetStatus");
}

replocal:PRIMARY> rs.status()
{
	"set" : "replocal",
	"date" : ISODate("2017-01-06T16:16:27.323Z"),
	"myState" : 1,
	"term" : NumberLong(1),
	"heartbeatIntervalMillis" : NumberLong(2000),
	"members" : [
		{
			"_id" : 0,
			"name" : "127.0.0.1:27017",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 2022,
			"optime" : {
				"ts" : Timestamp(1483719372, 1),
				"t" : NumberLong(1)
			},
			"optimeDate" : ISODate("2017-01-06T16:16:12Z"),
			"infoMessage" : "could not find member to sync from",
			"electionTime" : Timestamp(1483719371, 2),
			"electionDate" : ISODate("2017-01-06T16:16:11Z"),
			"configVersion" : 1,
			"self" : true
		}
	],
	"ok" : 1
}

```

You can tail the oplog at

```
replocal:PRIMARY> use local
switched to db local
replocal:PRIMARY> db.getCollection('oplog.rs').find()
```

...lots of output here

==========================================================

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
