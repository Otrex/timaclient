
export default {
  monitor: () => {
    const requestsStore = useRequestsStore();
    let stopRequest: () => void;
    return {
      $start() {
        stopRequest = requestsStore.startRequest()
      },
      $stop() {
        stopRequest && stopRequest();
      }
    }
  },
  json: {
    encode: (value: any) => {
      return JSON.stringify({ value });
    },
    parse: <T = unknown>(value: string | null) => {
      return JSON.parse(value || '{}').value as T;
    }
  },
  generationOptions(options: string[]) {
    return options.map(option => ({ label: option, value: option }))
  },
  capitalize(str: string) {
    return str.split('').map((s, i) => i === 0 ? s.toUpperCase() : s).join('')
  },
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
  formatCurrency(number: number, currencySymbol = "₦", decimalPlaces = 0) {
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid input. Please provide a valid number.');
    }

    const formattedNumber = number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'NGN', // Set currency code as per your requirement (default is USD)
      minimumFractionDigits: decimalPlaces,
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
  }
}