import { Message } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { socketFactory } from '../utils/socket-factory.util';
import { promiseEmit } from '../utils/promise-emit.util';

const getSocket = socketFactory('messages');

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (build) => ({
    getMessages: build.query<Message[], void>({
      query: () => ({ url: 'messages' }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState },
      ) {
        const socket = await getSocket();

        try {
          await cacheDataLoaded;

          socket.on('message', (data) => {
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
    sendMessage: build.mutation<Message, Message>({
      queryFn: async (data) => {
        const socket = await getSocket();

        return promiseEmit(socket)('message', data);
      },
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        // Update state of getMessages instead of querying it again for all messages.
        // const patchResult = dispatch(
        //   serverApi.util.updateQueryData('getMessages', undefined, (draft) => {
        //     draft.push(data);
        //   }),
        // );

        try {
          // This is the response from the server, now verify its the same as patched above.
          const result = await queryFulfilled;

          serverApi.util.updateQueryData('getMessages', undefined, (draft) => {
            const index = draft.findIndex(
              (message) => message.id === result.data.id,
            );

            if (index === -1) {
              throw new Error("It doesn't Work");
            }

            draft[index] = result.data;
          });
        } catch (e) {
          // If result fails, invalidate tag for getMessages
          // patchResult.undo();
          console.log(e);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = serverApi;
