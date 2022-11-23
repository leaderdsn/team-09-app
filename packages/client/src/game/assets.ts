import settings from './settings';

const ASSET_NAMES = [
  'background.jpg',
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName: string) {
  return new Promise<void>(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      // @ts-ignore
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `${settings.SERVER_URL}/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

// @ts-ignore
export const getAsset = (assetName: string) => assets[assetName];