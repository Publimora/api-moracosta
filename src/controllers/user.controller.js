import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    let { username, email, ciudad, password, roles } = req.body;

    if (!roles || roles.length === 0) {
      roles = ["asesor"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      ciudad,
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
      ciudad: resuser.ciudad,
      roles: resuser.roles,
      isActivo: resuser.isActivo,
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
    ciudad: user.ciudad,
    roles: user.roles,
    isActivo: user.isActivo,
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

export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cambiar la contraseña y guardar el usuario
    user.password = password;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateActivo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActivo: req.body.isActivo },
      { new: true }
    ).populate("roles");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
