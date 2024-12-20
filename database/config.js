
const mongoose = require ('mongoose');

const dbConnection = async () =>{
    try {
            await mongoose.connect(process.env.MONGODB_CNN, {
                serverSelectionTimeoutMS: 5000,
                serverApi: { version: '1', strict: true, deprecationErrors: true },
            });

            console.log('Conexión exitosa a MongoDB!!');
        
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
    }
   
}

module.exports = {
    dbConnection
}
