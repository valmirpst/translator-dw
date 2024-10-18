import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { TranslationResponse } from '../@types/TranslationResponse';

type InputFieldProps = {
  setTranslatedValue: Dispatch<SetStateAction<string>>;
  originLanguage: string;
  finalLanguage: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function InputField({
  setTranslatedValue,
  originLanguage,
  finalLanguage,
  setLoading,
  value,
  setValue,
}: InputFieldProps) {
  const [error, setError] = useState('');

  const translate = useDebouncedCallback(async () => {
    setLoading(true);
    setError('');

    try {
      if (!value) {
        setTranslatedValue('');
        return;
      }
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${value}&langpair=${originLanguage}|${finalLanguage}`
      );
      const data: TranslationResponse = await res.json();
      setTranslatedValue(data.responseData.translatedText);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    translate();
  }, [translate, finalLanguage, originLanguage]);
  return (
    <div>
      <div className="h-64 border border-zinc-400 bg-zinc-200/80 rounded-lg flex relative">
        <textarea
          onClick={() => setError('')}
          value={value}
          onChange={e => {
            translate();
            setValue(e.target.value.slice(0, 250));
          }}
          onKeyDown={async e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              await translate();
            }
          }}
          placeholder="Digitar Texto"
          className="w-full h-full resize-none px-3 py-2 text-zinc-700 md:text-xl rounded-lg"
        ></textarea>
        <span className="text-zinc-600 text-sm absolute left-2 bottom-2 flex gap-0.5">
          <span>{value.length}</span>
          <span>/</span>
          <span>250</span>
        </span>
      </div>
      {error && <span className=" text-red-700 mt-1">{error}</span>}
    </div>
  );
}
