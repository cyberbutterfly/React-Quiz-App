import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';

const Quiz = ({ step, questions, amount, score, handleAnswerClick, handleEnterPress }) => {
  return (
    <div className="wrapper">
      <header>
        <div className="question-count">
          <h2>Question</h2>
          <div className="question-number">{step}</div>
          <div className="description">of <span>{amount}</span></div>
        </div>
        <h1>Trivia Challenge</h1>
        <div className="score-container">
          <h2>Score</h2>
          <div className="score">{score}</div>
          <div className="description">points</div>
        </div>
      </header>

      <div className="questions">
        <QuestionList
          questions={questions}
          handleAnswerClick={handleAnswerClick}
          handleEnterPress={handleEnterPress}
        />
      </div>
    </div>
  );
}

Quiz.propTypes = {
  step: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Quiz;
