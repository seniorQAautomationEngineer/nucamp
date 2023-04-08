import { createSlice } from '@reduxjs/toolkit';
import { COMMENTS } from '../../app/shared/COMMENTS';

const initialState = {
    commentsArray: COMMENTS
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
          ({...state, currentUser: action.payload});
      }
  }
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
    return state.comments.commentsArray.filter(
        (comment) => comment.campsiteId === parseInt(campsiteId)
    );
};