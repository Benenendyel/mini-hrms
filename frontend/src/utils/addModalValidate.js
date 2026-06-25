const addModalValidate = {
  fullName: (fullName) => {
    const trimmed = fullName?.trim() || "";

    if (!trimmed) return "Full name is required.";
    if (trimmed.length < 2) return "Full name is too short.";
    if (!/^[a-zA-ZÀ-ÿ' .-]+$/.test(trimmed))
      return "Full name contains invalid characters.";

    return "";
  },

  emailAddress: (email) => {
    if (!email) return "Email is required";
    if (!email.includes("@")) return "Invalid email.";

    const [local, domain] = email.split("@");
    if (local.length < 3) return "Invalid email.";
    if (!domain.includes(".com")) return "Invalid email.";

    return null;
  },

  contact: (contactNumber) => {
    const str = contactNumber.toString().replace(/[ -]/g, "");

    if (str.length > 20) return "Maximum number of character is 20.";

    for (let i = 0; i < str.length; i++) {
      if (isNaN(str[i])) {
        return "Only numbers are allowed.";
      }
    }
    return null;
  },

  department: (dept) => {
    if (!dept) return "Please choose a department.";

    return null;
  },

  jobPosition: (position) => {
    if (!position) return "Please choose a position.";

    return null;
  },
};

export default addModalValidate;
