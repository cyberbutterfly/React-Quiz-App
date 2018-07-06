import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ userAnswers, score, restartQuiz }) => {
  return (
    <div className="results-container">
      <h2>You scored</h2>
      <div className="results-total"><strong>{score} / {userAnswers.length}</strong></div>
      <ul>
        {userAnswers.map((item) => {
          return <li key={item.question}>
            <div className="results-item" >
              {item.isSelectedCorrectAnswer ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}
              <h2 dangerouslySetInnerHTML={{__html: item.question}} />
            </div>
          </li>
        })}
      </ul>
      <a onClick={restartQuiz}>PLAY AGAIN?</a>
    </div>
  );
}

Results.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired
};

export default Results;
