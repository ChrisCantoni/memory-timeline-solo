import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addPost(action) {
    try {
      yield axios.post('/api/post', action.payload);
      yield put({type: 'FETCH_POSTS'})
    } catch (error) {
      console.log('Error adding post', error)
      alert('Something went wrong!');
    }
  }

function* fetchPosts() {
    try {
        const response = yield axios.get('/api/post');
        const action = { type: 'SET_POSTS', payload: response.data}
        yield put(action);
    } catch (error) {
        console.log('Error with fetch', error)
        alert('Something went wrong');
    }
}

function* postSaga() {
    yield takeLatest('FETCH_POSTS', fetchPosts);
    yield takeLatest('ADD_POST', addPost);
}

export default postSaga;
