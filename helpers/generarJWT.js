
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    
    return new Promise ((resolve, reject ) => {
        
        const payload = { uid };

        jwt.sign(payload, process.env.PRIVATEKEY,{
            expiresIn:'4h'
        }, (err, token) => {

            if (err) {
                console.log (err);
                reject ('Error al generar token');
            } else {
                resolve (token);
            }
        });
    });
}

module.exports = {
    generarJWT
}