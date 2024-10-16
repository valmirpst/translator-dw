import { Dispatch, SetStateAction, useState } from 'react';
import { TranslationResponse } from '../@types/TranslationResponse';

type InputFieldProps = {
  setTranslatedValue: Dispatch<SetStateAction<string>>;
  originLanguage: string;
  finalLanguage: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function InputField({
  setTranslatedValue,
  originLanguage,
  finalLanguage,
  loading,
  setLoading,
}: InputFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  async function translate() {
    setLoading(true);
    setError('');

    try {
      if (!value) throw new Error('O texto não pode estar vazio!');
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
  }

  return (
    <div>
      <div className="h-64 border border-zinc-400 bg-zinc-200/80 rounded overflow-hidden flex relative">
        <textarea
          onClick={() => setError('')}
          value={value}
          onChange={e => setValue(e.target.value.slice(0, 250))}
          onKeyDown={async e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              await translate();
            }
          }}
          placeholder="Digitar Texto"
          className="w-full h-full resize-none px-3 py-2 text-zinc-700"
        ></textarea>
        <button
          onClick={translate}
          disabled={loading}
          className="text-sm bg-blue-950 rounded-full px-7 py-1 text-zinc-200 absolute right-2 bottom-2 hover:bg-blue-900 transition disabled:bg-zinc-600/80"
        >
          {loading ? 'Traduzir' : 'Traduzir'}
        </button>
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
