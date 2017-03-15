import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

// passport config

// api routes v1
app.use('/v1', routes);
app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app