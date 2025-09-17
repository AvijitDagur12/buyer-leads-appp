"use client";
import { useState } from "react";

export default function BuyerFormPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    console.log("📤 Sending lead data...", form); // Debug log
    const res = await fetch("http://127.0.0.1:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("📥 Response received:", res); // Debug log

    if (res.ok) {
      setMessage("✅ Lead submitted successfully!");
      setForm({ name: "", email: "", phone: "", interest: "" });
    } else {
      const errorData = await res.json();
      console.error("❌ Server error:", errorData);
      setMessage("❌ Error submitting lead");
    }
  } catch (error) {
    console.error("⚠️ Network or fetch error:", error); // Debug log
    setMessage("⚠️ Server not responding");
  }
};


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Buyer Lead Intake</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="interest" placeholder="Interested In" value={form.interest} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
