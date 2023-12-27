import { Like } from 'typeorm';

export function applyParamsToSearch(queryParams, target) {
  if (Object.keys(queryParams).length > 0) {
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];

      if (typeof value === 'string') {
        target['where'][key] = Like(`%${value}%`);
      } else if (!isNaN(+value)) {
        target['where'][key] = +value;
      }
    });
  }
  return target;
}
