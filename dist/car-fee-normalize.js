export const normalizeCarName = (value) => value.toLowerCase().normalize('NFD')
  .replace(/\p{Diacritic}/gu, '').replaceAll('đ', 'd').replace(/[^a-z0-9]/g, '');
