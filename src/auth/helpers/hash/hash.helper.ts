import { UnauthorizedException } from '@nestjs/common';

import { compareWithHashBcrypt } from '../../../utils';

export function comparePassword(password: string, hash: string) {
  const compare = compareWithHashBcrypt(password, hash);

  if (compare) return;

  throw new UnauthorizedException('The password given is not correct');
}
