import 'quill/dist/quill.snow.css';

import clsx from 'clsx';

import { useEffect, useRef, useState } from 'react';

import Quill from 'quill';

export type RichTextInputProps = {
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  imageHandler?: (file: File) => Promise<string>;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const RichTextInput = ({
  readOnly,
  disabled,
  placeholder,
  value,
  defaultValue,
  onChange,
  imageHandler,
  className,
}: RichTextInputProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [richTextValue, setRichTextValue] = useState(value ?? defaultValue ?? '');

  const quillRef = useRef<Quill | null>(null);

  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (!isMounted || !editorRef.current || !!quillRef.current) return;

      const toolbarOptions = [
        // [{ font: [] }],

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        // [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        [{ align: [false, 'center', 'right', 'justify'] }],
        ['link', 'image'],

        ['clean'], // remove formatting button
      ];

      const quill = (quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        readOnly,
        placeholder,
        modules: {
          toolbar: toolbarOptions,
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        },
      }));

      quill.on('text-change', () => {
        handleValueChange(quill.root.innerHTML);
      });

      quill.root.innerHTML = richTextValue;

      if (typeof imageHandler === 'function') {
        const toolbar = quill.getModule('toolbar');
        if (toolbar) {
          toolbar.addHandler('image', handleSelectImage);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    if (!!quillRef.current && typeof disabled === 'boolean') {
      disabled ? quillRef.current.disable() : quillRef.current.enable();
    }
  }, [disabled, quillRef.current]);

  const handleValueChange = (value: string) => {
    setRichTextValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  const handleSelectImage = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('style', 'visibility:hidden');

    input.onchange = () => {
      if (!input.files) return;

      try {
        const file = input.files[0];

        if (/^image\//.test(file.type)) {
          imageHandler!(file).then((imageUrl) => {
            insertImageLinkToEditor(imageUrl);
          });
        } else {
          console.warn('You could only upload images.');
        }
      } catch (e) {}
    };

    input.click();
  };

  const insertImageLinkToEditor = (url: string) => {
    if (!quillRef.current) return;

    const instance = quillRef.current;

    const range = instance.getSelection();
    range && instance.insertEmbed(range.index, 'image', url);
  };

  if (!isMounted) return null;

  return (
    <div className={clsx('d-flex flex-column min-h-150px', className)}>
      <div className="overflow-y-auto position-static flex-grow-1" ref={editorRef} />
    </div>
  );
};

export { RichTextInput };
