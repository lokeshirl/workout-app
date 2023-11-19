import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const userPayloadFromVerifiedToken = jwt.verify(token, process.env.SECRET);
    const { id, email } = userPayloadFromVerifiedToken;

    const user = await User.findById(id).select(id);
    // if(!user){
    //     throw new Error('Unathorized user');
    // }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: 'Request is not authorized' });
    // res.status(401).json({error})
  }
};

export default requireAuth;
