import { User } from '../lib/models/UserSchema';

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password, // Include password if provided
      img: userData.img,
      isAdmin: userData.isAdmin,
    });
    await user.save();

    res.json({
      message: 'User added successfully',
      user: user,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
