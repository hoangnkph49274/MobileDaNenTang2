
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '.';

// Khởi tạo Slice
const userSlice = createSlice({
  name: 'user',
  initialState: { name: 'User', age: 20 },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
    },
  },
});

const { updateUser } = userSlice.actions;

// Kết hợp Reducer
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Cấu hình Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);


const MainComponent = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const changeUser = () => {
    dispatch(updateUser({ name: 'John Doe', age: 25 }));
  };

  return (
    <div>
      <h1>Tên: {user.name}</h1>
      <h2>Tuổi: {user.age}</h2>
      <button onClick={changeUser}>Cập nhật</button>
    </div>
  );
};

export default MainComponent;
