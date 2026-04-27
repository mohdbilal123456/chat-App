import QuestionAnswer from '../models/QuestionAnswer.js'

export const createQuestion = async (req, res) => {
  try {
    const { topic, question, steps } = req.body

    if (!topic || !question) {
      return res.status(400).json({ message: 'Topic and question are required' })
    }

    const newQuestion = await QuestionAnswer.create({
      topic,
      question,
      steps,
    })

    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllQuestions = async (req, res) => {
  try {
    const { topic } = req.query

    const filter = topic ? { topic } : {}

    const questions = await QuestionAnswer.find(filter).sort({ createdAt: -1 })

    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const getAllTopics = async (req, res) => {
  try {
    const topics = await QuestionAnswer.distinct('topic')

    const sortedTopics = topics.sort()

    res.status(200).json(sortedTopics)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionAnswer.findById(req.params.id)

    if (!question) {
      return res.status(404).json({ message: 'Question not found' })
    }

    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateQuestion = async (req, res) => {
  try {
    const updated = await QuestionAnswer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updated) {
      return res.status(404).json({ message: 'Question not found' })
    }

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await QuestionAnswer.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' })
    }

    res.status(200).json({ message: 'Question deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}