import { AnyAction } from '@reduxjs/toolkit';
import {
  all, call, CallEffect, put, PutEffect, takeEvery,
} from 'redux-saga/effects';
import { ContactType } from '../types/contacts';
import { fetchAPI } from '../utils/fetchAPI';
import { setAuthErrorData, setAuthResponseData } from './authSlice';
import {
  setContactInteractionError, setContacts, setContactsError, setNoResults,
} from './contactsSlice';

interface User {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  user: User
}

type ContactsResponse = ContactType[];

export function* login({ user }: AnyAction): Generator<
CallEffect | Promise<AuthResponse> | PutEffect,
void,
Response & AuthResponse
> {
  const response = yield call(fetchAPI, 'login', 'POST', user);
  const data = yield response.json();
  if (response.ok) {
    yield put(setAuthResponseData(data));
    localStorage.setItem('token', data.accessToken);
  } else {
    yield put(setAuthErrorData(data));
  }
}

function* getContacts(): Generator<
CallEffect | Promise<ContactsResponse> | PutEffect,
void,
Response & ContactsResponse
> {
  const response = yield call(fetchAPI, 'contacts', 'GET');
  const data = yield response.json();
  if (response.ok) {
    yield put(setContacts(data));
  } else {
    yield put(setContactsError(true));
  }
}

function* addContact({ contact }: AnyAction): Generator<CallEffect | PutEffect, void, Response> {
  const response = yield call(fetchAPI, 'contacts', 'POST', contact);
  if (response.ok) {
    yield call(getContacts);
  } else {
    yield put(setContactInteractionError(true));
  }
}

function* removeContact({ contactId }: AnyAction): Generator<
CallEffect | PutEffect, void, Response
> {
  const response = yield call(fetchAPI, `contacts/${contactId}`, 'DELETE');
  if (response.ok) {
    yield call(getContacts);
  } else {
    yield put(setContactInteractionError(true));
  }
}

function* editContact({ payload }: AnyAction): Generator<CallEffect | PutEffect, void, Response> {
  const { contact, contactId } = payload;
  const response = yield call(fetchAPI, `contacts/${contactId}`, 'PUT', contact);
  if (response.ok) {
    yield call(getContacts);
  } else {
    yield put(setContactInteractionError(true));
  }
}

function* findContact({ value }: AnyAction): Generator<
CallEffect | Promise<ContactsResponse> | PutEffect, void, Response & ContactsResponse
> {
  const response = yield call(fetchAPI, `contacts?q=${value}`, 'GET');
  const data = yield response.json();
  if (response.ok) {
    yield put(setContacts(data));
    yield put(setNoResults(!data.length));
  } else {
    yield put(setContactInteractionError(true));
  }
}

function* rootSaga() {
  yield all([
    takeEvery('LOGIN', login),
    takeEvery('GET_CONTACTS', getContacts),
    takeEvery('ADD_CONTACT', addContact),
    takeEvery('REMOVE_CONTACT', removeContact),
    takeEvery('EDIT_CONTACT', editContact),
    takeEvery('FIND_CONTACT', findContact),
  ]);
}

export default rootSaga;
