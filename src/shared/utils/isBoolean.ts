import { BadRequestException } from '@nestjs/common';

export function isBoolean(valor): boolean {
  try {
    // Si el valor es un booleano, lo devolvemos
    if (typeof valor === 'boolean') {
      return valor;
    }
  } catch (error) {
    // Si el valor no es un booleano, lanzamos un error
    throw new BadRequestException('El valor no es booleano');
  }
}
