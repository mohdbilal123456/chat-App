import User from '../models/User.js'
import jwt from 'jsonwebtoken'

/* 🔑 Generate JWT */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/* 📝 REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password, avatar } = req.body

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with email or mobile',
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      avatar,
    })

    // Generate token
    const token = generateToken(user)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/*  LOGIN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Compare password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const getLoggedInUser = async (req, res) => {
  try {
    // req.user already comes from middleware
    res.status(200).json({
      message: 'User fetched successfully',
      user: req.user,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}