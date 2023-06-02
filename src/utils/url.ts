const GetBaseURL = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url

  if (process.env.NODE_ENV === "production")
    return process.env.PATH || "https://www.example.com";
  return `http://localhost:${process.env.PORT || 3000}`;
};

export default GetBaseURL;
