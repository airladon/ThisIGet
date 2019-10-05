import { Color, Colors, HSBToHSL, RGBToHEX } from './colors';

function roundNum(value, precision) {
  return Number(Math.round(value + 'e' + precision) + 'e-' + precision);
}

function round(valueOrArray, precision = 8) {
  let result;
  if (Array.isArray(valueOrArray)) {
    result = valueOrArray.map(elem => roundNum(elem, precision));
  } else {
    result = roundNum(valueOrArray, precision);
  }
  return result;
}


const palette = {
  blue: [0, 0, 0.5, 1],
  red: [0.5, 0, 0, 1],
  green: [0, 0.5, 0, 1],
  yellow: [0.8, 0.8, 0, 1],
};

const theme = {
  blue: ['blue', 'base'],
  darkBlue: ['blue', 'dark'],
  diagram: {
    red: ['red', 'base'],
    element: {
      green: ['green', 'base'],
    },
  },
};

describe('Color', () => {
  describe('Instantiation', () => {
    test('No Input', () => {
      const c = new Color();
      expect(c.rgb).toEqual([0, 0, 0, 1]);
    });
    test('redGreenBlue', () => {
      const c = new Color([26, 51, 77, 1]);
      const r = round(26 / 255);
      const g = round(51 / 255);
      const b = round(77 / 255);
      expect(c.redGreenBlue).toEqual([26, 51, 77, 1]);
      expect(c.red).toEqual(26);
      expect(c.green).toEqual(51);
      expect(c.blue).toEqual(77);
      expect(round(c.r)).toEqual(r);
      expect(round(c.g)).toEqual(g);
      expect(round(c.b)).toEqual(b);
      expect(c.rgb).toEqual([c.r, c.g, c.b, 1]);
      expect(c.hex).toBe('1a334d');
      expect(c.hexA).toBe('1a334dff');
      const [hsbH, hsbS, hsbB] = c.hsb;
      expect(round(hsbH, 0)).toBe(211);
      expect(round(hsbS, 2)).toBe(0.66);
      expect(round(hsbB, 2)).toBe(0.30);
      const [hslH, hslS, hslL] = c.hsl;
      const [hslH1, hslS1, hslL1] = round(HSBToHSL([hsbH, hsbS, hsbB]), 2);
      expect(round(hslH, 0)).toBe(round(hslH1, 0));
      expect(round(hslS, 2)).toBe(hslS1);
      expect(round(hslL, 2)).toBe(hslL1);
      expect(round(c.hue, 0)).toBe(211);
      expect(round(c.hsbSaturation, 2)).toBe(0.66);
      expect(round(c.brightness, 2)).toBe(0.3);
      expect(round(c.hslSaturation, 2)).toBe(hslS1);
      expect(round(c.luminance, 2)).toBe(hslL1);
    });
    test('hex', () => {
      const c = new Color('1a334dff');
      const r = round(26 / 255);
      const g = round(51 / 255);
      const b = round(77 / 255);
      expect(c.redGreenBlue).toEqual([26, 51, 77, 1]);
      expect(c.red).toEqual(26);
      expect(c.green).toEqual(51);
      expect(c.blue).toEqual(77);
      expect(round(c.r)).toEqual(r);
      expect(round(c.g)).toEqual(g);
      expect(round(c.b)).toEqual(b);
      expect(c.rgb).toEqual([c.r, c.g, c.b, 1]);
      expect(c.hex).toBe('1a334d');
      expect(c.hexA).toBe('1a334dff');
      const [hsbH, hsbS, hsbB] = c.hsb;
      expect(round(hsbH, 0)).toBe(211);
      expect(round(hsbS, 2)).toBe(0.66);
      expect(round(hsbB, 2)).toBe(0.30);
      const [hslH, hslS, hslL] = c.hsl;
      const [hslH1, hslS1, hslL1] = round(HSBToHSL([hsbH, hsbS, hsbB]), 2);
      expect(round(hslH, 0)).toBe(round(hslH1, 0));
      expect(round(hslS, 2)).toBe(hslS1);
      expect(round(hslL, 2)).toBe(hslL1);
      expect(round(c.hue, 0)).toBe(211);
      expect(round(c.hsbSaturation, 2)).toBe(0.66);
      expect(round(c.brightness, 2)).toBe(0.3);
      expect(round(c.hslSaturation, 2)).toBe(hslS1);
      expect(round(c.luminance, 2)).toBe(hslL1);
    });
    test('rgb', () => {
      const c = new Color([26 / 255, 51 / 255, 77 / 255]);
      const r = round(26 / 255);
      const g = round(51 / 255);
      const b = round(77 / 255);
      expect(c.redGreenBlue).toEqual([26, 51, 77, 1]);
      expect(c.red).toEqual(26);
      expect(c.green).toEqual(51);
      expect(c.blue).toEqual(77);
      expect(round(c.r)).toEqual(r);
      expect(round(c.g)).toEqual(g);
      expect(round(c.b)).toEqual(b);
      expect(c.rgb).toEqual([c.r, c.g, c.b, 1]);
      expect(c.hex).toBe('1a334d');
      expect(c.hexA).toBe('1a334dff');
      const [hsbH, hsbS, hsbB] = c.hsb;
      expect(round(hsbH, 0)).toBe(211);
      expect(round(hsbS, 2)).toBe(0.66);
      expect(round(hsbB, 2)).toBe(0.30);
      const [hslH, hslS, hslL] = c.hsl;
      const [hslH1, hslS1, hslL1] = round(HSBToHSL([hsbH, hsbS, hsbB]), 2);
      expect(round(hslH, 0)).toBe(round(hslH1, 0));
      expect(round(hslS, 2)).toBe(hslS1);
      expect(round(hslL, 2)).toBe(hslL1);
      expect(round(c.hue, 0)).toBe(211);
      expect(round(c.hsbSaturation, 2)).toBe(0.66);
      expect(round(c.brightness, 2)).toBe(0.3);
      expect(round(c.hslSaturation, 2)).toBe(hslS1);
      expect(round(c.luminance, 2)).toBe(hslL1);
    });
    test('Change Brightness', () => {
      const c = new Color([26, 51, 77, 1]);
      c.setBrightness(0.4);
      expect(c.redGreenBlue).toEqual([34, 68, 102, 1]);
      expect(c.brightness).toBe(0.4);
    });
    test('Change Saturation', () => {
      const c = new Color([26, 51, 77, 1]);
      c.setHsbSaturation(0.4);
      expect(c.redGreenBlue).toEqual([46, 61, 77, 1]);
      expect(round(c.brightness, 2)).toBe(0.3);
      expect(round(c.hsbSaturation, 2)).toBe(0.4);
    });
    test('Change Hue', () => {
      const c = new Color([26, 51, 77, 1]);
      c.setHue(100);
      expect(c.redGreenBlue).toEqual([43, 77, 26, 1]);
      expect(round(c.brightness, 2)).toBe(0.3);
      expect(round(c.hsbSaturation, 2)).toBe(0.66);
      expect(round(c.hue, 0)).toBe(100);
    });
    test('New Saturation', () => {
      const c1 = new Color([26, 51, 77, 1]);
      const c2 = c1.newHsbSaturation(0.4);
      expect(c2.redGreenBlue).toEqual([46, 61, 77, 1]);
      expect(round(c2.brightness, 2)).toBe(0.3);
      expect(round(c2.hsbSaturation, 2)).toBe(0.4);
    });
    test('New Hue', () => {
      const c1 = new Color([26, 51, 77, 1]);
      const c2 = c1.newHue(100);
      expect(c2.redGreenBlue).toEqual([43, 77, 26, 1]);
      expect(round(c2.brightness, 2)).toBe(0.3);
      expect(round(c2.hsbSaturation, 2)).toBe(0.66);
      expect(round(c2.hue, 0)).toBe(100);
    });
    test('New Brightness', () => {
      const c1 = new Color([26, 51, 77, 1]);
      const c2 = c1.newBrightness(0.4);
      expect(c2.redGreenBlue).toEqual([34, 68, 102, 1]);
      expect(c2.brightness).toBe(0.4);
    });
    test('Lighten', () => {
      const d = new Color('3cb878');
      d.lighten(0.30);
      expect(d.hex).toBe('aae3c6');
    });
    test('Darken', () => {
      const d = new Color('3cb878');
      d.darken(0.30);
      expect(d.hex).toBe('16452d');
    });
  });
  // Blue is:
  //  0, 0, 0.5
  //  000080
  //  0, 0, 128
  //  HSL: 240, 0, 25%
  //
  //  L: 15% = 00004d
  //  L: 45% = 000036
  //  L: 5% = 000019
  //  L: 40% = 0000cc
  describe('Colors', () => {
    test('Instantiation', () => {
      const colors = new Colors(palette, theme);
      expect(colors).not.toBe(null);
    });
    test('Get first level', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('blue');
      expect(color.rgb).toEqual(palette.blue);
    });
    test('Get first level with dark shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('blue', 'dark');
      expect(color.hex).toEqual('00004d');
    });
    test('Get first level with lighter shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('blue', 'lighter');
      expect(color.hex).toEqual('0000e6');
    });
    test('Get first level with double shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('darkBlue', 'dark');
      expect(color.hex).toEqual('000019');
    });
    test('Get first level with custom shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('blue', 0.15);
      expect(color.hex).toEqual('0000cc');
    });
  });
  describe('RGB to Hex', () => {
    test('With zeros', () => {
      const hex = RGBToHEX([0, 1, 0]);
      expect(hex).toBe('00ff00');
    });
    test('With alpha', () => {
      const hex = RGBToHEX([0, 1, 0, 0.5]);
      expect(hex).toBe('00ff0080');
    });
  });
  // test('Instantiation', () => {
  //   const colors = new Colors(palette);
  //   expect(colors.get('blue')).toEqual(palette.blue);
  // });
  // test('Darker', () => {
  //   const colors = new Colors(palette);
  //   expect(colors.get('blue', 'light')).toEqual([0.1, 0.1, 0.6, 1]);
  // });
});
