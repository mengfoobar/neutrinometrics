const winston = require('winston');

let logger;


if(global.DEV_MODE){
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                colorize:true,
                timestamp:true
            }),
            new (winston.transports.File)({
                filename: require('path').join(global.ROOT_PATH, '..', 'logs', 'neutrino.json' ),
                colorize:true,
                timestamp:true,
                json:true,
                prettyPrint: true
            })
        ]
    });
}else{
    const loggerConfig = require('config').get("logger")
    require('winston-papertrail').Papertrail;

    const winstonPapertrail = new winston.transports.Papertrail({
        host: loggerConfig.get("host"),
        port: loggerConfig.get("port"),
        colorize: true
    })

    winstonPapertrail.on('error', function(err) {
        // silently ignore connection errors and failures
    });

    logger = new winston.Logger({
        transports: [winstonPapertrail]
    });

}

module.exports=logger

