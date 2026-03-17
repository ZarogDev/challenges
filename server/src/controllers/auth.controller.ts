import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export async function register(req: Request, res: Response) {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        birthdate: new Date(req.body.birthdate)
      }
    });

    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export async function login(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id, 10) },
      select: { id: true, username: true, email: true }
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}