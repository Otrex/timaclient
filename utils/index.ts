import { isVNode } from "vue";

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function log(...inputs: any[]) {
  return console.log(...inputs)
}


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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
