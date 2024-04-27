import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../store/services/server.api';

export const Root: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const { data: messages } = useGetMessagesQuery();
  const [trigger] = useSendMessageMutation();

  const handleClick = () => {
    trigger(message).unwrap();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="h-fit w-fit flex-col border border-green-900">
        {messages?.map((message) => {
          return <div key={message.id}>{message.message}</div>;
        })}
      </div>

      <div className="flex h-fit w-fit flex-col items-center justify-center gap-4">
        <input
          type="text"
          className="border focus:outline-none"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="w-1/2 border" onClick={handleClick}>
          Send
        </button>
      </div>
      <Outlet />
    </div>
  );
};
