const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb://localhost/form_creator_db',
        { 
            useCreateIndex: true,
            useNewUrlParser: true, 
            useFindAndModify: false ,
            useUnifiedTopology: true 
        }
    )
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error:', err.message));
