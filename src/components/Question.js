import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({ question, answers, handleAnswerClick, handleEnterPress }) => {
  return (
    <li className="question">
      <h2 className="question-title" tabIndex="0" dangerouslySetInnerHTML={{__html: question}} />
      <ul className="question-answers" tabIndex="-1">
        {answers.map((answer, index) => {
          return (
            <Answer
              key={JSON.stringify(answer)}
              answer={answer}
              handleAnswerClick={handleAnswerClick(answer)}
              handleEnterPress={handleEnterPress(answer)}
            />
          );
        })}
      </ul>
    </li>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Question;
