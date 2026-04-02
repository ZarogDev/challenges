import { prisma } from '../db/prisma';
import { validateBody } from './common.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
export async function validateRegister(req, res, next) {
    const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const { password, password_confirm } = req.body;
    if (password !== password_confirm) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    validateBody(registerSchema, req, res, next);
}
export async function validateLogin(req, res, next) {
    const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!existingUser) {
        return res.status(400).json({ error: 'User not found' });
    }
    const isValidPassword = await argon2.verify(existingUser.password, req.body.password);
    if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    validateBody(loginSchema, req, res, next);
}
export async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
