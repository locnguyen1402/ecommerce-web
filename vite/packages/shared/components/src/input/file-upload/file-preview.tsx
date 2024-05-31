type Props = {
  file: UploadingFile;
  onRemove: (index: number) => void;
  index: number;
};

const FilePreview = ({ file, onRemove, index }: Props) => {
  return (
    <a
      href="#"
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
      className="position-relative"
    >
      <img
        src={file.url}
        className="img-thumbnail min-w-150px w-150px h-100px object-fit-contain"
        alt="preview-image"
      />

      <button
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();

          onRemove(index);
        }}
        className="position-absolute btn btn-sm btn-icon btn-active-light-danger"
        style={{
          top: 0,
          right: 0,
        }}
      >
        <i className="bi bi-x fs-1"></i>
      </button>
    </a>
  );
};

export { FilePreview };
