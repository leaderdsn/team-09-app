import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '@/store/stores/storeApi';
import { userReduce } from '@/store/stores/storeUser';
import { mainReduce } from "@/store/stores/storeMain";

const configStore = {
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    user: userReduce,
    main:mainReduce

  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(storeApi.middleware),
};

export const store = configureStore(configStore);

export type RootState = ReturnType<typeof store.getState>;
