import { translations, type SupportedLang } from '../i18n/translations';

export function getStoredLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('aws-guild-lang') as SupportedLang;
  if (saved && (saved === 'en' || saved === 'my')) {
    return saved;
  }
  return 'en';
}

export function setLanguage(lang: SupportedLang) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('aws-guild-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  applyTranslations(lang);
  window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang } }));
}

export function toggleLanguage(): SupportedLang {
  const current = getStoredLanguage();
  const next: SupportedLang = current === 'en' ? 'my' : 'en';

  if (typeof document !== 'undefined') {
    // 1. Add switching classes & progress bar
    document.body.classList.add('lang-switching');
    
    let bar = document.getElementById('lang-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'lang-progress-bar';
      document.body.appendChild(bar);
    }
    // Trigger progress sweep
    bar.classList.add('active');

    // Spin globe icon
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => btn.classList.add('is-switching'));

    // 2. Perform translation switch halfway through micro-fade
    setTimeout(() => {
      setLanguage(next);

      setTimeout(() => {
        document.body.classList.remove('lang-switching');
        document.querySelectorAll('.lang-toggle-btn').forEach(btn => btn.classList.remove('is-switching'));
        if (bar) {
          bar.classList.remove('active');
          setTimeout(() => {
            if (bar) bar.style.width = '0%';
          }, 200);
        }
      }, 100);
    }, 120);
  } else {
    setLanguage(next);
  }

  return next;
}

export function t(key: string, lang?: SupportedLang): string {
  const activeLang = lang || getStoredLanguage();
  const dict = translations[activeLang] as Record<string, string>;
  if (dict && dict[key]) {
    return dict[key];
  }
  // Fallback to English
  const enDict = translations.en as Record<string, string>;
  return enDict[key] || key;
}

export function applyTranslations(lang?: SupportedLang) {
  if (typeof window === 'undefined') return;
  const activeLang = lang || getStoredLanguage();
  const dict = translations[activeLang] as Record<string, string>;
  const enDict = translations.en as Record<string, string>;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translated = dict[key] || enDict[key];
      if (translated) {
        el.textContent = translated;
      }
    }
  });

  // Input Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
      const translated = dict[key] || enDict[key];
      if (translated) {
        el.placeholder = translated;
      }
    }
  });

  // Title / Aria Label
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      const translated = dict[key] || enDict[key];
      if (translated) {
        el.setAttribute('title', translated);
        el.setAttribute('aria-label', translated);
      }
    }
  });

  // Update language toggle buttons accessibility and title state
  document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
    btn.setAttribute('data-current-lang', activeLang);
    btn.setAttribute(
      'title',
      activeLang === 'en'
        ? 'မြန်မာဘာသာသို့ ပြောင်းမည် (Switch to Myanmar)'
        : 'Switch to English (အင်္ဂလိပ်ဘာသာသို့ ပြောင်းမည်)'
    );
    btn.setAttribute(
      'aria-label',
      activeLang === 'en'
        ? 'Switch to Myanmar language'
        : 'Switch to English language'
    );
  });
}

// Auto-run on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
  });
  document.addEventListener('astro:page-load', () => {
    applyTranslations();
  });
}
