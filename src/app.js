global.DEV_MODE= process.env.NODE_ENV==='development';

const path = require('path');
global.ROOT_PATH = path.resolve(__dirname);

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
const app = express();
const config = require('config');
const logger = require('./lib/utils/logger')


app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


switch(process.env.MODE){

    case "ui":
        initUIServer();
        break;
    case "stats":
        initStatsServer()
        break;
    default:
        break;
}


function initUIServer(){
    logger.info("Initiated UI server");
    app.use(session({
        name: config.get("session.name"),
        secret: config.get("session.secret"),
        saveUninitialized: true,
        resave: true
    }));


    app.use('/project',  require('./routes/project.js'));
    app.use('/session',  require('./routes/session.js'));
    app.use('/user',  require('./routes/user.js'));
    app.use(express.static(__dirname + '/client/public'))

    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
    })

    app.listen( config.get("ui.port"));

    const RedisMongoSyncJob = require('./jobs/redisMongoSync');
    RedisMongoSyncJob.exec();
}

function initStatsServer(){
    logger.info("Initiated stats server");

    app.use('/',  require('./routes/appStat'));
    app.listen( config.get("stat.port"));
}
