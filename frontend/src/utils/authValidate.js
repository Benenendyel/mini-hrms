const validate = {
  email: (email) => {
    if (!email) return "Email is required";
    if (!email.includes("@")) return "Invalid email";

    const [local, domain] = email.split("@");
    if (local.length <= 3) return "Invalid email";
    if (!domain.includes(".com")) return "Invalid email";

    return null;
  },

  password: (password) => {
    if (!password) return "Password is required";

    return null;
  },
};

export default validate;
