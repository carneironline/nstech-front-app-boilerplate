import { initI18n } from '@ns-tech/config-i18n'
import pt from './locales/pt-BR/common.json'
import en from './locales/en/common.json'

export const i18nInstance = initI18n(
  {
    'pt-BR': { translation: pt },
    en: { translation: en },
  },
  'pt-BR',
)
