import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllTopics } from '../apis/QuestionAnswerApis'
import '../assets/css/home.css'

function Home() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getAllTopics()
        setTopics(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTopics()
  }, [])

  return (
    <main className="home-container home-page">
      <section className="cards-grid">

        {topics.length > 0 ? (
          topics.map((topic) => (
            <Link
              key={topic}
              to={`/questions?topic=${encodeURIComponent(topic)}`}
              className="card-link"
            >
              <article className="course-card">
                <p className="card-chip">Tutorial</p>
                <h2>{topic}</h2>
              </article>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Loading topics...</p>
        )}

      </section>
    </main>
  )
}

export default Home