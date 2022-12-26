import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '@/store/stores/storeApi';
import { userReduce } from "@/store/stores/storeUser";

export const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    user: userReduce,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware),
});


export type RootState=ReturnType<typeof store.getState>
