import mongoose from 'mongoose'

const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
})

const questionAnswerSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    steps: {
      type: [stepSchema],
      default: [],
    },
  },
  { timestamps: true }
)

const QuestionAnswer = mongoose.model('QuestionAnswer', questionAnswerSchema)

export default QuestionAnswer