import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // email, valeur unique
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  }
},
{ timestamps: true});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  userObject.id = userObject._id;
  delete userObject._id;
  delete userObject.__v;
  return userObject;
}

//userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;
