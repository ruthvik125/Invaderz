//This file is used to download the glitch cdns and sprites into our local folder
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const assets = [
  { name: 'avatarA', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FInvaderA_00%402x.png?v=1589228669385' },
  { name: 'avatarB', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FInvaderB_00%402x.png?v=1589228660870' },
  { name: 'avatarC', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FInvaderC_00%402x.png?v=1589228654058' },
  { name: 'avatarAgreen', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderAgreen.png?v=1589839188589' },
  { name: 'avatarAcyan', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderAcyan.png?v=1589839190850' },
  { name: 'avatarAyellow', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderAyellow.png?v=1589839197191' },
  { name: 'avatarBgreen', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderBgreen.png?v=1589839187283' },
  { name: 'avatarBcyan', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderBcyan.png?v=1589839193162' },
  { name: 'avatarByellow', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderByellow.png?v=1589839195096' },
  { name: 'avatarCgreen', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderCgreen.png?v=1589839203129' },
  { name: 'avatarCcyan', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderCcyan.png?v=1589839200959' },
  { name: 'avatarCyellow', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FinvaderCyellow.png?v=1589839198988' },
  { name: 'ship', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2FShip%402x.png?v=1589228730678' },
  { name: 'bullet', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2Fbullet.png?v=1589229887570' },
  { name: 'explosion', url: 'https://cdn.glitch.com/f66772e3-bbf6-4f6d-b5d5-94559e3c1c6f%2Fexplosion57%20(2).png?v=1589491279459' }
];

const downloadAsset = async (asset) => {
  const { name, url } = asset;
  const response = await axios({
    url,
    responseType: 'stream'
  });
  const filePath = path.resolve(__dirname, 'assets', `${name}.png`);
  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const downloadAssets = async () => {
  await fs.ensureDir(path.resolve(__dirname, 'assets'));
  for (const asset of assets) {
    await downloadAsset(asset);
  }
};

downloadAssets()
  .then(() => console.log('All assets downloaded'))
  .catch(err => console.error('Error downloading assets:', err));
