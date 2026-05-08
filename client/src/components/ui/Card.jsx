export default function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ color: "#6b7280" }}>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
