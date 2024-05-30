export function paginate<T>(array: T[], pageNumber: number, pageSize = 10): T[] {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
