import { combineReducers } from 'redux';
import QuizReducer from './reducer_quiz';

const rootReducer = combineReducers({
  quizData: QuizReducer
});

export default rootReducer;
