import * as argon2 from "argon2";

// Hashing options
const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  hashLength: 50
};

// fonction pour hasher le mot de passe de l'utilisateur
export const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// fonction pour comparer le mot de passe de l'utilisateur avec le hash
export const verifyPassword = async (req, res) => {
  try {
    const user = res.user;
    const password = req.body.password;
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(200).json({ message: "Access Granted" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}