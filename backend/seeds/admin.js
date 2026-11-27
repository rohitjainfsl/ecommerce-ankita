// Usage: node seeds/admin.js   (or: npm run seed:admin)
// Optional env: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD
import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Auth from "../models/auth.js";

const name = process.env.ADMIN_NAME || "Admin";
const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
const password = process.env.ADMIN_PASSWORD || "Admin@12345";

await mongoose.connect(process.env.MONGO_URI);
const hashed = await bcrypt.hash(password, 10);
await Auth.save(
  { email },
  { name, email, password: hashed, role: "admin" },
  { upsert: true, returnDocument: "after" },
);
console.log(`Admin seeded: ${email}`);
await mongoose.disconnect();
