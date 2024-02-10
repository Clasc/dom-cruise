export type Pixel<TVal extends number | string> = `${TVal}px`;
export const pixel: <TVal extends string | number>(val: TVal) => Pixel<TVal> = (val) => `${val}px`;
