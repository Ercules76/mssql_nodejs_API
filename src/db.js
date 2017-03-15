import mssql from 'mssql';
import config from './config';

export default callback => {
    let db = new mssql.Connection(config.dbConfig);
    
    // Connect the DB here is the better way? ....
    db.connect();
    let req = new mssql.Request(db);
    callback(req);
}