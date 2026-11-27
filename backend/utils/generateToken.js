import jwt from "jsonwebtoken";

export const COOKIE_NAME = "token";
const MAX_AGE = 24 * 60 * 60 * 1000; // 1 day

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.ENVIRONMENT === "production",
  maxAge: MAX_AGE,
};
