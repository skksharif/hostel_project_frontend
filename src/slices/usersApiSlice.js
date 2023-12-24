import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    admitPatient: builder.mutation({
      query: (data)=>({
        url:`${USERS_URL}/admit`,
        method:'POST',
        body: data,
      }),
    }),
    patientData: builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/getpatientdata`,
        method:'POST',
        body: data,
      }),
    }),
    allPatients: builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/allpatients`,
        method:'GET'
      }),
    }),

    deletePatient: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete`,
        method: 'POST',
        body: data
      }),
    }),
    updatePatient : builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatepatient`,
        method: 'PUT',
        body: data
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAdmitPatientMutation,
  usePatientDataMutation,
  useAllPatientsMutation,
  useDeletePatientMutation,
  useUpdatePatientMutation
} = userApiSlice;