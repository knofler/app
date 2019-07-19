import { fromJS } from 'immutable';
import pencilReducer from '../reducer';

describe('pencilReducer', () => {
  it('returns the initial state', () => {
    expect(pencilReducer(undefined, {})).toEqual(fromJS({}));
  });
});
