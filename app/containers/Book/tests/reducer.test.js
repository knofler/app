import { fromJS } from 'immutable';
import bookReducer from '../reducer';

describe('bookReducer', () => {
  it('returns the initial state', () => {
    expect(bookReducer(undefined, {})).toEqual(fromJS({}));
  });
});
