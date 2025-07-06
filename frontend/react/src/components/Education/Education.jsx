import React, { useEffect, useState } from 'react';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch('/api/education')
      .then(res => res.json())
      .then(data => setEducation(data));
  }, []);

  return (
    <section className="education-section" id="education">
      <h2>Education</h2>
      <div className="education-grid">
        {education.map((edu) => (
          <div key={edu._id} className="education-card">
            <h3>{edu.courseName}</h3>
            <h4>{edu.collegeName}</h4>
            {edu.duration && <p className="edu-duration">{edu.duration}</p>}
            <div className="scores-grid">
              {edu.scores && edu.scores.map((score, idx) => (
                <div key={idx} className="score-item">
                  <span className="exam-title">{score.examTitle}:</span>
                  <span className="score-value">{score.score}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
