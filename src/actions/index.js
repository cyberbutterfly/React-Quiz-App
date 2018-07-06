import axios from 'axios';

const ROOT_URL = 'https://opentdb.com/api.php?';

export const FETCH_QUIZ = 'FETCH_QUIZ';

export function fetchQuizData(amount, difficulty, type) {
  const url = `${ROOT_URL}&amount=${amount}&difficulty=${difficulty}&type=${type}`;
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_QUIZ,
    payload: request
  };
}
