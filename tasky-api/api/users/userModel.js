import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: [true, 'Username is required'] 
  },
  password: {
    type: String,
    required: [true, 'Password is required'], 
    validate: {
      validator: function(value) {
       
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(value);
      },
      message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
    },
  },
});

export default mongoose.model('User', UserSchema);
