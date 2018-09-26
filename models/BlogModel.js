
// inporting mongoose
const mongoose = require('mongoose')

// importing schema

const Users = mongoose.Schema;
let users = new Users(
    {
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        createdDate: {
            type:Date,
            default: Date.mow
        }
    }
)


//'users' is collections name i.e table name
mongoose.model('users', users)