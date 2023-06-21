import {LanguageMap} from './LanguageMap';

const languageName = (ISO_CODE: string): string | undefined => {
  return LanguageMap.get(ISO_CODE)?.toString();
};

export default languageName;
