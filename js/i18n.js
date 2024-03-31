"use strict";

const i18n = (function() {
  const translations = {
    en: {
      title: 'Who is guilty?',
      header: {
        who: 'Who',
        is: 'is',
        guilty: 'guilty?'
      },
      wheel: {
        spin: 'Spin',
        empty: 'Add someone to spin the wheel!'
      },
      modal: {
        add: {
          header: 'Add someone',
          label: 'Name',
          color: 'Color'
        },
        about: {
          header: 'What is this?',
          explanation: 'How many times has a feature deployment sent your prod environment to the heavenly father? Are you tired of figuring out who to point your finger at this time? If yes, then this app is made just for you. Just add all possible culprits and let the algorithm decide who is guilty this time! That simple!',
          motivation: '',
          resources: {
            isHtml: true,
            text: 'References:<ul>'
              + '<li>Font <a href="https://fonts.google.com/specimen/Chewy" target="_blank">Chewy</a>.</li>'
              + '<li>Wheel drawing and spinning wisdom found <a href="https://stackoverflow.com/a/33850748" target="_blank">here</a>.</li>'
              + '</ul>'
          },
          thanks: 'Dedicated to: Rauno 🤔, Danil 🐔, Dalex 🐈 and Rahandusministeerium 🤓. You boys are always guilty in my heart!! 😚😚'
        },
        locale: {
          header: 'Select language',
        },
        submit: 'Add',
        cancel: 'Cancel'
      }
    },
    ee: {
      title: 'Kes on süüdi?',
      header: {
        who: 'Kes',
        is: 'on',
        guilty: 'süüdi?'
      },
      wheel: {
        spin: 'Keera',
        empty: 'Lisa keegi, et keerutada!'
      },
      modal: {
        add: {
          header: 'Lisa osaleja',
          label: 'Nimi',
          color: 'Värv'
        },
        about: {
          header: 'Mis asi see on?',
          explanation: 'Kui tihti on su meeskonnas olnud olukord kus mingi featuuri deployment järjekordselt saadab prod keskkonna taevase isa poole? Kas sa oled väsinud mõtlemast kelle suunas näpuga näidata? Kui jah, siis see rakendus on loodud just sulle. Lihtsalt lisa kõik võimalikud süüdlased ning lase algoritmil valida kes seekord on süüdi! Nii lihtne see ongi!',
          resources: {
            isHtml: true,
            text: 'Kasutatud allikad ning lisad:<ul>'
              + '<li>Font <a href="https://fonts.google.com/specimen/Chewy" target="_blank">Chewy</a>.</li>'
              + '<li>Ratta joonistamise ja keerutamise tarkuse leidsin <a href="https://stackoverflow.com/a/33850748" target="_blank">siit</a>.</li>'
              + '</ul>'
          },
          thanks: 'Pühendatud poistele: Rauno 🤔, Danil 🐔, Dalex 🐈 ning Rahandusministeerium 🤓. Olete mu südames alati süüdi!! 😚😚'
        },
        locale: {
          header: 'Vali keel',
        },
        submit: 'Lisa',
        cancel: 'Tühista'
      }
    }
  };
  const langs = Object.keys(translations);
  const defaultLanguage = 'en';

  let i18nEls = null;
  let currLang = defaultLanguage;

  function getTranslation(key) {
    return key.split('.').reduce((acc, curr) => (acc || {})[curr], translations[currLang]) || key;
  };

  function setLang(lang) {
    const queryLang = tryGetQueryLang();
    lang = lang || queryLang;

    if (!langs.includes(lang)) {
      console.error(`Language "${lang}" not supported`);
      lang = defaultLanguage;
    } else if (lang !== queryLang) {
      setQueryLang(lang);
      return;
    }


    currLang = lang;
    for(let i = 0; i < i18nEls.length; i++) {
      const i18nEl = i18nEls[i];
      const t = getTranslation(i18nEl.dataset.i18n);
      if (t.isHtml === true) 
        i18nEl.innerHTML = t.text;
      else 
        i18nEl.innerText = t;
    }
  }

  function tryGetQueryLang() {
    if (!window.location.search) return defaultLanguage;
    const langPart = window.location.search
      .replace('?', '')
      .split('&')
      .find(part => part.startsWith('l='));

    return !!langPart
      ? langPart.split('=')[1]
      : defaultLanguage;
  }

  function setQueryLang(lang) {
    window.location.href = `${window.location.pathname}?l=${lang}`;
  }

  function init() {
    i18nEls = document.querySelectorAll('[data-i18n]');
    setLang();
  }

  return {
    setLang,
    langs,
    init,
    getTranslation
  };
})();