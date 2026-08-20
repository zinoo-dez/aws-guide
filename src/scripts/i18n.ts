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
  setLanguage(next);
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

  // Update language toggle buttons UI state
  document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
    const currentLabel = btn.querySelector('.lang-current-label');
    if (currentLabel) {
      currentLabel.textContent = activeLang === 'my' ? 'မြန်မာ' : 'EN';
    }
    btn.setAttribute('data-current-lang', activeLang);
    btn.setAttribute('title', activeLang === 'my' ? 'Switch to English' : 'Switch to Myanmar (မြန်မာဘာသာ)');
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
