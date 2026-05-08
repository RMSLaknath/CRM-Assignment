import { useState } from "react";

export default function LeadForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    assignedTo: "",
    status: "New",
    dealValue: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      source: "",
      assignedTo: "",
      status: "New",
      dealValue: 0,
    });
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        name="name"
        placeholder="Lead Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        name="company"
        placeholder="Company"
        onChange={handleChange}
        value={form.company}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        value={form.phone}
      />
      <input
        name="source"
        placeholder="Lead Source"
        onChange={handleChange}
        value={form.source}
      />
      <input
        name="assignedTo"
        placeholder="Assigned To"
        onChange={handleChange}
        value={form.assignedTo}
      />

      <select name="status" onChange={handleChange} value={form.status}>
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Won</option>
        <option>Lost</option>
      </select>

      <input
        name="dealValue"
        type="number"
        placeholder="Deal Value"
        onChange={handleChange}
        value={form.dealValue}
      />

      <button type="submit">Create Lead</button>

      <style>{`
        .form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        input, select {
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        button {
          grid-column: span 2;
          padding: 10px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </form>
  );
}
