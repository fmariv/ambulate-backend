const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const config = require('../db/config.js');
const { db: { user, host, database, password, port } } = config;

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
})


class UserService {

    post(request, response) {
        let userMail = request.body.mail;
        let userPass = request.body.pass;
        let userGen = request.body.gen;
        let userAge = request.body.age;
    
        bcrypt.hash(userPass, 10, (err, hash) => {
            if (err) {
                console.log(err)
                return
            }
            
            let layerQuery = `INSERT INTO gemott.pedestrian (mail, pass, gen, age)
            VALUES ('${userMail}', '${hash}', '${userGen}', ${userAge})`

            pool.query(layerQuery, (err, res) => {
            if (err) {
                console.error('Error registring the user. ', err.stack)
                return response.json({
                    mensaje: 'Ops! Sorry, there has been an error registring the user into the system'
                })
            }})
            console.log('POST USER OK')
        });
    }
}


module.exports = { UserService };