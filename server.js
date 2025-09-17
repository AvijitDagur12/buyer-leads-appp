// server.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ for parsing JSON

// Test route
app.get("/", (req, res) => {
  res.send("Buyer Lead Intake App Backend Running 🚀");
});

/**
 * User Registration
 */
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const newUser = await prisma.user.create({
      data: { username, password },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Add Lead
 */
app.post("/api/leads", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, budgetRange, locationPref, propertyType, userId } = req.body;

    if (!fullName || !email || !phoneNumber || !budgetRange || !locationPref || !propertyType || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newLead = await prisma.lead.create({
      data: {
        fullName,
        email,
        phoneNumber,
        budgetRange,
        locationPref,
        propertyType,
        userId,
      },
    });

    res.status(201).json({ message: "Lead saved successfully", lead: newLead });
  } catch (error) {
    console.error("❌ Error saving lead:", error);
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// Get all leads with user and history
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: { user: true, history: true },
    });
    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// Update lead status + add history
app.put("/api/leads/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Update lead status
    const lead = await prisma.lead.update({
      where: { id: Number(id) },
      data: { status },
    });

    // Add history entry
    await prisma.leadHistory.create({
      data: {
        leadId: lead.id,
        status,
        comment: comment || `Status changed to ${status}`,
      },
    });

    res.json({ message: "Lead status updated successfully", lead });
  } catch (error) {
    console.error("❌ Error updating lead status:", error);
    res.status(500).json({ error: "Failed to update lead status" });
  }
});

// Get lead history
app.get("/api/leads/:id/history", async (req, res) => {
  const leadId = parseInt(req.params.id);

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { history: true },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead.history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lead history" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
