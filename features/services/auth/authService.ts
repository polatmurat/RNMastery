import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.0.2.2:5556/api/auth/'
    }),
    endpoints: (builder) => ({
        userLogin: builder.mutation<any, { email: string, password: string }>({
            query: (loginData) => ({
                url: 'login',
                method: 'POST',
                body: loginData,
            }),
        }),
        userRegister: builder.mutation<any, { name: string, email: string, password: string }>({
            query: (registerData) => ({
                url: 'register',
                method: 'POST',
                body: registerData,
            }),
        }),
    }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authService;
export default authService;

