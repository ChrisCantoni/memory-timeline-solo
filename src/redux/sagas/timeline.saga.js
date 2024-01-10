import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addTimeline(action) {
    try {
      yield axios.post('/api/timeline', action.payload);
      yield put({type: 'FETCH_TIMELINES'})
    } catch (error) {
      console.log('Error adding timeline', error)
      alert('Something went wrong!');
    }
  }

function* fetchTimelines() {
    try {
        const response = yield axios.get('/api/timeline');
        console.log(response.data)
        const action = { type: 'SET_TIMELINES', payload: response.data}
        yield put(action);
    } catch (error) {
        console.log('Error with fetch', error)
        alert('Something went wrong');
    }
}

function* setVisible(action) {
    try {
        yield axios.put(`/api/timeline/${action.payload}`);
        yield put({type: 'FETCH_TIMELINES'});
    } catch (error) {
        console.log('Error updating timeline', error);
        alert('Something went wrong')
    }
}

function* deleteTimeline(action) {
    try {
        yield axios.delete(`/api/timeline/${action.payload}`);
        yield put({type: 'FETCH_TIMELINES'})
    } catch (error) {
        console.log('Error deleting timeline', error)
        alert('Something went wrong')
    }
}

function* postSaga() {
    yield takeLatest('FETCH_TIMELINES', fetchTimelines);
    yield takeLatest('ADD_TIMELINE', addTimeline);
    yield takeLatest('SET_VISIBLE', setVisible);
    yield takeLatest('DELETE_TIMELINE', deleteTimeline);
}

export default postSaga;
