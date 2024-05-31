import { Message } from '@bufbuild/protobuf';
import type { AnyMessage, MethodInfo, PartialMessage, ServiceType } from '@bufbuild/protobuf';

import { Code, ConnectError, ContextValues, UnaryResponse } from '@connectrpc/connect';
import { requestHeader as createRequestHeader } from '@connectrpc/connect/protocol-grpc-web';
import { GrpcWebTransportOptions, createGrpcWebTransport } from '@connectrpc/connect-web';

const HEADER_AUTHORIZATION_KEY = 'Authorization';

type CreateTransportOptions = GrpcWebTransportOptions & {
  getTokenAsync?: () => Promise<string | undefined | null>;
  refreshTokenAsync?: () => Promise<string | undefined | null>;
};

const createTransport = (options: CreateTransportOptions) => {
  const useBinaryFormat = options.useBinaryFormat ?? true;

  const transport = createGrpcWebTransport({
    ...options,
    useBinaryFormat,
  });

  const originalUnary = transport.unary;

  transport.unary = async <I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage>(
    service: ServiceType,
    method: MethodInfo<I, O>,
    signal: AbortSignal | undefined,
    timeoutMs: number | undefined,
    header: Headers,
    message: PartialMessage<I>,
    contextValues?: ContextValues
  ): Promise<UnaryResponse<I, O>> => {
    const requestHeader = createRequestHeader(useBinaryFormat, timeoutMs, header, false);

    try {
      const token = await options.getTokenAsync?.();
      if (token) {
        requestHeader.set(HEADER_AUTHORIZATION_KEY, `Bearer ${token}`);
      }

      return await originalUnary(
        service,
        method,
        signal,
        timeoutMs,
        requestHeader,
        message,
        contextValues
      );
    } catch (error) {
      const connectError = ConnectError.from(error);

      if (
        connectError.code === Code.Unauthenticated &&
        connectError.rawMessage.includes('401') &&
        typeof options.refreshTokenAsync === 'function'
      ) {
        const newToken = await options.refreshTokenAsync();

        if (newToken) {
          requestHeader.delete(HEADER_AUTHORIZATION_KEY);
          requestHeader.set(HEADER_AUTHORIZATION_KEY, `Bearer ${newToken}`);

          return await originalUnary(
            service,
            method,
            signal,
            timeoutMs,
            requestHeader,
            message,
            contextValues
          );
        } else {
          throw error;
        }
      }

      throw error;
    }
  };

  return transport;
};

export default createTransport;
