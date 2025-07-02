// Simple i18n translations for error messages
export const TRANSLATIONS = {
  ko: {
    errors: {
      SIGN004: '이메일 또는 비밀번호가 올바르지 않습니다.',
      SIGN001: '이미 존재하는 이메일입니다.',
      SIGN002: '비밀번호가 일치하지 않습니다.',
      SIGN003: '계정이 존재하지 않습니다.',
      SIGN005: '계정이 비활성화되었습니다.',
      AUTH001: '인증이 만료되었습니다.',
      AUTH002: '권한이 없습니다.',
      NETWORK_ERROR: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
      LOGIN_FAILED: '로그인에 실패했습니다.',
      LOGIN_INVALID_CREDENTIALS: '로그인 정보가 일치하지 않습니다.',
    },
    ui: {
      loginFailed: '로그인 실패',
      loggingIn: '로그인 중...',
      login: '로그인',
      retry: '다시 시도',
    }
  },
  en: {
    errors: {
      SIGN004: 'Email or password is incorrect.',
      SIGN001: 'Email already exists.',
      SIGN002: 'Passwords do not match.',
      SIGN003: 'Account does not exist.',
      SIGN005: 'Account has been deactivated.',
      AUTH001: 'Authentication has expired.',
      AUTH002: 'Access denied.',
      NETWORK_ERROR: 'Network error occurred. Please check your internet connection.',
      UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
      LOGIN_FAILED: 'Login failed.',
      LOGIN_INVALID_CREDENTIALS: 'Login credentials do not match.',
    },
    ui: {
      loginFailed: 'Login Failed',
      loggingIn: 'Signing in...',
      login: 'Sign In',
      retry: 'Retry',
    }
  }
};

export type Language = keyof typeof TRANSLATIONS;
export type ErrorKey = keyof typeof TRANSLATIONS.ko.errors;
export type UIKey = keyof typeof TRANSLATIONS.ko.ui;

/**
 * Get translated text by key and language
 */
export function t<T extends 'errors' | 'ui'>(
  category: T,
  key: T extends 'errors' ? ErrorKey : UIKey,
  language: Language = 'ko'
): string {
  const translation = TRANSLATIONS[language]?.[category];
  const fallback = TRANSLATIONS.ko[category];
  
  if (category === 'errors') {
    return (translation as any)?.[key] || (fallback as any)[key];
  } else {
    return (translation as any)?.[key] || (fallback as any)[key];
  }
}

/**
 * Get error message with i18n support
 */
export function getLocalizedErrorMessage(
  errorCode?: string,
  apiMessage?: string,
  language: Language = 'ko'
): string {
  // First try to get localized message from error code
  if (errorCode && errorCode in TRANSLATIONS[language].errors) {
    return t('errors', errorCode as ErrorKey, language);
  }
  
  // Then try API message (assume it's already in the correct language)
  if (apiMessage?.trim()) {
    return apiMessage;
  }
  
  // Return localized fallback message
  return t('errors', 'LOGIN_INVALID_CREDENTIALS', language);
}