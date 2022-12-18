import { computed } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      const argsForFunc = args.map((arg) => arg.value ?? arg);
      return func(...argsForFunc);
    });
}
