const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://T2Digital:A%40atia2020@abualimarket.dmvxjtm.mongodb.net/abualimarket?retryWrites=true&w=majority', {})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

async function addUser() {
    try {
        const username = 'admin';
        const password = '123456';
        const user = new User({ username });
        await User.register(user, password);
        console.log('User added successfully');
    } catch (err) {
        console.error('Error adding user:', err);
    } finally {
        mongoose.connection.close();
    }
}

addUser();