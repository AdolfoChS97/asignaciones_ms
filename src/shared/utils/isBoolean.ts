import { BadRequestException } from '@nestjs/common';

export function isBoolean(valor) {
  // Si el valor es un booleano, lo devolvemos
  if (typeof valor === 'boolean') {
    return valor;
  }

  // Si el valor no es un booleano, lanzamos un error
  throw new BadRequestException('El valor no es booleano');
}



export function optionBoolean(statusParam: any){
  if (typeof statusParam === 'boolean') return true;
  if (typeof statusParam === 'string' && (statusParam === 'true' || statusParam === 'false')) return true;
  return false;
}

