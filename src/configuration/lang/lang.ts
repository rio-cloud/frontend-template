export const DEFAULT_LOCALE = 'en-GB';

type LocaleMap = Record<string, string>;

export const supportedLocaleMap: LocaleMap = {
    bg: 'bg-BG',
    'bg-BG': 'bg-BG',
    cs: 'cs-CZ',
    'cs-CZ': 'cs-CZ',
    da: 'da-DK',
    'da-DK': 'da-DK',
    de: 'de-DE',
    'de-DE': 'de-DE',
    el: 'el-GR',
    'el-GR': 'el-GR',
    en: 'en-GB',
    'en-GB': 'en-GB',
    et: 'et-EE',
    'et-EE': 'et-EE',
    fi: 'fi-FI',
    'fi-FI': 'fi-FI',
    fr: 'fr-FR',
    'fr-FR': 'fr-FR',
    hr: 'hr-HR',
    'hr-HR': 'hr-HR',
    hu: 'hu-HU',
    'hu-HU': 'hu-HU',
    it: 'it-IT',
    'it-IT': 'it-IT',
    ko: 'ko-KR',
    'ko-KR': 'ko-KR',
    lt: 'lt-LT',
    'lt-LT': 'lt-LT',
    lv: 'lv-LV',
    'lv-LV': 'lv-LV',
    nb: 'nb-NO',
    'nb-NO': 'nb-NO',
    nl: 'nl-NL',
    'nl-NL': 'nl-NL',
    pl: 'pl-PL',
    'pl-PL': 'pl-PL',
    pt: 'pt-PT',
    'pt-PT': 'pt-PT',
    'pt-PR': 'pt-PR',
    ro: 'ro-RO',
    'ro-RO': 'ro-RO',
    sk: 'sk-SK',
    'sk-SK': 'sk-SK',
    sl: 'sl-SL',
    'sl-SL': 'sl-SL',
    sv: 'sv-SE',
    'sv-SE': 'sv-SE',
};

export const extractLanguage = (locale: string | null | undefined): string =>
    (locale ?? DEFAULT_LOCALE).split('-')[0] ?? DEFAULT_LOCALE;

export const DEFAULT_LANG = extractLanguage(DEFAULT_LOCALE);

export const getSupportedLocale = (preferredLocale: string): string =>
    Object.hasOwn(supportedLocaleMap, preferredLocale) ? supportedLocaleMap[preferredLocale] : DEFAULT_LOCALE;
