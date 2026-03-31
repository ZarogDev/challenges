import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "../config/.env.test"
});

export function generateJWTToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!);
}