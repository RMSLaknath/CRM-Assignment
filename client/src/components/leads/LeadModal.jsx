import { useState, useEffect } from "react";

export default function LeadModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
    dealValue: "",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        status: initialData.status || "New",
        dealValue: initialData.dealValue || "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      dealValue: Number(form.dealValue || 0),
    });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Lead</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="dealValue"
          value={form.dealValue}
          onChange={handleChange}
          placeholder="Value"
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};
