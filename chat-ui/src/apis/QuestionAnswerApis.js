import { questionInstance } from "../config/axios/api"

/* CREATE QUESTION (Admin) */
export const createQuestion = async (payload) => {
  try {
    const res = await questionInstance.post('/', payload)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create question' }
  }
}
/* GET ALL Topic */
export const getAllTopics = async () => {
  try {
    const res =  await questionInstance.get('/topics')
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch questions' }
  }
}
/* GET ALL QUESTIONS */
export const getAllQuestions = async (topic = '') => {
  try {
    const url = topic ? `?topic=${encodeURIComponent(topic)}` : ''
    const res = await questionInstance.get(`/${url}`)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch questions' }
  }
}

/* GET SINGLE QUESTION */
export const getQuestionById = async (id) => {
  try {
    const res = await questionInstance.get(`/${id}`)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch question' }
  }
}

/* UPDATE QUESTION (Admin) */
export const updateQuestion = async (id, payload) => {
  try {
    const res = await questionInstance.put(`/${id}`, payload)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update question' }
  }
}

/* DELETE QUESTION (Admin) */
export const deleteQuestion = async (id) => {
  try {
    const res = await questionInstance.delete(`/${id}`)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete question' }
  }
}