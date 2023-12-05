import { BadRequestException } from '@nestjs/common';

export function isBase64(text) {
  try {
    atob(text);
    return true;
  } catch (error) {
    throw new BadRequestException('Base64 is not valid');
  }
}
