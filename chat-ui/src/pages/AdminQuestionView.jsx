import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionById } from "../apis/QuestionAnswerApis";
import "../assets/css/QuestionDetails.css";

function AdminQuestionView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestionById(id);
        setQuestionData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  if (!questionData) return <p>Loading...</p>;

  return (
    <main className="details-container">
      <div className="details-card">
        
        <h2>{questionData.question}</h2>
        <p><b>Topic:</b> {questionData.topic}</p>

        {questionData.steps?.length === 0 && <p>No answer available</p>}

        {questionData.steps?.map((step, index) => (
          <div key={index} className="step-card">
            
            <div className="step-header">
              <h3>{step.title}</h3>

              <button
                className="copy-icon"
                onClick={() => handleCopy(step.code, index)}
              >
                {copiedIndex === index ? "✓" : "📋"}
              </button>
            </div>

            <pre className="code-block">
              <code>{step.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AdminQuestionView;