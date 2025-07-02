import { getLocalizedErrorMessage, Language, t } from './translations';

// Legacy error code mapping for backwards compatibility
export const ERROR_MESSAGES: Record<string, string> = {
  SIGN004: '이메일 또는 비밀번호가 올바르지 않습니다.',
  SIGN001: '이미 존재하는 이메일입니다.',
  SIGN002: '비밀번호가 일치하지 않습니다.',
  SIGN003: '계정이 존재하지 않습니다.',
  SIGN005: '계정이 비활성화되었습니다.',
  AUTH001: '인증이 만료되었습니다.',
  AUTH002: '권한이 없습니다.',
  // Add more error codes as needed
};

/**
 * Get user-friendly error message from error code or API response
 * @deprecated Use getLocalizedErrorMessage for i18n support
 */
export function getErrorMessage(
  errorCode?: string,
  apiMessage?: string,
  fallback = '오류가 발생했습니다. 다시 시도해주세요.'
): string {
  return getLocalizedErrorMessage(errorCode, apiMessage, 'ko');
}

/**
 * Get user-friendly error message with i18n support
 */
export function getErrorMessageWithI18n(
  errorCode?: string,
  apiMessage?: string,
  language: Language = 'ko'
): string {
  return getLocalizedErrorMessage(errorCode, apiMessage, language);
}

/**
 * Extract error information from API error response
 */
export function extractErrorInfo(error: any): { code?: string; message?: string; details?: string } {
  // Handle Axios error structure - check multiple possible structures
  if (error?.response?.data?.data) {
    return {
      code: error.response.data.data.code,
      message: error.response.data.data.message,
      details: error.response.data.data.details,
    };
  }
  
  // Handle alternative structure where error data is directly in response.data
  if (error?.response?.data?.status === 'fail' && error?.response?.data?.data) {
    return {
      code: error.response.data.data.code,
      message: error.response.data.data.message,
      details: error.response.data.data.details,
    };
  }
  
  // Handle React Query error structure
  if (error?.response?.data) {
    return {
      code: error.response.data.code,
      message: error.response.data.message,
      details: error.response.data.details,
    };
  }
  
  // Handle direct error message
  if (error?.message) {
    return { message: error.message };
  }
  
  return {};
}