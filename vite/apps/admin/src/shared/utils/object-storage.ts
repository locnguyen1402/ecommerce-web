import { DocumentInfoResponse, PlainMessage } from '@vklink/grpc-api';

import { randomId } from './random-id';

const API_URL = import.meta.env.VITE_API_URL;

type DocumentUploaderOptions = {
  path?: string;
};

export const mapDocumentsToForm = (
  documents:
    | null
    | undefined
    | PlainMessage<DocumentInfoResponse>
    | PlainMessage<DocumentInfoResponse>[]
) => {
  if (!documents) return [];

  const baseDocuments = !Array.isArray(documents) ? [documents] : documents;
  const mapped = baseDocuments
    .filter((d) => d.url)
    .map((doc) => ({
      id: randomId(),
      name: doc.name || randomId(),
      url: doc.url,
    })) as UploadingFile[];

  return mapped;
};

export const tryToRevokeObjectUrls = <
  TFile extends {
    url: string;
    id?: string;
  },
>(
  files: (TFile | null | undefined)[]
) => {
  files.filter(Boolean).forEach((file) => {
    try {
      !!file && !!file.url && !file.id && URL.revokeObjectURL(file.url);
    } catch (error) {
      console.error(error);
    }
  });
};

export const documentsUploadHandlerAsync = async (
  documents: UploadingFile[] | null | undefined,
  options?: DocumentUploaderOptions
) => {
  if (!documents || !documents.length) {
    return [];
  }
  const newDocs = documents.filter((item) => !item.id);
  const oldDocs = documents.filter((item) => !!item.id) as UploadedResponseFile[];

  let uploadedDocs: UploadedResponseFile[] = [];

  if (newDocs.length) {
    uploadedDocs = (await errorIgnoreUploadDocumentsAsync(newDocs, options)).filter(
      Boolean
    ) as UploadedResponseFile[];
  }

  return [...oldDocs, ...uploadedDocs];
};

export const errorIgnoreUploadDocumentsAsync = async (
  files: UploadingFile[],
  options?: DocumentUploaderOptions
) => {
  return await Promise.all(
    files.map(async (file) => {
      let response = null;
      try {
        response = await uploadDocumentAsync(file, options);
      } catch (error) {
        console.error(error);
      }

      return response;
    })
  );
};

export const uploadDocumentsAsync = async (
  files: UploadingFile[],
  options?: DocumentUploaderOptions
) => {
  return await Promise.all(files.map((file) => uploadDocumentAsync(file, options)));
};

export const uploadDocumentAsync = async (
  file: UploadingFile,
  options?: DocumentUploaderOptions
) => {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('path', options?.path || 'laundry-admin');

  const response = await fetch(`${API_URL}/object-storage/api/v1/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (response.status !== 200) {
    throw new Error('Upload document failed: ' + response.status);
  }

  const documentInfo = await response.json();

  return {
    name: documentInfo.originalName,
    url: `${documentInfo.bucket}/${documentInfo.path}/${documentInfo.name}${documentInfo.extension}`,
  } as UploadedResponseFile;
};

export const uploadRichTextEditorImageAsync = async (file: File) => {
  const response = await uploadDocumentAsync(file as any);

  return `${API_URL}/object-storage/${response.url}`;
};
