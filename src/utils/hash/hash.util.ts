import * as bcrypt from 'bcrypt';

export function hashBcrypt(text: string, salt: string | number): string {
  const hash = bcrypt.hashSync(text, salt);
  return hash;
}

export function generateSaltBcrypt(rounds = 10): string {
  const salt = bcrypt.genSaltSync(rounds);
  return salt;
}

export function compareWithHashBcrypt(text: string, hash: string): boolean {
  const compare = bcrypt.compareSync(text, hash);
  return compare;
}

export function getRoundsFromHashBcrypt(hash: string): number {
  const rounds = bcrypt.getRounds(hash);
  return rounds;
}
