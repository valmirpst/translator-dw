import { ArrowLeftRight, LucideLoader2 } from 'lucide-react';
import { useState } from 'react';
import InputField from './components/InputField';

const languages = [
  { code: 'pt-br', name: 'Português' },
  { code: 'en-us', name: 'Inglês' },
  { code: 'es', name: 'Espanhol' },
  { code: 'fr', name: 'Francês' },
  { code: 'de', name: 'Alemão' },
  { code: 'it', name: 'Italiano' },
];

export default function App() {
  const [translatedValue, setTranslatedValue] = useState('');
  const [originLanguage, setOriginLanguage] = useState('pt-br');
  const [finalLanguage, setFinalLanguage] = useState('en-us');
  const [loading, setLoading] = useState(false);

  return (
    <main className="h-screen p-6 text-zinc-800 flex flex-col items-center">
      <p className="text-2xl font-bold mb-12">Tradutor React.js</p>
      <section className="w-full grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 max-w-screen-lg">
        <div className="grid md:flex items-center gap-1 md:gap-2">
          <span className="text-sm text-zinc-600">Traduzir de</span>
          <select
            name="input_language"
            className="text-sm border border-zinc-400 bg-zinc-100 rounded px-3 py-1 mb-1"
            value={originLanguage}
            onChange={e => {
              if (e.target.value === finalLanguage) {
                const finalLanguageTemp = finalLanguage;
                setFinalLanguage(originLanguage);
                setOriginLanguage(finalLanguageTemp);
              } else setOriginLanguage(e.target.value);
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <ArrowLeftRight
          className="max-md:self-center max-md:-mb-4 max-md:size-4"
          size={20}
          cursor={'pointer'}
          onClick={() => {
            const finalLanguageTemp = finalLanguage;
            setFinalLanguage(originLanguage);
            setOriginLanguage(finalLanguageTemp);
          }}
        />

        <div className="grid md:flex items-center gap-1 md:gap-2 md:justify-self-end">
          <span className="text-sm text-zinc-600">Para</span>
          <select
            name="input_language"
            className="text-sm border border-zinc-400 bg-zinc-100 rounded px-3 py-1 mb-1"
            value={finalLanguage}
            onChange={e => {
              if (e.target.value === originLanguage) {
                const originLanguageTemp = originLanguage;
                setOriginLanguage(finalLanguage);
                setFinalLanguage(originLanguageTemp);
              } else setFinalLanguage(e.target.value);
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-6 w-full max-w-screen-lg ">
        <InputField
          setTranslatedValue={setTranslatedValue}
          originLanguage={originLanguage}
          finalLanguage={finalLanguage}
          loading={loading}
          setLoading={setLoading}
        />

        <div className="h-64 border border-zinc-400 bg-zinc-200/80 rounded overflow-hidden flex">
          {loading ? (
            <LucideLoader2
              className="stroke-blue-950 w-full self-center justify-self-center"
              size={40}
              style={{ animation: 'loading 1s infinite ease-out ' }}
            />
          ) : (
            <textarea
              value={translatedValue}
              placeholder="Tradução"
              disabled
              className="w-full h-full resize-none px-3 py-2 text-zinc-700"
            ></textarea>
          )}
        </div>
      </section>
    </main>
  );
}
