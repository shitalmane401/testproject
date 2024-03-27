import React, { useState, useEffect } from 'react';
import questions from './questions.ts'; 
import './Quiz.css'; 

function Quiz() {
    const [answers, setAnswers] = useState({});
    const [scores, setScores] = useState([]);
    const [score, setScore] = useState(null);
    const [overallScore, setOverallScore] = useState(null);
  
    useEffect(() => {
      calculateOverallScore();
    }); // Recalculate overall score when scores change
  
    const handleAnswer = (questionId, answer) => {
      setAnswers({ ...answers, [questionId]: answer });
  
      const yesCount = Object.values({ ...answers, [questionId]: answer }).filter(ans => ans === 'yes').length;
      const totalCount = Object.keys({ ...answers, [questionId]: answer }).length;
      const calculatedScore = (yesCount / totalCount) * 100;
      setScore(calculatedScore.toFixed(2));
      setScores([...scores, calculatedScore]); // Add current score to scores array
    };
  
    const calculateOverallScore = () => {
      if (scores.length === 0) {
        setOverallScore(null); // Reset overall score if no runs yet
      } else {
        const totalScore = scores.reduce((acc, cur) => acc + cur, 0);
        const averageScore = totalScore / scores.length;
        setOverallScore(averageScore.toFixed(2)); // Calculate and set overall score
      }
    };
  
    return (
      <div className="container">
        <h1 className="my-4">Questionnaire</h1><hr/>
        {questions.map(question => (
          <div key={question.id} className="row mb-4">
            <div className="col-md-10 mx-auto">
              <div className="card custom-card">
                <div className="card-body">
                  <p className="card-text">{question.text}</p>
                  <div>
                    <button
                      type="button"
                      className={`btn btn-primary mr-2 ${answers[question.id] === 'yes' ? 'btn-success' : ''}`}
                      onClick={() => handleAnswer(question.id, 'yes')}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${answers[question.id] === 'no' ? 'btn-success' : ''}`}
                      onClick={() => handleAnswer(question.id, 'no')}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {score !== null && (
          <div className="mt-3">
            <h4>Your score for this run: {score}%</h4>
            {overallScore !== null && <h4>Overall score: {overallScore}%</h4>}
          </div>
        )}
      </div>
    );
  }
  
  export default Quiz;