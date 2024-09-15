import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const usersSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Users = models.Users || mongoose.model("Users", usersSchema);
export default Users;
