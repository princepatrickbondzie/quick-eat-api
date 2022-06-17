const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    city,
    locality,
    address,
    isAdmin,
    isMerchant,
    isRider,
  } = req.body;

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) next(new Error("Email already exist.."));
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) next(new Error("Phone number already exist.."));

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      city,
      locality,
      address,
      role:
        (isAdmin && "admin") ||
        (isMerchant && "merchant") ||
        (isRider && "rider"),
    });
    if (user) {
      res.status(201).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) next(new Error("Invalid Credentials"));

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) next(new Error("Invalid Credentials"));

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
  }
};

//Similar to sign up
const forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ id: user._id }, "key0987654321", {
      expiresIn: "30m",
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link`,
      html: `
              <h1>Please use the following link to reset your password</h1>
              <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
              <hr />
              <p>This email may contain sensitive information</p>
              
          `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        // console.log('RESET PASSWORD LINK ERROR', err);
        return res.status(400).json({
          error: "Database connection error on user password forgot request",
        });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            // console.log('SIGNUP EMAIL SENT', sent)
            return res.json({
              message: `Email has been sent to ${email}. Follow the instruction to reset your password.`,
            });
          })
          .catch((err) => {
            // console.log('SIGNUP EMAIL SENT ERROR', err)
            return res.json({
              message: err.message,
            });
          });
      }
    });
  });
};

//Similar to accountActivation
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  // 1.Check if token is available and verify with the backend
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err, decoded) => {
        if (err) {
          // console.log('jwt RESET PASSWORD error', err);
          res
            .status(401)
            .json({ error: "Expired link. Please reset password again" });
        }
        // 2. Find the user in the database from the token
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err) {
            return res.status(401).json({
              error: "Could not find the token in the database",
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          //use Lodash to deep clone the object instead of Object.assign
          user = Object.assign(user, updatedFields);
          user.save((err, results) => {
            if (err) {
              return res.status(401).json({
                error: "Fail to updated the user password",
              });
            }
            res.json({ message: "Your password has been updated!" });
          });
        });
      }
    );
  } else {
    return res.json({ message: "Reset token is not found" });
  }
};

module.exports = { register, login };
