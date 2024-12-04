
const mongoose = require ('mongoose');

const dbConnection = async () =>{
    try {
            await mongoose.connect(process.env.MONGODB_CNN, {
                serverSelectionTimeoutMS: 5000,
                serverApi: { version: '1', strict: true, deprecationErrors: true },
            });

            console.log('Connected to MongoDB');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
   
}

module.exports = {
    dbConnection
}
