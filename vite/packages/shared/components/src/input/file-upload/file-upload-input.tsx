import { ReactNode, useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { FilePreview } from './file-preview';

export type FileUploadInputProps = {
  value?: UploadingFile[];
  onChange?: (files: Array<File>) => void;
  options: Omit<DropzoneOptions, 'onDrop' | 'disabled'>;
  className?: string;
  disabled?: boolean;
  placeholderComponent?: ReactNode | ((props: { hasValue: boolean }) => ReactNode);
  /**
   * If false, have to manually revoke urls to avoid memory leaks
   */
  revokeUrlOnUnmount?: boolean;
};

const FileUploadInput = ({
  value,
  onChange,
  options,
  className,
  disabled,
  placeholderComponent,
  revokeUrlOnUnmount = true,
}: FileUploadInputProps) => {
  const [, setRejected] = useState<Array<FileRejection>>([]);

  const onAddFiles = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map<UploadingFile>((file) =>
      Object.assign(file, {
        url: URL.createObjectURL(file),
      })
    );

    let newValues: UploadingFile[] = [];

    if (options.multiple) {
      newValues = [...(value || []), ...newFiles];
    } else {
      newValues = newFiles;
    }

    !!onChange && onChange(newValues);
  };

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>, event: DropEvent) => {
      if (acceptedFiles?.length) {
        onAddFiles(acceptedFiles);
      }

      if (rejectedFiles?.length) {
        setRejected((prevFiles) => [...prevFiles, ...rejectedFiles]);
      }
    },
    [value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    disabled,
    onDrop,
  });

  useEffect(() => {
    return () => {
      if (revokeUrlOnUnmount && value?.length) {
        value.forEach((file) => {
          try {
            !!file.url && URL.revokeObjectURL(file.url ?? '');
          } catch (error) {
            console.error(error);
          }
        });
      }
    };
  }, []);

  const onRemove = (index: number) => {
    if (!disabled && value?.length && onChange) {
      onChange(value.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div
      {...getRootProps({
        className: clsx(
          'p-4 d-flex flex-column justify-content-center align-items-center gap-4 w-100',
          className,
          {
            'bg-gray-200 opacity-75': disabled,
          }
        ),
      })}
    >
      {placeholderComponent ? (
        typeof placeholderComponent === 'function' ? (
          placeholderComponent({ hasValue: !!value?.length })
        ) : (
          placeholderComponent
        )
      ) : (
        <div className="d-flex flex-column align-items-center gap-4">
          <i className="bi bi-upload fs-2x"></i>

          <div className="text-muted">
            Drag and drop a file, or{' '}
            <a
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
              }}
            >
              Browse
            </a>
          </div>
        </div>
      )}

      <input {...getInputProps()} />

      {!!value?.length && (
        <div className="w-100 d-flex flex-start overflow-x-auto gap-2">
          {value.map((item, index) => {
            return <FilePreview key={item.url} index={index} file={item} onRemove={onRemove} />;
          })}
        </div>
      )}
    </div>
  );
};

export { FileUploadInput };
