import * as argon2 from "argon2";
import jwt from 'jsonwebtoken'

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
    const isPasswordValid = await argon2.verify(req.user.password, req.body.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const payload = { sub: req.user._id, role: req.user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      delete req.user.password
      return res.status(200).json({ 
        message: "Access Granted",
        token,
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role
        },
       });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// fonction pour vérifier le token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Need Token" });
    }
    const [type, tokenValue] = token.split(" ");
    if (type !== "Bearer") {
      throw new Error("Invalid token type");
    }
    req.payload = jwt.verify(tokenValue, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// fonction pour rajouter l'id de l'utilisateur dans la requête à l'aide du token
export const addUserId = (req, res, next) => {
  try {
    req.body.userId = req.payload.sub;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// fonction pour vérifier que l'utilisateur connecté est bien celui qui a créé le film
export const verifyUser = (req, res, next) => {
  try {
    console.log(req.payload)
    if (req.payload.sub !== req.ownerId && req.payload.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}