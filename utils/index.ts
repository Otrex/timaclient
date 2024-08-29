import { isVNode } from "vue";

export const forAsterisk = (patterns: string[], path: string): boolean => {
  return patterns.some(pattern => {
    if (pattern === path) {
      return true;
    }
    if (pattern.includes('*')) {
      const basePattern = pattern.replace('*', '');
      return path.startsWith(basePattern);
    }
    return false;
  });
}



export const isVueComponent = (obj: any): boolean => {
  return (
    obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    (
      (typeof obj === 'function' && obj.prototype && obj.prototype.$isComponent) ||
      (obj.__esModule && typeof obj.default === 'function' && obj.default.prototype && obj.default.prototype.$isComponent) ||
      isVNode(obj)
    )
  )
}
