import { ActorInfoResponse, PlainMessage } from '@vklink/grpc-api';

export * from './customer';
export * from './store';
export * from './ordering';
export * from './cms';

export type AuditableObject = {
  [key: string]: any;
  creator?: PlainMessage<ActorInfoResponse>;
  updater?: PlainMessage<ActorInfoResponse>;
};
