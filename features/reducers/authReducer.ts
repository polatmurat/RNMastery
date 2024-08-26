import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
    userToken: string | null;
    user: any | null;
}

const initialState: AuthState = {
    userToken: null,
    user: null,
};

export const verifyToken = async (keyName: string): Promise<string | null> => {
    const storage = await SecureStore.getItemAsync(keyName);
    if (storage) {
        const decodedToken: any = jwtDecode(storage);
        const expiresIn = new Date(decodedToken.exp * 1000);

        if (new Date() > expiresIn) {
            await SecureStore.deleteItemAsync(keyName);
            return null;
        } else {
            return storage; // if valid
        }
    } else {
        return null;
    }
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<string>) => {
            state.userToken = action.payload;
            state.user = jwtDecode(action.payload);
            SecureStore.setItem('user-token', action.payload);
        },
        logout: (state, action: PayloadAction<'user-token'>) => {
            SecureStore.deleteItemAsync(action.payload);
            if (action.payload === 'user-token') {
                state.userToken = null;
                state.user = null;
            }
        },
        initializeAuthState: (state, action: PayloadAction<{ userToken: string | null; user: any | null }>) => {
            state.userToken = action.payload.userToken;
            state.user = action.payload.user;
        },
    },
});

export const { initializeAuthState, setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;