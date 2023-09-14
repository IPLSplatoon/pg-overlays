import { assetPaths } from './replicants.js';

export function getStageImagePath(stageName) {
    const path = assetPaths.value.stageImages[stageName];
    return path == null ? './assets/unknown-stage.png' : path;
}
