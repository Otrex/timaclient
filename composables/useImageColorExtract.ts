export default function () {
  function getImageObjectUrl(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(tools.removeDuplicateURL(imageUrl))
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          const objectUrl = URL.createObjectURL(blob);
          resolve(objectUrl);
        })
        .catch(error => {
          console.log(error);

          reject(error);
        });
    });
  }

  async function getAverageColor(src: string): Promise<number> {
    const base64String = await getImageObjectUrl(src);
    return new Promise((resolve, reject) => {
      const imageElement = new Image();
      imageElement.src = base64String;
      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx!.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        let r = 0,
          g = 0,
          b = 0;
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height).data;
        const pixelCount = imageData.length / 4;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }

        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        resolve(brightness);
      }
    })
  }

  return {
    getAverageColor
  }
}
