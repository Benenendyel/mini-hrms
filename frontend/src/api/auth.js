const auth = {
  loginAdmin: async (email, password) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      return res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },
};

export default auth;
