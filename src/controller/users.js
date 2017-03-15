import { Router } from 'express';

export default ({ config, db }) => {
    let api = Router();

    // CRUD - Create Read Update Delete

    // '/v1/users/add' - Create
    api.post('/add', (req, res) => {
        try {
            let IdUtente = req.body.IdUtente;
            let NomeUtente = req.body.NomeUtente;
            let Password = req.body.Password;
            let Livello = req.body.Livello;
            let Note = req.body.Note;
            var sql = "INSERT INTO Utenti (IdUtente,NomeUtente,Password,Livello,Note) VALUES ";
            sql += "(" + IdUtente + ", '" + NomeUtente + "', '" + Password + "', '" + Livello + "','" + Note + "')";
            db.query(sql, (err, record) => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({ message: 'User saved succesfully' });
            });

        } catch (ex) {
            res.json({ message: ex });
        }
    });

    // '/v1/users' - Read
    api.get('/', (req, res) => {
        db.query("SELECT * FROM Utenti", (err, recordset) => {
            if (err) {
                res.send(err);
            }
            res.json(recordset);
        });
    });

    // '/v1/users/:id' - Read 1
    api.get('/:id', (req, res) => {
        let id = req.params.id;
        let sql = `SELECT * FROM Utenti WHERE IdUtente = ${id}`;
        db.query(sql, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

    // '/v1/users/:id' - Update
    api.put('/:id', (req, res) => {
        let id = req.params.id;
        var sql = `SELECT * FROM Utenti WHERE IdUtente = ${id}`;
        db.query(sql, (err, user) => {
            if (err) {
                res.send(err);
            }
            user.NomeUtente = req.body.NomeUtente;
            user.Password = req.body.Password;
            user.Livello = req.body.Livello;
            user.Note = req.body.Note;

            sql = "UPDATE [Utenti] SET ";
            if (user.NomeUtente) {
                sql += `NomeUtente='${user.NomeUtente}',`;
            }
            if (user.Password) {
                sql += ` Password='${user.Password}',`;
            }
            if (user.Livello) {
                sql += ` Livello='${user.Livello}',`;
            }
            if (user.Note) {
                sql += ` Note='${user.Note}',`;
            }
            sql = sql.slice(0, -1); //remove last comma
            sql += ` WHERE IdUtente=${id}`;
            db.query(sql, (err) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "User info updated" });
            });
        });
    });

    api.delete('/:id', (req, res) => {
        try {
            let id = req.params.id;
            var sql = `SELECT * FROM Utenti WHERE IdUtente = ${id}`;
            db.query(sql, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                sql = `DELETE FROM [Utenti] WHERE IdUtente=${id}`;
                db.query(sql, (err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.json({ message: "User Succesfully Removed!" });
                });
            });
        } catch (ex) {
            console.log("User Not FOUND!!!");
            res.json(ex);
        }
    });
    return api;
}