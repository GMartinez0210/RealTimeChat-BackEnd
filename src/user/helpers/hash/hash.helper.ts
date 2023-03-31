import { generateSaltBcrypt, hashBcrypt } from 'src/utils';

export function hashPassword(password: string): string {
  const saltGenerated = generateSaltBcrypt(10);
  const hash = hashBcrypt(password, saltGenerated);
  return hash;
}
