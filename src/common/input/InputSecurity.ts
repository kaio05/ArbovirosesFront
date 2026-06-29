export const MAX_PASSWORD_LENGTH = 72;
export const MAX_NAME_LENGTH = 120;
export const MAX_UPLOAD_BYTES = 1024 * 1024 * 1024;
export const MAX_UPLOAD_LABEL = '1GB';

export function digitsOnly(value: string, maxLength?: number): string {
  const cleaned = value.replace(/\D/g, '');
  return typeof maxLength === 'number' ? cleaned.slice(0, maxLength) : cleaned;
}

export function sanitizePassword(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, MAX_PASSWORD_LENGTH);
}

export function sanitizeSafeText(value: string, maxLength = MAX_NAME_LENGTH): string {
  return value
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
    .replace(/[^\p{L}\p{M}\p{N} .,'_-]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, maxLength);
}

export function sanitizeSafeCode(value: string, maxLength = 20): string {
  return value.replace(/[^A-Za-z0-9._-]/g, '').slice(0, maxLength);
}

export function sanitizeDateBR(value: string): string {
  const digits = digitsOnly(value, 8);
  const parts: string[] = [];

  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length >= 3) parts.push(digits.slice(2, 4));
  if (digits.length >= 5) parts.push(digits.slice(4, 8));

  return parts.join('/');
}

export function validateUploadFile(file: File, allowedExtensions: string[]): string | null {
  if (file.size <= 0) {
    return 'Arquivo nao pode ser vazio.';
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return `Arquivo excede o tamanho maximo permitido de ${MAX_UPLOAD_LABEL}.`;
  }

  if (file.name.length > 180 || file.name.includes('/') || file.name.includes('\\') || file.name.includes('..')) {
    return 'Nome do arquivo invalido.';
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!allowedExtensions.map((item) => item.toLowerCase()).includes(ext)) {
    return `O arquivo precisa estar no formato .${allowedExtensions.join(', .')}`;
  }

  return null;
}
