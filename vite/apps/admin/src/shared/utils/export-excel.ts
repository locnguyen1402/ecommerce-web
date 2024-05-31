import { DocumentInfoResponse, PlainMessage } from '@vklink/grpc-api';

type Props = {
  fileName: string;
  data: Uint8Array;
};

export const exportExcel = ({ fileName, data }: Props) => {
  // convert Unit8Array to Base64
  let binary = '';
  const len = data.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(data[i]);
  }
  const base64 = window.btoa(binary);

  //convert base64 to file
  const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = `${fileName}.xlsx`;
  downloadLink.click();
};
