import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/reducers/authReducer';
import authService from '../features/services/auth/authService';

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authService.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;