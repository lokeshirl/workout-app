import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// sign token
const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '3d' });
  return token;
};

// signup user
const handleUserSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const payloadForSigningToken = {
      id: user._id,
      email: user.email,
    };

    // create token for user after signup
    const token = createToken(payloadForSigningToken);

    res.status(201).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const payloadForSigningToken = {
      id: user._id,
      email: user.email,
    };

    // create token for user after login
    const token = createToken(payloadForSigningToken);
    res.status(200).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { handleUserLogin, handleUserSignup };
