import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// hash password before it is saved to user model
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//compare passwords
userSchema.methods.matchPasswords = async function (
	enteredPw
) {
	return await bcrypt.compare(enteredPw, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
