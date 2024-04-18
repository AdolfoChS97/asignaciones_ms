import { Like, ILike } from 'typeorm';
import { stringToBoolean } from './converBoolean';

export function applyParamsToSearch(queryParams, target) {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(([key]) => key !== 'nested')
  );

  if (Object.keys(filteredParams).length > 0) {
    Object.keys(filteredParams).forEach((key) => {
      const value = filteredParams[key];

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
