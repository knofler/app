import { fromJS } from 'immutable';
import channelReducer from '../reducer';

describe('channelReducer', () => {
  it('returns the initial state', () => {
    expect(channelReducer(undefined, {})).toEqual(fromJS({}));
  });
});
