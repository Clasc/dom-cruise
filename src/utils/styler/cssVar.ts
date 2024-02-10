export type StyleProp = { [key: string]: string | number };

export const cssVar = <TVars extends StyleProp>(style: TVars) => {
  const result: StyleProp = {};
  for (const key in style) {
    if (!Object.prototype.hasOwnProperty(key)) {
      result[`--${key}`] = style[key];
    }
  }

  return result as {[Property in keyof TVars as `--${string & Property}`]: TVars[Property]};
};

