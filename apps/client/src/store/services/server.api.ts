import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (build) => ({
    getMessages: build.query<string[], void>({
      query: () => ({ url: 'messages' }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState },
      ) {
        const socket = io('http://localhost:3000/messages', {
          transports: ['websocket'],
        });
        try {
          await cacheDataLoaded;

          socket.on('message', (data) => {
            console.log(`data: ${data}`);
            updateCachedData((draft) => {
              draft.push(data);
            });
          });
        } catch (e) {}

        await cacheEntryRemoved;

        socket.off('message');
        socket.close();
      },
    }),
    sendMessage: build.mutation<unknown, string>({
      query(data) {
        return data;
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = serverApi;
