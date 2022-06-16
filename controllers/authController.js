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
      role: (isAdmin && "admin") || (isMerchant && "merchant"),
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

    const accessToken = jwt.sign({ id: user._id }, "key0987654321", {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "key0987654321");
    req.user = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, "key0987654321", (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { register, login, refreshToken, verifyToken };
