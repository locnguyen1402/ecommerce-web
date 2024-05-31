import { useEffect, useState } from 'react';

export const useDebouncedText = (delay = 500, input?: { initial?: string }) => {
  const [text, setText] = useState(input?.initial || '');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return {
    actualText: text,
    debouncedText,
    setActualText: setText,
  };
};
