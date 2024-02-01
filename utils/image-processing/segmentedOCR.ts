import { createWorker } from "tesseract.js";
const scanCaptcha = async (imagePaths: string[]) => {
  const worker = await createWorker("eng", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });
  await worker.setParameters({
    tessedit_char_whitelist: "0123456789",
  });
  let finaltxt = "";
  for (const p of imagePaths) {
    const {
      data: { text },
    } = await worker.recognize(p);
    // console.log(p, " :: ", text);
    finaltxt += text;
  }
  await worker.terminate();
  return finaltxt.replace(/[^0-9]/g, "");
};

export default scanCaptcha;
