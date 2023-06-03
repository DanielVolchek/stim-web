export const getURL = () => {
  const PORT = process.env.PORT || 3000;
  if (typeof window !== "undefined") return "";
  if (process.env.NODE_ENV === "production") return "https://www.example.com";
  return `http://localhost:${PORT}`;
};
