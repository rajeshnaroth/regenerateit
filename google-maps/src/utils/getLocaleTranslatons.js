/* global navigator, window */
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import localeData from '../locales/translations.json';

// Uses navigator and window globals

const getLocaleTransition = (renderAppFunction) => {
  addLocaleData([
    ...en,
    ...fr,
    ...es,
  ]);
  // Define user's language. Different navigators have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

  // Split locales with a region code
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

  // Try full locale, try locale without region code, fallback to 'en'
  const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

  // safari polyfill
  if (!window.Intl) {
    // console.log("getLocaleTranslatons.js: !window.intl", messages, languageWithoutRegionCode);

    require.ensure([
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/fr.js',
      'intl/locale-data/jsonp/es.js',
    ], (require) => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/fr.js');
      require('intl/locale-data/jsonp/es.js');
      renderAppFunction(messages, languageWithoutRegionCode);
    });
  } else {
    renderAppFunction(messages, languageWithoutRegionCode);
  }

  return { messages, languageWithoutRegionCode };
};

export default getLocaleTransition;
