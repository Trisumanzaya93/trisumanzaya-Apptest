import {ACTION_STRING} from '../actions/actionString';
import {ActionType} from 'redux-promise-middleware';

const initialState = {
  contactList: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const getContactReducer = (prevState = initialState, action) => {
  const {getContact} = ACTION_STRING;
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case getContact.concat('_', Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case getContact.concat('_', Fulfilled):
      const data = action.payload.data;
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        contactList: data.data,
      };
    case getContact.concat('_', Rejected):
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    default:
      return prevState;
  }
};

export default getContactReducer;
