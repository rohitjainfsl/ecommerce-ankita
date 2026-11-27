import bcrypt from "bcrypt";
import Auth from "../models/auth.js";
import {
  generateToken,
  cookieOptions,
  COOKIE_NAME,
} from "../utils/generateToken.js";

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });

    const existing = await Auth.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    // role is never taken from the request: public registration = "user"
    const user = await Auth.create({ name, email, password: hashed });

    res.cookie(COOKIE_NAME, generateToken(user), cookieOptions);
    return res
      .status(201)
      .json({ message: "Registered", user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await Auth.findOne({ email: String(email).toLowerCase() });
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    res.cookie(COOKIE_NAME, generateToken(user), cookieOptions);
    return res.json({ message: "Logged in", user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export function logout(req, res) {
  const { maxAge, ...opts } = cookieOptions;
  res.clearCookie(COOKIE_NAME, opts);
  return res.json({ message: "Logged out" });
}

export async function me(req, res) {
  try {
    const user = await Auth.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
