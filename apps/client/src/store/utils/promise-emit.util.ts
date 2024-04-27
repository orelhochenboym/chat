import { WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io-client';

export const promiseEmit = (socket: Socket) => {
  return <TData = any>(message: string, data: TData): Promise<any> => {
    return new Promise((resolve, reject) => {
      socket.emit(message, data, (response: WsResponse<TData>) => {
        if (!response) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  };
};
