const adminAccounts = {
  firstAccount: {
    userName: "Dummy Username",
    role: "Super Admin",
    email: "admin@test.com",
    password: "admin123",
  },
  secondAccount: {
    userName: "Ven Angel",
    role: "Admin",
    email: "vencarlostagaro@gmail.com",
    password: "09569674584",
  },
};

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;

    const userAccount = Object.values(adminAccounts).find(
      (account) => account.email.toLowerCase() === email.toLowerCase(),
    );

    if (!userAccount) {
      return res
        .status(401)
        .json({ message: "Account not found!", success: false });
    }

    if (userAccount.password === password) {
      res.status(200).json({
        message: "Login successful!",
        success: true,
        userName: userAccount.userName,
        role: userAccount.role,
        dummyToken: "jaSWh12AweHLfa@Aa1231afasf",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }
  },
};

module.exports = authController;
