import { useTimeAgo } from "@vueuse/core";
import type { IStore, Rule, RuleObject } from "~/lib/interfaces/utils";

function capitalize(str: string) {
  return str.split('').map((s, i) => i === 0 ? s.toUpperCase() : s.toLowerCase()).join('')
}

export default {
  isCertain: <T>(data?: T) => data as T,
  trunc: (input: string, numWords: number): string => {
    const words = input.split(' ');
    if (words.length <= numWords) {
      return input;
    }
    const truncatedWords = words.slice(0, numWords);
    const truncatedString = truncatedWords.join(' ') + '...';
    return truncatedString;
  },
  truncateList: (max: number) => <T>(list: T[]) => list.filter((_, i) => i < max),
  generateSalt: (length: number, saltType: 'alphanumeric' | 'numeric') => {
    if (!['alphanumeric', 'numeric'].includes(saltType)) {
      throw new Error("Invalid salt type. Use 'alphanumeric' or 'numeric'.");
    }

    let characters = '';
    if (saltType === 'alphanumeric') {
      characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    } else {
      characters = '0123456789';
    }

    let salt = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salt += characters.charAt(randomIndex);
    }

    return salt;
  },
  range: (start: number, end: number, step = 1) => {
    const r = new Array(Math.floor((end - start) / step)).fill(0).map((e, i) => start + (step * i));
    r.push(end);
    return r;
  },
  json: {
    encode: (value: any) => {
      return JSON.stringify({ value });
    },
    parse: <T = unknown>(value: string | null) => {
      return JSON.parse(value || '{}').value as T;
    }
  },
  cookieStore: (): IStore => ({
    get(key: string) {
      return JSON.stringify(useCookie(key).value);
    },
    set(key: string, value: string) {
      useCookie(key).value = value;
    },
    clear(key) {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
  }),

  removeDuplicateURL(url = "") {
    const urlPattern = /(https?:\/\/\S+\/)(?=\S*https?:\/\/\S+\/)/g;
    return url.replace(urlPattern, "");
  },
  resolveSocialsIcon(key: string) {
    const availableIcons = [
      "instagram-lg",
      "tiktok-lg",
      "youtube-lg"
    ];

    const el = availableIcons.find(e => e.includes(key.toLowerCase()))
    if (el) return `socials/${el}`;

    const socialMap: Record<string, string> = {
      "Instagram": "socials/instagram-lg",
      "Tictok": "socials/tiktok-lg",
      "Youtube": "socials/youtube-lg",
      "Twiiter": "socials/twitter-lg",
    }

    return socialMap[key] || socialMap['Youtube'];
  },

  optionizeRule: <T extends Record<string, Rule>>(inputObject: T): RuleObject<T> => {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(inputObject)) {
      if (value.hasOwnProperty('required')) {
        const { required, ...rest } = value as Rule;
        result[key] = rest;
      } else {
        result[key] = value;
      }
    }

    return result as RuleObject<T>;
  },

  extractName(fullName: string) {
    const names = fullName.split(" ");
    let firstName, lastName, middleName;

    if (names.length > 2) [firstName, middleName, lastName] = names;
    else[firstName, lastName] = names;

    return {
      firstName,
      lastName,
      middleName,
      length: names.length
    };
  },

  cookieStoreValueGetter: (key: string) => {
    return <T extends Record<string, any>>(state: T) => {
      if (typeof state === 'string') {
        const storeData = JSON.parse(state || '{}').value;
        return storeData && storeData[key];
      } else {
        state && state[key];
      }
    }
  },

  removeFields<T extends Record<string, any>, K extends keyof T>(obj: T, fieldsToRemove: K[]): Omit<T, K> {
    const result = { ...obj };

    fieldsToRemove.forEach((field) => {
      if (field in result) {
        delete result[field];
      }
    });

    return result as Omit<T, K>;
  },

  linkTo: (link: string, target = '_blank') => {
    window.location.href = link;
  },

  toObjectURL: (file: File | string): string => {
    if (typeof file === 'string') return file;
    return URL.createObjectURL(file);
  },


  isEmpty<T = any>(value: T, elementIsEmpty?: (element: T) => boolean): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return elementIsEmpty
        ? elementIsEmpty(value)
        : Object.keys(value).length === 0;
    }

    return false;
  },

  requestState: (d: ReturnType<typeof useRequestState> | any) => {
    const { state } = d;
    return state.value;
  },
  getRandomHexColor(exemptedColors: string[] = []): string {
    const letters = "0123456789ABCDEF";
    let color: string;
    do {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (exemptedColors.includes(color));

    return color;
  },
  generationOptions(options: string[]) {
    return options.map(option => ({ label: capitalize(option), value: option }))
  },
  findLargestArray<T>(arrays: T[][]): T[] | undefined {
    if (arrays.length === 0) return undefined;

    let largestArray = arrays[0];

    for (const array of arrays) {
      if (array.length > largestArray.length) {
        largestArray = array;
      }
    }

    return largestArray;
  },
  capitalize: capitalize,
  truncate(inputString: string, maxLength: number) {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength) + '...';
    }
    return inputString;
  },
  formatDate(isoString: string | Date): string {
    const date = new Date(isoString);
    const options: Record<string, any> = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  },
  timeAgo: useTimeAgo,
  formatCurrency(number: number, currencySymbol = "₦", decimalPlaces = 0) {
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid input. Please provide a valid number.');
    }

    const formattedNumber = number.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      style: 'currency',
      currency: 'NGN', // Set currency code as per your requirement (default is USD)
    });

    let result = formattedNumber;
    if (currencySymbol) {
      result = formattedNumber.replace('NGN', currencySymbol);
    }

    return result;
  },
  formatNumber(number: number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + ' million';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number.toString();
    }
  },
  getAverageColor(imageElement: HTMLImageElement, document: Document): number {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx!.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    let r = 0, g = 0, b = 0;
    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height).data;
    const pixelCount = imageData.length / 4; // 4 components (r, g, b, a) per pixel

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Calculate the perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness;
  },
  async delay(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
}