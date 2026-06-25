import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 charecters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 charecters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Email must be at least 3 charecters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user"
  },
  socketId: {
    type: String,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);
export default User;
