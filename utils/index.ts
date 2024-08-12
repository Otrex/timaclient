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