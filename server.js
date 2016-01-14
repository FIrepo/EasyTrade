'use strict';

let express = require('express'),
    env = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env],
    uploadFile = require('./server/config/multer'),
    app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, uploadFile);

app.listen(config.port);
console.log("Server running on port: " + config.port);