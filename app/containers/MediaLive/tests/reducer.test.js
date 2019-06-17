import { fromJS } from 'immutable';
import mediaLiveReducer from '../reducer';

describe('mediaLiveReducer', () => {
  it('returns the initial state', () => {
    expect(mediaLiveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
