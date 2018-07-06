import { FETCH_QUIZ } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_QUIZ:
      return action.payload.data.results;
  }

  return state;
}
