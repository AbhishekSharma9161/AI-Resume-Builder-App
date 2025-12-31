import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

// Validation schemas
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// Create a new user
export const createUser: RequestHandler = async (req, res) => {
  try {
    const data = CreateUserSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get user by email
export const getUserByEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        resumes: {
          orderBy: { updatedAt: "desc" },
          take: 5, // Get latest 5 resumes
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      resumes: user.resumes.map((resume) => ({
        id: resume.id,
        title: resume.title,
        updatedAt: resume.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Get user by ID
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        resumes: {
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      resumes: user.resumes.map((resume) => ({
        id: resume.id,
        title: resume.title,
        updatedAt: resume.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
