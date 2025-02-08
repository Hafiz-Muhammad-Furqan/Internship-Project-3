import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  loading: false,
  error: null,
  filters: {
    category: 'general',
    searchQuery: '',
  },
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setArticles, setLoading, setError, setFilters } = newsSlice.actions
export default newsSlice.reducer