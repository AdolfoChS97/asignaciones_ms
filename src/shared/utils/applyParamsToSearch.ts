export function applyParamsToSearch(queryParams, target) {
  if (Object.keys(queryParams).length > 0) {
    Object.keys(queryParams).forEach((key) => {
      if (!isNaN(+queryParams[key])) {
        target['where'][key] = +queryParams[key];
      }
    });
  }
  return target;
}
