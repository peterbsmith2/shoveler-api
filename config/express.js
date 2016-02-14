//Load modules
var bodyParser  = require('body-parser');
var compression = require('compression');
var express     = require('express');
var morgan      = require('morgan');
var swagger     = require('swagger-tools').initializeMiddleware;
var swaggerDoc  = require('../swagger.json');

//Define the Express configuration method
module.exports = function() {

  // create express app instance
  var app = express();

  // Use NODE_ENV variable to activate proper middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  // use body-parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  swagger(swaggerDoc, function(middleware) {
    app.use(middleware.swaggerMetadata());

    // Load routing files
    require('../server/routes/jobs.server.routes')(app);
    require('../server/routes/auth.server.routes')(app);
  });

  //return the app
  return app;
};
