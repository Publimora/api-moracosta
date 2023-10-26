import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    let { username, email, password, roles } = req.body;

    if (!roles || roles.length === 0) {
      roles = ["moderator"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // saving the new user
    const savedUser = await user.save();

    const resuser = await User.findById(savedUser._id).populate("roles");

    res.json({
      _id: resuser._id,
      username: resuser.username,
      email: resuser.email,
      roles: resuser.roles,
      createdAt: resuser.createdAt,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAuthUser = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles");

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt,
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  return res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json(user);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    _id: user._id,
    message: "User was deleted successfully!",
  });
};
