import { grid_pixel } from "./options";

export const toTime = (pixel) => pixel / grid_pixel;

export const toPixel = (time) => time * grid_pixel;

export const toMillis = (seconds) => seconds * 1_000;
