import { configureStore } from '@reduxjs/toolkit';
import selectReducer from './slicers/selectSlicer';
import errorReducer from './slicers/errorSlicer';
const store = configureStore({
    reducer: {
        select: selectReducer,
        error : errorReducer
    }
})

export default store;