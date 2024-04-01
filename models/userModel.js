import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    fullName: {
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
    avatar: {
      type: String,
      required: true,
      default:"https://res.cloudinary.com/formula-web-apps/image/upload/v1623766149/148-1486972_mystery-man-avatar-circle-clipart_kldmy3.jpg"
    },
     /* avatar: {
       public_id: {
         type: String,
         required: true,
         default:"https://res.cloudinary.com/formula-web-apps/image/upload/v1623766149/148-1486972_mystery-man-avatar-circle-clipart_kldmy3.jpg"
       },
       url: {
          type: String,
          required: true,
          default: "https://drive.google.com/file/d/18R8cm3ASWfTwgg994-hkyxZClVX8h0TG/view?usp=drivesdk",
      },
    },*/
    interests: {
      type: String,
      enum: [ "Backend", "Frontend", "Novice", "Product Designer", "UI/UX"],
      default: "Novice",
    },
    bio: {
      type: String,
      default: "Hello World"
    }
    github: {
      type: String,
      required: true,
      default: "https://github.com",
    },
    portfolio: {
      type: String,
      default: "https://github.com",
    },
    contact: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "community-admin"],
      default: "member",
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

//Generating password reset token with crypto
userSchema.methods.createPasswordResetToken = function(){
    let resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;
