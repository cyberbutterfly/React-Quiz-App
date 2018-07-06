import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading-components';
import Quiz from '../components/Quiz';
import Modal from '../components/Modal';
import Results from '../components/Results';
import { fetchQuizData } from '../actions/index';

class QuizApp extends Component {
  state = {
    questions: [],
    userAnswers: [],
    step: 1,
    score: 0,
    modal: {
      state: 'hide',
      praise: '',
      points: ''
    }
  };

  componentDidMount() {
    this.props.fetchQuizData(this.props.amount, this.props.difficulty, this.props.type);
  }

  static alertOptions = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  };

  static propTypes = {
    amount: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fetchQuizData: PropTypes.func.isRequired,
    quizData: PropTypes.array
  };

  static getInitialState(quizData) {
    return {
      questions: quizData,
      userAnswers: quizData.map((question) => {
        return {
          question: question.question,
          isSelectedCorrectAnswer: 0
        }
      })
    };
  }

  static getDerivedStateFromProps({ quizData }) {
    return quizData && QuizApp.getInitialState(quizData);
  }

  handleAnswerClick = (answer) => (e) => {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].correct_answer === answer;
    const currentStep = step - 1;
    var isSelectedCorrectAnswer = userAnswers[currentStep].isSelectedCorrectAnswer;

    if (isCorrect && e.target.nodeName === 'LI') {
      e.target.parentNode.style.pointerEvents = 'none';
      e.target.classList.add('right');

      isSelectedCorrectAnswer += 1;
      userAnswers[currentStep].isSelectedCorrectAnswer = isSelectedCorrectAnswer;

      this.setState({
        userAnswers: userAnswers
      });
    }

    else if (e.target.nodeName === 'LI') {
      e.target.style.pointerEvents = 'none';
      e.target.classList.add('wrong');
    }

    setTimeout(() => this.showModal(isSelectedCorrectAnswer), 500);
    setTimeout(this.nextStep, 1750);
  };

  handleEnterPress = (answer) => (e) => {
    if (e.keyCode === 13) {
      this.handleAnswerClick(answer)(e);
    }
  };

  showModal = (isSelectedCorrectAnswer) => {
    let praise;
    let points;

    switch (isSelectedCorrectAnswer) {
      case 0: {
        praise = 'Wrong!';
        points = '+0';
        break;
      }
      case 1: {
        praise = 'Correct!';
        points = '+1';
        break;
      }

      default: {
        praise = 'Correct!';
        points = '+1';
      }
    }

    this.setState({
      modal: {
        state: 'show',
        praise,
        points
      }
    });
  };

  nextStep = () => {
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const isSelectedCorrectAnswer = userAnswers[currentStep].isSelectedCorrectAnswer;

    this.setState({
      step: step + 1,
      score: this.updateScore(isSelectedCorrectAnswer, score),
      questions: restOfQuestions,
      modal: {
        state: 'hide'
      }
    });
  };

  restartQuiz = () => {
    this.setState({
      step: 1,
      score: 0,
      ...QuizApp.getInitialState(this.props.quizData)
    });
  };

  updateScore(isSelectedCorrectAnswer, score) {
    switch (isSelectedCorrectAnswer) {
      case 0: return score + 0;
      case 1: return score + 1;
      default: return score + 1;
    }
  }

  render() {
    if(!this.props.quizData)
      return (
        <div className='loading-cp'>
          <Loading type='spinning_circles' width={100} height={100} fill='#000000' />
        </div>
      );

    if (this.props.quizData.length === 0)
      return (
        <div className='empty-quiz'>
          <h2>There are empty quizzes. Please try again!</h2>
        </div>
      );

    const { amount } = this.props;
    const { questions, step, userAnswers, score, modal } = this.state;

    if (step >= amount + 1) {
      return (
        <Results
          score={score}
          restartQuiz={this.restartQuiz}
          userAnswers={userAnswers}
        />
      );
    } else return (
      <Fragment>
        <Quiz
          step={step}
          questions={questions}
          amount={this.props.amount}
          score={score}
          handleAnswerClick={this.handleAnswerClick}
          handleEnterPress={this.handleEnterPress}
        />
        { modal.state === 'show' && <Modal modal={modal} /> }
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchQuizData }, dispatch);
}

function mapStateToProps({ quizData }) {
  return { quizData };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizApp);
