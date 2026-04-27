import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionById } from '../apis/QuestionAnswerApis'
import '../assets/css/QuestionDetails.css'

function QuestionDetails() {
  const { id } = useParams()

  const [questionData, setQuestionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState(null)

  // Fetch question by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestionById(id)
        setQuestionData(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  return (
    <main className="details-container">
      <div className="details-card">

        {loading ? (
          <p>Loading...</p>
        ) : questionData ? (
          <>
            {/* Question Title */}
            <h2>{questionData.question}</h2>

            {/* Steps */}
            {questionData.steps && questionData.steps.length > 0 ? (
              questionData.steps.map((step, index) => (
                <div key={index} className="step-card">

                  <div className="step-header">
                    <h3>{step.title}</h3>

                    <button
                      className="copy-icon"
                      onClick={() => handleCopy(step.code, index)}
                    >
                      {copiedIndex === index ? '✓' : '📋'}
                    </button>
                  </div>

                  <pre className="code-block">
                    <code>{step.code}</code>
                  </pre>

                </div>
              ))
            ) : (
              <p>No steps available</p>
            )}
          </>
        ) : (
          <p>Question not found</p>
        )}

      </div>
    </main>
  )
}

export default QuestionDetails