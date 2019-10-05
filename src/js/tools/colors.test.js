import {
  Color, Colors, HSBToHSL, RGBToHEX,
} from './colors';

function roundNum(value, precision) {
  if (value < 10 ** (-precision - 2)) {
    return 0;
  }
  // eslint-disable-next-line prefer-template
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
  black: {
    base: '000',
    lightest: '666',
    lighter: '555',
    light: '444',
    dark: '333',
    darker: '222',
    darkest: '111',
  },
};

const theme = {
  blue: ['blue', 'base'],
  darkBlue: ['blue', 'dark'],
  black: ['black', 'base'],
  diagram: {
    red: ['red', 'base'],
    element: {
      green: ['green', 'light'],
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
  //  HSL: 240, 100%, 25%
  //
  //  L: 15% = 00004d
  //  L: 45% = 0000e6
  //  L: 5% = 000019
  //  L: 40% = 0000cc
  //
  // Red is:
  //  0.5, 0, 0
  //  800000
  //  HSL: 0, 100%, 25%
  //
  //  L: 35% = b30000
  //
  // Light Green is:
  //  00b300
  //  HSL: 120, 100%, 35%
  //
  //  L: 45% = 00e600
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
    test('Get first level with numerical shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('blue', 0.15);
      expect(color.hex).toEqual('0000cc');
    });
    test('Get second level', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'red');
      expect(color.hex).toEqual('800000');
    });
    test('Get second level with shade mode', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'red', 'light');
      expect(color.hex).toEqual('b30000');
    });
    test('Get second level with numerical shade mode', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'red', 0.10);
      expect(color.hex).toEqual('b30000');
    });
    test('Get third level', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'element', 'green');
      expect(color.hex).toEqual('00b300');
    });
    test('Get third level with shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'element', 'green', 'light');
      expect(color.hex).toEqual('00e600');
    });
    test('Get third level with numerical shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram', 'element', 'green', 0.1);
      expect(color.hex).toEqual('00e600');
    });
    test('Get third level with slash form', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram/element/green');
      expect(color.hex).toEqual('00b300');
    });
    test('Get third level with slash form and shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram/element/green', 'light');
      expect(color.hex).toEqual('00e600');
    });
    test('Get third level with slash form and numerical shade', () => {
      const colors = new Colors(palette, theme);
      const color = colors.get('diagram/element/green', 0.1);
      expect(color.hex).toEqual('00e600');
    });
    test('static lighten', () => {
      const c = Colors.lighten('000080', 'lighter').hex;
      expect(c).toBe('0000e6');
    });
    test('static lighten numeric', () => {
      const c = Colors.lighten('000080', 0.2).hex;
      expect(c).toBe('0000e6');
    });
    test('fix', () => {
      const c = new Colors(palette, theme);
      c.fix();
      expect(c.blue).toEqual(palette.blue);
      expect(round(c.darkBlue, 2)).toEqual([0, 0, round(parseInt(0x4d, 10) / 255, 2), 1]);
      expect(round(c.diagram.red, 2)).toEqual(palette.red);
      expect(round(c.diagram.element.green, 2))
        .toEqual([0, round(parseInt(0xb3, 10) / 255, 2), 0, 1]);
    });
    test.only('Custom shades in palette', () => {
      const c = new Colors(palette, theme);
      const b1 = c.get('black');
      expect(b1.hex).toBe('000000');
      b1.shade('light');
      expect(b1.hex).toBe('444444');
      b1.shade('lighter');
      expect(b1.hex).toBe('555555');
      b1.shade('dark');
      expect(b1.hex).toBe('333333');
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
});
