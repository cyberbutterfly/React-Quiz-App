import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

const QuestionList = ({ questions, handleAnswerClick, handleEnterPress }) => {
  return (
    <ul className="question-list">
      {questions.map(question => {
        return (
          <Question
            key={question.question.toString()}
            question={question.question}
            answers={[question.correct_answer, ...question.incorrect_answers]}
            handleAnswerClick={handleAnswerClick}
            handleEnterPress={handleEnterPress}
          />
        );
      })}
    </ul>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default QuestionList;
