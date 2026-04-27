import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuestion } from '../apis/QuestionAnswerApis'
import '../assets/css/AddQuestions.css'

function AddQuestions() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    topic: '',
    question: '',
    steps: [{ title: '', code: '' }],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)

  /* 🧠 Handle main input */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /* 🧠 Handle step input */
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...formData.steps]
    updatedSteps[index][field] = value

    setFormData({
      ...formData,
      steps: updatedSteps,
    })
  }

  /* ➕ Add Step */
  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: '', code: '' }],
    })
  }

  /* ❌ Remove Step */
  const removeStep = (index) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index)

    setFormData({
      ...formData,
      steps: updatedSteps,
    })
  }

  /* 📋 Copy Code */
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)

    setTimeout(() => setCopiedIndex(null), 1500)
  }

  /* 🚀 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await createQuestion(formData)
      alert('Question added successfully ✅')
      navigate('/admin/questions')
    } catch (err) {
      setError(err.message || 'Failed to add question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="addq-container">
      <section className="addq-card">
        <h2>Add Question & Answer</h2>

        <form onSubmit={handleSubmit} className="addq-form">

          {/* Topic */}
          <label>Topic</label>
            <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            >
            <option value="">Select Topic</option>
            <option value="React Js Codes">React Js</option>
            <option value="Express Js Codes">Express Js</option>
            <option value="Laravel">Laravel</option>
            </select>

          {/* Question */}
          <label>Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter question"
            required
          />

          {/* Steps */}
          <h3>Steps</h3>

          {formData.steps.map((step, index) => (
            <div key={index} className="step-box">

              {/* Step Header */}
              <div className="step-header">
                <strong>Step {index + 1}</strong>

                <button
                  type="button"
                  onClick={() => handleCopy(step.code, index)}
                  className="copy-btn"
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <label>Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) =>
                  handleStepChange(index, 'title', e.target.value)
                }
                placeholder="Step title"
                required
              />

              <label>Code</label>
              <textarea
                value={step.code}
                onChange={(e) =>
                  handleStepChange(index, 'code', e.target.value)
                }
                placeholder="Write code..."
                rows={4}
                required
              />

              {formData.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Add Step */}
          <button
            type="button"
            onClick={addStep}
            className="add-step-btn"
          >
            + Add Step
          </button>

          {/* Error */}
          {error && <p className="error-text">{error}</p>}

          {/* Submit */}
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Question'}
          </button>

        </form>
      </section>
    </main>
  )
}

export default AddQuestions