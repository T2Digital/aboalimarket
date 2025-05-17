const bcrypt = require('bcrypt');
bcrypt.hash('123456', 10, (err, hash) => {
    if (err) console.error('Error generating hash:', err);
    console.log('Hashed Password:', hash);
});