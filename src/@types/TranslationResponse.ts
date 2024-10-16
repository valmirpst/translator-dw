export type TranslationResponse = {
  responseData: {
    translatedText: string;
    match: number;
  };
  quotaFinished: boolean;
  mtLangSupported: string | null;
  responseDetails: string;
  responseStatus: number;
  responderId: string | null;
  exception_code: string | null;
  matches: {
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: string | number;
    reference: string | null;
    'usage-count': number;
    subject: string;
    'created-by': string;
    'last-updated-by': string;
    'create-date': string;
    'last-update-date': string;
    match: number;
  }[];
};
