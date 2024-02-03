import Jimp from "jimp";

const FilterImage = async (buffer: Buffer, rootImgPath: string) => {
  let img = await Jimp.read(buffer);
  img = img.contrast(1);
  img = img.grayscale();
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
    if (img.bitmap.data[idx] < 210) {
      img.bitmap.data[idx] = 255;
      img.bitmap.data[idx + 1] = 255;
      img.bitmap.data[idx + 2] = 255;
    } else {
      img.bitmap.data[idx] = 0;
      img.bitmap.data[idx + 1] = 0;
      img.bitmap.data[idx + 2] = 0;
    }
  });
  img.write(`${rootImgPath}/mod.png`);
  const { width, height } = img.bitmap;

  const segmentWidth = width / 4;

  let imgFile = [];
  for (let i = 0; i < 4; i++) {
    const startX = i * segmentWidth;
    const segment = img.clone().crop(startX, 0, segmentWidth, height);

    imgFile.push(`${rootImgPath}seg${i + 1}.png`);
    segment.write(imgFile[i]);
  }
  return imgFile;
};

export default FilterImage;
