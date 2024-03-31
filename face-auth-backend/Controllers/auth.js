const User = require("../Models/User");
const handleUserRegistration = async (req, res) => {
  try {
    console.log("Received request to post user details");
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      faceDescriptor: req.body.faceDescriptor,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleFaceAuth = async (req, res) => {
  try {
    const users = await User.find({}, "faceDescriptor");
    const faceDescriptors = users.map((user) => user.faceDescriptor);
    res.json(faceDescriptors);
  } catch (error) {
    console.error("Error fetching faceDescriptors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleUserRegistration, handleLogin, handleFaceAuth };
