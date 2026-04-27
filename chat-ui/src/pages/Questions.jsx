import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllQuestions } from '../apis/QuestionAnswerApis'
import '../assets/css/Questions.css'

function Questions() {
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('topic') || ''

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch questions (with topic filter)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions(topic)
        setQuestions(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [topic])

  return (
    <main className="questions-container questions-page">
      <section className="questions-card">

        {/* Title */}
        <h2 style={{ marginBottom: '15px' }}>
          {topic || 'All Questions'}
        </h2>

        {/* Loading */}
        {loading ? (
          <p>Loading...</p>
        ) : questions.length > 0 ? (

          <div className="questions-list">
            {questions.map((q, index) => (
              <Link
                key={q._id}
                to={`/question/code/${q._id}`}
                className="question-item"
              >
                <span className="question-number">{index + 1}.</span>
                <span className="question-text">{q.question}</span>
              </Link>
            ))}
          </div>

        ) : (
          <p>No questions found</p>
        )}

      </section>
    </main>
  )
}

export default Questions