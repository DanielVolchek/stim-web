let URL: string;

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  URL = "https://www.example.com";
} else {
  URL = `http://localhost:${PORT}`;
}

export default URL;
