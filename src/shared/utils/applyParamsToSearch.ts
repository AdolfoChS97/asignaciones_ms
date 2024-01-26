import { Like, ILike } from 'typeorm';
import { stringToBoolean } from './converBoolean';

export function applyParamsToSearch(queryParams, target) {
  if (Object.keys(queryParams).length > 0) {
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];

      if (typeof value === 'string' && value !== 'true' && value !== 'false') {
        target['where'][key] = ILike(`%${value}%`);
      } else if (!isNaN(+value)) {
        target['where'][key] = +value;
      } else if (value === 'true' || value === 'false') {
        target['where'][key] = stringToBoolean(value); // Directly apply boolean values
      }
      console.log(value, 'change');
    });
  }
  return target;
}
