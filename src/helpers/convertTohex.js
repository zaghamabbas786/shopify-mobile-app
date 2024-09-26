export const hsbToHex = ({hue: h, saturation: s, brightness: b}) => {
  // Normalize inputs
  h = (h % 360) / 360;
  s = Math.min(1, Math.max(0, s));
  b = Math.min(1, Math.max(0, b));

  let r, g, bl;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = b * (1 - s);
  let q = b * (1 - s * f);
  let t = b * (1 - s * (1 - f));

  switch (i) {
    case 0:
      (r = b), (g = t), (bl = p);
      break;
    case 1:
      (r = q), (g = b), (bl = p);
      break;
    case 2:
      (r = p), (g = b), (bl = t);
      break;
    case 3:
      (r = p), (g = q), (bl = b);
      break;
    case 4:
      (r = t), (g = p), (bl = b);
      break;
    case 5:
      (r = b), (g = p), (bl = q);
      break;
  }

  const toHex = x => {
    const hex = Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
    return hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
};
