import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username || "", $options: "i" },
      email: { $regex: req.query.email || "", $options: "i" },
      role: { $regex: req.query.role || "", $options: "i" },
    });
    console.log(users.length);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserForAuth = async (req, res, next) => {
  console.log(req.body)
  const { email } = req.body
  console.log(email)
  try {
    const user = await User.findOne({ email: email });
    console.log(user)
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }
    res.user = user;
    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const register = async (req, res) => {
  console.log(req.body)
  const user = new User({
    ...req.body,
  });
  console.log(user)
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateById = async (req, res) => {
  const user = new User({
    _id: req.params.id,
    ...req.body,
  });
  try {
    await User.updateOne({ _id: req.params.id }, user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteById = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  }
}
