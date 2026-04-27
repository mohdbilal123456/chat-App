import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import QuestionAnswer from '../models/QuestionAnswer.js'
dotenv.config() // load env

const seedUsers = async () => {
  try {
    await connectDB()

    console.log('DB Connected for seeding...')

    // Optional: remove if you don't want to delete all users
    await User.deleteMany()
    await QuestionAnswer.deleteMany()
    console.log('Old users removed')

    const usersData = [
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        mobile: '9999999999',
        password: 'password',
        role: 'admin',
        avatar: ''
      },
      {
        name: 'Normal User',
        email: 'user@gmail.com',
        mobile: '8888888888',
        password: 'password',
        role: 'user',
        avatar: ''
      }
    ]

    for (const userData of usersData) {
       await User.create(userData) // password hashed
    }

    console.log('Users seeded successfully:')

    process.exit(0)
  } catch (error) {
    console.error('Seeder Error:', error.message)
    process.exit(1)
  }
}

//  CALL FUNCTION
seedUsers()