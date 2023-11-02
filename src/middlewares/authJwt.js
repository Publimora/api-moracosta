import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isAsesor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "asesor") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Asesor Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isAdminOrModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario es administrador o moderador
    if (roles.some((role) => ["admin", "moderator"].includes(role.name))) {
      next(); // Permitir acceso si es admin o moderador
    } else {
      return res
        .status(403)
        .json({ message: "Require Admin or Moderator Role!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

// authJwt.js
export const isAdminOrAsesor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario es administrador o asesor
    if (roles.some((role) => ["admin", "asesor"].includes(role.name))) {
      next(); // Permitir acceso si es admin o asesor
    } else {
      return res.status(403).json({ message: "Require Admin or Asesor Role!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

// authJwt.js
export const isAdminOrModeratorOrAsesor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verificar si el usuario es administrador, moderador o asesor
    if (
      roles.some((role) => ["admin", "moderator", "asesor"].includes(role.name))
    ) {
      next(); // Permitir acceso si es admin, moderador o asesor
    } else {
      return res
        .status(403)
        .json({ message: "Require Admin, Moderator, or Asesor Role!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
