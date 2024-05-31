import { DocumentInfoResponse, PlainMessage } from '@vklink/grpc-api';

export const getFirstDocumentUrl = (
  docs?: PlainMessage<DocumentInfoResponse>[]
): string | undefined => {
  if (!docs || !docs.length) return;

  return docs[0].url;
};

export const getDocumentUrl = (doc?: PlainMessage<DocumentInfoResponse>): string | undefined => {
  if (!doc) return;

  return doc.url;
};
