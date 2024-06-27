import { InputHTMLAttributes, useMemo, useState } from 'react';

import clsx from 'clsx';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

export type TagsInputProps = {
  id?: string;
  downKey?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  readonly?: boolean;
  addable?: boolean;
  removable?: boolean;
  placeholder?: string;
  classNames?: {
    container?: string;
    input?: string;
  };
  max?: number;
};

const TagsInput = ({
  disabled,
  classNames,
  readonly,
  placeholder,
  onChange,
  value = [],
  addable = true,
  removable = true,
  downKey = 'Enter',
  max,
  id,
}: TagsInputProps) => {
  const tags = useMemo(() => (Array.isArray(value) ? value : []), [value]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange: InputAttributes['onChange'] = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown: InputAttributes['onKeyDown'] = (event) => {
    const newTag = inputValue.trim();
    if (
      event.key === downKey &&
      newTag &&
      typeof onChange === 'function' &&
      (!max || (Number.isInteger(max) && tags.length < max))
    ) {
      onChange([...tags, newTag]);
      setInputValue('');
    }
  };

  const handleRemoveChip = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    if (typeof onChange === 'function') {
      onChange(newTags);
    }
  };

  const inputVisible = !disabled && !readonly && addable;

  return (
    <button
      id={id}
      disabled={disabled}
      className={clsx(
        'form-control d-flex flex-wrap row-gap-2 column-gap-1',
        classNames?.container
      )}
    >
      <div
        className={clsx('d-flex flex-wrap column-gap-2 row-gap-1', {
          'min-h-20px': !inputVisible,
        })}
      >
        {tags.map((chip, index) => (
          <span key={`${chip}-${index}`} className="badge text-gray-700 bg-gray-300 rounded-2">
            {chip}
            {!disabled && !readonly && removable && (
              <button
                type="button"
                className="btn-close ms-2"
                aria-label="Close"
                onClick={() => handleRemoveChip(index)}
              ></button>
            )}
          </span>
        ))}
      </div>
      {inputVisible && (
        <input
          className={clsx(
            'w-auto flex-grow-1 min-h-auto form-control border-0 p-0 align-self-center',
            classNames?.input
          )}
          readOnly={readonly}
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      )}
    </button>
  );
};

export { TagsInput };
