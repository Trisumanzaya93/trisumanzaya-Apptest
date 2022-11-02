import {
  createContact,
  deleteContact,
  getContact,
  updateContact,
} from '../../utils/api';
import {ACTION_STRING} from './actionString';

export const getContactAction = () => {
  return {
    type: ACTION_STRING.getContact,
    payload: getContact(),
  };
};

export const createContactAction = body => {
  return {
    type: ACTION_STRING.createContact,
    payload: createContact(body),
  };
};
export const deleteContactAction = id => {
  return {
    type: ACTION_STRING.deleteContact,
    payload: deleteContact(id),
  };
};

export const updateContactAction = (id, body) => {
  return {
    type: ACTION_STRING.updateContact,
    payload: updateContact(id, body),
  };
};
