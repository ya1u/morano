import {LanguageMap} from './LanguageMap';

export default function languageName(ISO_CODE: string): string | undefined {
  return LanguageMap.get(ISO_CODE)?.toString();
}
