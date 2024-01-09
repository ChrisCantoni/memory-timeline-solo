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

function* deletePost(action) {
    try {
        yield axios.delete(`/api/post/${action.payload}`);
        yield put({type: 'FETCH_POSTS'})
    } catch (error) {
        console.log('Error deleting post', error)
        alert('Something went wrong')
    }
}

function* editDetails(action) {
    try {
        console.log('editDetails action', action.payload.id)
        yield axios.put(`/api/post/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_DETAILS', payload: action.payload.id})
        console.log(action.payload)
    } catch (error) {
        console.log('Error sending edit', error)
        alert('Something went wrong');
    }
}

function* fetchDetails(action) {
    try {
        console.log('action is', action);
        const response = yield axios.get(`/api/post/details/${action.payload}`);
        console.log('response is', response.data);
        yield put({type: 'SET_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Could not fetch details', error)
        alert('Something went wrong')
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
    yield takeLatest('DELETE_POST', deletePost);
    yield takeLatest('FETCH_DETAILS', fetchDetails);
    yield takeLatest('EDIT_DETAILS', editDetails);
}

export default postSaga;
