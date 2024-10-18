import { ArrowLeftRight, Check, Copy, LucideLoader2, Search } from 'lucide-react';
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
  const [value, setValue] = useState('');
  const [translatedValue, setTranslatedValue] = useState('');
  const [originLanguage, setOriginLanguage] = useState('pt-br');
  const [finalLanguage, setFinalLanguage] = useState('en-us');
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <main className="h-screen p-6 bg-zinc-50 text-zinc-800 flex flex-col items-center">
      <p className="text-2xl font-bold mb-8 md:mb-12">Tradutor React.js</p>
      <section className="w-full grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 max-w-screen-lg">
        <div className="grid md:flex items-center gap-1 md:gap-2">
          <span className="text-sm text-zinc-600">Traduzir de</span>
          <select
            name="input_language"
            className="text-sm border border-zinc-400 bg-zinc-100 rounded px-4 py-1 mb-2 md:mb-1 hover:bg-zinc-200/70 focus:bg-zinc-200/70 focus:outline-zinc-600"
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
          className="max-md:self-center max-md:-mb-4 max-md:size-4 hover:stroke-zinc-600 transition"
          size={20}
          cursor={'pointer'}
          onClick={() => {
            const finalLanguageTemp = finalLanguage;
            setFinalLanguage(originLanguage);
            setOriginLanguage(finalLanguageTemp);
            const translatedTemp = translatedValue;
            setTranslatedValue(value.slice(0, 250));
            setValue(translatedTemp.slice(0, 250));
          }}
        />

        <div className="grid md:flex items-center gap-1 md:gap-2 md:justify-self-end">
          <span className="text-sm text-zinc-600">Para</span>
          <select
            name="input_language"
            className="text-sm border border-zinc-400 bg-zinc-100 rounded px-4 py-1 mb-2 md:mb-1 hover:bg-zinc-200/70 focus:bg-zinc-200/70 focus:outline-zinc-600"
            value={finalLanguage}
            onChange={e => {
              if (e.target.value === originLanguage) {
                const originLanguageTemp = originLanguage;
                setOriginLanguage(finalLanguage);
                setFinalLanguage(originLanguageTemp);
                const translatedTemp = translatedValue;
                setTranslatedValue(value.slice(0, 250));
                setValue(translatedTemp.slice(0, 250));
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
      <section className="grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-screen-lg ">
        <InputField
          value={value}
          setValue={setValue}
          setTranslatedValue={setTranslatedValue}
          originLanguage={originLanguage}
          finalLanguage={finalLanguage}
          setLoading={setLoading}
        />

        <div className="h-64 border border-zinc-400 bg-zinc-200/80 rounded-lg overflow-hidden flex relative">
          {loading ? (
            <LucideLoader2
              className="stroke-blue-950 w-full self-center justify-self-center"
              size={40}
              style={{ animation: 'loading 1s infinite ease-out ' }}
            />
          ) : (
            <>
              <textarea
                value={translatedValue}
                placeholder="Tradução"
                disabled
                className="w-full h-full resize-none px-3 py-2 text-zinc-700 md:text-xl"
              ></textarea>
              {translatedValue.length > 0 && (
                <div className="absolute left-3 bottom-2 flex items-center gap-4">
                  {!isCopied ? (
                    <button
                      onClick={() => {
                        window.navigator.clipboard.writeText(translatedValue).then(() => {
                          setIsCopied(true);
                          setTimeout(() => setIsCopied(false), 1500);
                        });
                      }}
                      className="cursor-pointer p-1 -m-1 group"
                    >
                      <Copy size={20} className="stroke-zinc-500 group-hover:stroke-zinc-600 transition" />
                    </button>
                  ) : (
                    <Check size={20} className="stroke-green-600 transition" />
                  )}
                  <a
                    href={`https://google.com/search?q=${translatedValue}`}
                    target="_blank"
                    className="p-1 -m-1 cursor-pointer group"
                  >
                    <Search size={20} className="stroke-zinc-500 group-hover:stroke-zinc-600 transition" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
