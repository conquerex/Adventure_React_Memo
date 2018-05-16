import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now}
});


// generates hash
Account.method.generateHash = function(password) {
    return bcryptjs.hashSync(password, 8);
}

// compares the password
Account.method.validateHash = function(password) {
    return bcryptjs.compareSync(password, this.password);
}

export default mongoose.model('account', Account);