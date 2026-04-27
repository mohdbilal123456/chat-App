import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllQuestions, deleteQuestion } from '../apis/QuestionAnswerApis'
import '../assets/css/QuestionsList.css'

function QuestionsList() {
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const data = await getAllQuestions()
      setQuestions(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return

    try {
      await deleteQuestion(id)
      setQuestions(prev => prev.filter(q => q._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  // ✅ Unique topics
  const topics = [...new Set(questions.map(q => q.topic))]

  // 🔍 Filter logic
  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase())

    const matchTopic = selectedTopic ? q.topic === selectedTopic : true

    return matchSearch && matchTopic
  })

  // 📄 Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // 🔄 Reset page on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedTopic])

  // ❌ Clear filters
  const handleClearFilters = () => {
    setSearch('')
    setSelectedTopic('')
    setCurrentPage(1)
  }

  return (
    <main className="list-container">

      {/* Header */}
      <div className="list-header">
        <h2>All Questions</h2>

        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="header-search"
        />

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="topic-filter"
        >
          <option value="">All Topics</option>
          {topics.map((topic, i) => (
            <option key={i} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        {/* ❌ Clear Filter Button */}
        <button
          className="clear-btn"
          onClick={handleClearFilters}
        >
          Clear
        </button>

        <button
          className="add-btn"
          onClick={() => navigate('/admin/add/questions')}
        >
          + Add Question
        </button>
      </div>

      {/* Cards */}
      {paginatedQuestions.length > 0 ? (
        paginatedQuestions.map((q) => (
          <div key={q._id} className="question-card">

            <div className="question-title">{q.question}</div>
            <div className="question-topic">Topic: {q.topic}</div>

            <div className="action-buttons">
              <button
                className="btn btn-edit"
                onClick={() => navigate(`/edit/${q._id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-view"
                onClick={() => navigate(`/admin/view/${q._id}`)}
              >
                View
              </button>

              <button
                className="btn btn-delete"
                onClick={() => handleDelete(q._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No questions found</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </main>
  )
}

export default QuestionsList