// @flow

// From https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
function HSLToRGB(hsl: Array<number>) {
  let [hue, saturation, luminance, opacity] = hsl;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (luminance < 0) { luminance = 0; }
  if (luminance > 1) { luminance = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const C = (1 - Math.abs(2 * luminance - 1)) * saturation;
  const H = hue / 60;
  const X = C * (1 - Math.abs(H % 2 - 1));
  let RGB1 = [0, 0, 0];
  if (H <= 1) {
    RGB1 = [C, X, 0];
  } else if (H <= 2) {
    RGB1 = [X, C, 0];
  } else if (H <= 3) {
    RGB1 = [0, C, X];
  } else if (H <= 4) {
    RGB1 = [0, X, C];
  } else if (H <= 5) {
    RGB1 = [X, 0, C];
  } else if (H <= 6) {
    RGB1 = [C, 0, X];
  }
  const m = luminance - C / 2;
  if (opacity != null) {
    return [RGB1[0] + m, RGB1[1] + m, RGB1[2] + m, opacity];
  }
  return [RGB1[0] + m, RGB1[1] + m, RGB1[2] + m];
}

// From https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
function HSBToRGB(hsb: Array<number>) {
  let [hue, saturation, brightness, opacity] = hsb;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (brightness < 0) { brightness = 0; }
  if (brightness > 1) { brightness = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const C = saturation * brightness;
  const H = hue / 60;
  const X = C * (1 - Math.abs(H % 2 - 1));
  let RGB1 = [0, 0, 0];
  if (H <= 1) {
    RGB1 = [C, X, 0];
  } else if (H <= 2) {
    RGB1 = [X, C, 0];
  } else if (H <= 3) {
    RGB1 = [0, C, X];
  } else if (H <= 4) {
    RGB1 = [0, X, C];
  } else if (H <= 5) {
    RGB1 = [X, 0, C];
  } else if (H <= 6) {
    RGB1 = [C, 0, X];
  }
  const m = brightness - C;
  if (opacity != null) {
    return [RGB1[0] + m, RGB1[1] + m, RGB1[2] + m, opacity];
  }
  return [RGB1[0] + m, RGB1[1] + m, RGB1[2] + m];
}

function HSBToHSL(hsb: Array<number>) {
  let [hue, saturation, brightness, opacity] = hsb;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (brightness < 0) { brightness = 0; }
  if (brightness > 1) { brightness = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const L = brightness - brightness * saturation / 2;
  let S = 0;
  if (L !== 0 || L !== 1) {
    S = (brightness - L) / Math.min(L, 1 - L);
  }
  if (opacity != null) {
    return [hue, S, L, opacity];
  }
  return [hue, S, L];
}

function HSLToHSB(hsl: Array<number>) {
  let [hue, saturation, luminance, opacity] = hsl;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (luminance < 0) { luminance = 0; }
  if (luminance > 1) { luminance = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const V = luminance + saturation * Math.min(luminance, 1 - luminance);
  let S = 0;
  if (V !== 0) {
    S = 2 - 2 * luminance / V;
  }
  if (opacity != null) {
    return [hue, S, V, opacity];
  }
  return [hue, S, V];
}

function RGBToHSL(rgb: Array<number>) {
  let [r, g, b, opacity] = rgb;
  if (r < 0) { r = 0; }
  if (r > 1) { r = 1; }
  if (b < 0) { b = 0; }
  if (b > 1) { b = 1; }
  if (g < 0) { g = 0; }
  if (g > 1) { g = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let H = 0;
  if (max !== min) {
    if (r === max) {
      H = (g - b) / (max - min);
    } else if (g === max) {
      H = 2.0 + (b - r) / (max - min);
    } else {
      H = 4.0 + (r - g) / (max - min);
    }
  }
  H *= 60;
  const L = (max + min) / 2;
  let S = 0;
  if (max !== 0 && min !== 1) {
    S = (max - min) / (1 - Math.abs(max + min - 1));
  }
  if (opacity != null) {
    return [H, S, L, opacity];
  }
  return [H, S, L];
}

function RGBToHSB(rgb: Array<number>) {
  let [r, g, b, opacity] = rgb;
  if (r < 0) { r = 0; }
  if (r > 1) { r = 1; }
  if (b < 0) { b = 0; }
  if (b > 1) { b = 1; }
  if (g < 0) { g = 0; }
  if (g > 1) { g = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let H = 0;
  if (max !== min) {
    if (r === max) {
      H = (g - b) / (max - min);
    } else if (g === max) {
      H = 2.0 + (b - r) / (max - min);
    } else {
      H = 4.0 + (r - g) / (max - min);
    }
  }
  H *= 60;
  const V = max;
  const S = max === 0 ? 0 : (max - min) / max;
  if (opacity != null) {
    return [H, S, V, opacity];
  }
  return [H, S, V];
}

function HEXToRGB(col: string) {
  let colHex = col.slice().replace('#', '');
  if (colHex.length === 3) {
    colHex =
      `${colHex[0]}${colHex[0]}${colHex[1]}${colHex[1]}${colHex[2]}${colHex[2]}`;
  } else if (colHex.length === 4) {
    colHex =
      `${colHex[0]}${colHex[0]}${colHex[1]}${colHex[1]}${colHex[2]}${colHex[2]}${colHex[3]}${colHex[3]}`;
  }
  const rgb = [
    parseInt(colHex.slice(0, 2), 16) / 255.0,
    parseInt(colHex.slice(2, 4), 16) / 255.0,
    parseInt(colHex.slice(4, 6), 16) / 255.0,
  ];
  if (colHex.length === 8) {
    rgb.push(parseInt(colHex.slice(6, 8), 16) / 255);
  }
  return rgb;
}

function toHex(num: number, width: number = 2) {
  let hex = num.toString(16);
  for (let i = 0; i < width - hex.length; i += 1) {
    hex = `0${hex}`;
  }
  return hex;
}

function RGBToHEX(rgb: Array<number>) {
  // const [red, green, blue, opacity] = rgb;
  let [r, g, b, opacity] = rgb;
  if (r < 0) { r = 0; }
  if (r > 1) { r = 1; }
  if (b < 0) { b = 0; }
  if (b > 1) { b = 1; }
  if (g < 0) { g = 0; }
  if (g > 1) { g = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
  }
  const rHex = toHex(Math.round((r * 255)));
  const gHex = toHex(Math.round((g * 255)));
  const bHex = toHex(Math.round((b * 255)));
  let hexRGB = `${rHex}${gHex}${bHex}`;
  if (opacity != null) {
    hexRGB = `${hexRGB}${toHex(Math.round((opacity * 255)))}`;
  }
  return hexRGB;
}

type TypeInputColor = string | Array<number>;

const shades = {
  hover: -0.1,
  dark: -0.1,
  darker: -0.2,
  darkest: -0.45,
  light: 0.1,
  lighter: 0.20,
  lightest: 0.45,
  base: 0,
};

function getShade(shade: ?number | string) {
  if (shade == null) {
    return 0;
  }
  if (typeof shade === 'number') {
    return shade;
  }
  if (shades[shade] != null) {
    return shades[shade];
  }
  return 0;
}

class Color {
  // value: Array<number>;
  red: number;                // [0, 255]
  green: number;              // [0, 255]
  blue: number;               // [0, 255]
  hue: number;                // [0, 1]
  hslSaturation: number;      // [0, 1]
  hsbSaturation: number;      // [0, 1]
  brightness: number;         // [0, 1]
  luminance: number;          // [0, 1]
  r: number;                  // [0, 1]
  g: number;                  // [0, 1]
  b: number;                  // [0, 1]

  hex: string;                    // 6 char string
  hexA: string;                   // 8 char string with alpha
  redGreenBlue: Array<number>;    // [0, 255]
  hsl: Array<number>;             // [0, 1]
  rgb: Array<number>;             // [0, 1]
  hsb: Array<number>;             // [0, 1]

  opacity: number;

  shadePresets: {
    [shadeName: string]: Color;
  };

  constructor(
    c: TypeInputColor = [0, 0, 0, 1],
    shadePresets: {
      [shadeName: string]: string | Color,
    } = {},
  ) {
    this.opacity = 1;
    if (typeof c === 'string') {
      this.setHex(c);
    } else if (Math.max(...c) > 1) {
      this.setRedGreenBlue(c);
    } else {
      this.setRGB(c);
    }
    this.shadePresets = {};
    Object.keys(shadePresets).forEach((preset) => {
      const shadePreset = shadePresets[preset];
      if (typeof shadePreset === 'string') {
        this.shadePresets[preset] = new Color(shadePreset);
      } else {
        this.shadePresets[preset] = shadePreset;
      }
    });
    // console.log(this.shadePresets)
  }

  setRGB(rgb: Array<number>) {
    const [r, g, b, o] = rgb;
    this.red = Math.round(r * 255);
    this.green = Math.round(g * 255);
    this.blue = Math.round(b * 255);
    if (o != null) {
      this.opacity = o;
    }
    this.redGreenBlue = [this.red, this.green, this.blue, this.opacity];
    this.rgb = [r, g, b, this.opacity];
    this.r = r;
    this.g = g;
    this.b = b;
    this.hsl = RGBToHSL(this.rgb);
    const [h, sHSL, luminance] = this.hsl;
    this.hue = h;
    this.hslSaturation = sHSL;
    this.luminance = luminance;
    this.hsb = RGBToHSB(this.rgb);
    const [, sHSB, brightness] = this.hsb;
    this.hsbSaturation = sHSB;
    this.brightness = brightness;
    this.hex = RGBToHEX(this.rgb.slice(0, 3));
    this.hexA = RGBToHEX(this.rgb);
  }

  setHSB(hsb: Array<number>) {
    this.setRGB(HSBToRGB(hsb));
  }

  setHSL(hsl: Array<number>) {
    this.setRGB(HSLToRGB(hsl));
  }

  setHex(hex: string) {
    this.setRGB(HEXToRGB(hex));
  }

  setRedGreenBlue(redGreenBlue: Array<number>) {
    const [r, g, b] = redGreenBlue;
    this.setRGB([r / 255, g / 255, b / 255]);
  }

  setBrightness(brightness: number) {
    this.setHSB([this.hue, this.hsbSaturation, brightness]);
  }

  setHue(hue: number) {
    this.setHSB([hue, this.hsbSaturation, this.brightness]);
  }

  setLuminance(luminance: number) {
    this.setHSL([this.hue, this.hslSaturation, luminance]);
  }

  setHsbSaturation(saturation: number) {
    this.setHSB([this.hue, saturation, this.brightness]);
  }

  newBrightness(brightness: number) {
    return new Color(
      HSBToRGB([this.hue, this.hsbSaturation, brightness, this.opacity]),
      // $FlowFixMe
      this.shadePresets,
    );
  }

  newHsbSaturation(hsbSaturation: number) {
    return new Color(
      HSBToRGB([this.hue, hsbSaturation, this.brightness, this.opacity]),
      // $FlowFixMe
      this.shadePresets,
    );
  }

  newHue(hue: number) {
    return new Color(
      HSBToRGB([hue, this.hsbSaturation, this.brightness, this.opacity]),
      // $FlowFixMe
      this.shadePresets,
    );
  }

  shade(delta: number | string) {
    if (typeof delta === 'string') {
      if (this.shadePresets[delta] != null) {
        this.setRGB(this.shadePresets[delta].rgb);
      } else {
        this.setLuminance(this.luminance + getShade(delta));
      }
    } else {
      this.setLuminance(this.luminance + delta);
    }
    return this;
  }

  // This is the same as lighter in sass
  lighten(delta: number | string) {
    this.shade(delta);
    return this;
  }

  // This is the same as lighter in sass
  darken(delta: number | string) {
    if (typeof delta === 'number') {
      this.shade(-delta);
    } else {
      this.shade(delta);
    }
    return this;
  }

  _dup() {
    return new Color(this.rgb, this.shadePresets);
  }

  toCssVar(varName: string) {
    const doc = document.documentElement;
    if (doc != null) {
      doc.style.setProperty(varName, `#${this.hex}`);
    }
  }
}


const palettes = {
  pastel: {
    blue: '89A2E8',
    red: 'FFA9A7',
    green: 'ABFF9A',
    yellow: 'E8DD8A',
    cyan: '9AFFEA',
    brown: 'DEC28B',
    orange: 'E8B382',
    violet: 'D882E8',
    grey: '727F8C',
    white: {
      base: 'FFF',
      lightest: 'EEE',
      lighter: 'DDD',
      light: 'CCC',
      dark: 'BBB',
      darker: 'AAA',
      darkest: '999',
    },
    offWhite: 'FAFAFA',
    black: {
      base: '000',
      lightest: '666',
      lighter: '555',
      light: '444',
      dark: '333',
      darker: '222',
      darkest: '111',
    },
    logo: '0070EB',
    logoDark: '0067D6',
  },
  standard: {
    blue: '1CA4FC',
    red: 'EB261F',
    yellow: 'FAE047',
    green: '65D643',
    cyan: '2FE6CF',
    brown: 'D47A2B',
    orange: 'FFA500',
    violet: 'AE19D4',
    grey: '929292',
    white: {
      base: 'FFF',
      lightest: 'EEE',
      lighter: 'DDD',
      light: 'CCC',
      dark: 'BBB',
      darker: 'AAA',
      darkest: '999',
    },
    offWhite: 'FAFAFA',
    black: {
      base: '000',
      lightest: '666',
      lighter: '555',
      light: '444',
      dark: '333',
      darker: '222',
      darkest: '111',
    },
    logo: '0070EB',
    logoDark: '0067D6',
  },
};

const themes = {
  standard: {
    blue: ['blue'],
    red: ['red'],
    green: ['green'],
    yellow: ['yellow'],
    cyan: ['cyan'],
    brown: ['brown'],
    orange: ['orange'],
    violet: ['violet'],
    grey: ['grey'],
    white: ['white'],
    black: ['black'],
    diagram: {
      background: ['black', 'base'],
      primary: ['blue', 'base'],
      warning: ['red', 'base'],
      safe: ['green', 'base'],
      passive: ['yellow', 'base'],
      construction1: ['yellow', 'base'],
      construction2: ['orange', 'base'],
      construction3: ['grey', 'base'],
      construction4: ['violet', 'base'],
      construction5: ['brown', 'base'],
      construction6: ['blue', 'base'],
      construction7: ['cyan', 'base'],
      construction8: ['green', 'base'],
      construction9: ['red', 'base'],
      disabled: ['black', 'light'],
      disabledDark: ['grey', 'dark'],
      disabledDarker: ['grey', 'darker'],
      disabledDarkest: ['grey', 'darkest'],
      push: ['red', 'base'],
      action: ['cyan', 'base'],
      text: {
        base: ['yellow', 'lighter'],
        warning: ['red', 'lighter'],
        plot: ['blue', 'light'],
        keyword: ['blue', 'light'],
        keyword2: ['green', 'light'],
        latin: ['cyan', 'light'],
        oldFrench: ['violet', 'light'],
        sanskrit: ['orange', 'light'],
        arabic: ['violet', 'light'],
        greek: ['green', 'light'],
        english: ['blue', 'light'],
        definition: ['grey', 'base'],
        note: ['grey', 'light'],
        //
        heading: ['grey', 'base'],
      },
      quizCheck: ['violet', 'base'],
      equation: {
        border: ['black', 'dark'],
      },
      qr: {
        background: ['black', 'darker'],
        corners: ['grey', 'base'],
        text: ['grey', 'light'],
      },
    },
    presentation: {
      background: ['white', 'base'],
      button: ['white', 'darkest'],
      disabled: ['white', 'lighter'],
      hover: ['grey', 'lighter'],
      hoverBackground: ['white', 'base'],
      text: ['grey', 'base'],
    },
    lesson: {
      background: ['grey', 'dark'],
      text: {
        title: ['blue', 'dark'],
      },
      title: {
        background: ['offWhite', 'base'],
      },
      // text: ['grey', 'lighter'],
      navigation: ['grey', 'base'],
      button: ['grey', 'base'],
      // button: {
      //   highlight: ['grey', 'darker'],
      // },
    },
    site: {
      primary: ['logo', 'base'],
      primaryDark: ['logoDark', 'base'],
      logoText: ['white', 'base'],
      warning: ['red', 'base'],
      secondary: ['blue', 'light'],
      text: ['grey', 'darker'],
      h1: ['grey', 'darkest'],
      background: ['offWhite', 'base'],
      fill: ['offWhite', 'dark'],
      disabled: ['grey', 'base'],
      safe: ['green', 'base'],
      menus: {
        background: ['grey', 'darker'],
        text: ['white', 'light'],
        textHover: ['white', 'base'],
      },
      button: {
        text: ['black', 'lighter'],
        border: ['white', 'darker'],
        hoverBackground: ['white', 'lighter'],
        highlight: {
          text: ['white'],
          background: ['logo', 'base'],
          hoverBackground: ['logo', 'light'],
        },
      },
      table: {
        border: ['white', 'light'],
      },
    },
    navbar: {
      // text: ['white', 'lighter'],
      text: {
        hover: ['white', 'base'],
        input: ['grey', 'lighter'],
      },
      background: ['grey', 'darker'],
    },
  },
};

type TypeThemeLevel = {
  [semanticName: string]: [string] | [string, string] | TypeThemeLevel;
};

type TypePaletteColor = {
  [colorName: string]: Color;
};

type TypePaletteDefinition = {
  [colorName: string]: string | Array<number>;
};

// Singleton class that contains projects global variables
class Colors {
  static instance: Object;
  palette: {
    [colorName: string]: Color;
  };

  theme: TypeThemeLevel;

  // families: {
  //   [familyName: string]: {
  //     [colorName: string]: Array<number>;
  //   };
  // };

  constructor(
    paletteColors: TypePaletteColor | TypePaletteDefinition | string = 'standard',
    theme: string | TypeThemeLevel = 'standard',
  ) {
    // If the instance alread exists, then don't create a new instance.
    // If it doesn't, then setup some default values.
    if (!Colors.instance) {
      Colors.instance = this;
      this.setTheme(theme);
      // this.theme = themes[theme];
      // this.palette = paletteColors;
      this.setPalette(paletteColors);
      this.fix();
      const diagramTextBase = this.get('diagram', 'text', 'base');
      // console.log('loading colors')
      diagramTextBase.toCssVar('--color-diagram-text');
      this.get('site', 'background').toCssVar('--color-site-background');
      this.get('site', 'fill').toCssVar('--color-site-fill');
      this.get('site', 'text').toCssVar('--color-site-text');
      this.get('site', 'disabled').toCssVar('--color-site-disabled');
      this.get('site', 'h1').toCssVar('--color-site-h1');
      this.get('site', 'primary').toCssVar('--color-site-primary');
      this.get('site', 'primaryDark').toCssVar('--color-site-primary-dark');
      this.get('site', 'warning').toCssVar('--color-site-warning');
      this.get('site', 'logoText').toCssVar('--color-site-logo-text');

      // Buttons
      this.get('site', 'button', 'text').toCssVar('--color-site-button-text');
      this.get('site', 'button', 'hoverBackground')
        .toCssVar('--color-site-button-hover-background');
      this.get('site', 'button', 'border').toCssVar('--color-site-button-border');
      this.get('site', 'button', 'highlight', 'text')
        .toCssVar('--color-site-button-highlight-text');
      this.get('site', 'button', 'highlight', 'background')
        .toCssVar('--color-site-button-highlight-background');
      this.get('site', 'button', 'highlight', 'hoverBackground')
        .toCssVar('--color-site-button-highlight-hover-background');

      // Menus
      this.get('site', 'menus', 'text').toCssVar('--color-site-menus-text');
      this.get('site', 'menus', 'textHover')
        .toCssVar('--color-site-menus-text-hover');
      this.get('site', 'menus', 'background')
        .toCssVar('--color-site-menus-background');

      this.get('site', 'table', 'border').toCssVar('--color-site-table-border');
    }
    return Colors.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  rgbToCssVar(rgb: Array<number>, name: string) {
    const c = new Color(rgb);
    const doc = document.documentElement;
    if (doc != null) {
      doc.style.setProperty(name, `#${c.hex}`);
    }
  }

  setPalette(
    palette: TypePaletteColor | TypePaletteDefinition | string = 'standard',
  ) {
    this.palette = {};
    let paletteColors = {};
    if (typeof palette === 'string') {
      if (palettes[palette]) {
        paletteColors = palettes[palette];
      }
    } else {
      paletteColors = palette;
    }
    Object.keys(paletteColors).forEach((colorName) => {
      const col = paletteColors[colorName];
      if (typeof col === 'string' || Array.isArray(col)) {
        this.palette[colorName] = new Color(col);
      } else if (col instanceof Color) {
        this.palette[colorName] = col._dup();
      } else if (col.base != null) {
        this.palette[colorName] = new Color(col.base, col);
      }
    });
  }

  setTheme(theme: TypeThemeLevel | string) {
    if (typeof theme === 'string') {
      if (themes[theme] != null) {
        this.theme = themes[theme];
      }
    } else {
      this.theme = theme;
    }
  }

  getThemeElement(themePath: Array<string | number> | string) {
    let pathArray = [];
    if (typeof themePath === 'string') {
      pathArray = [themePath];
    } else {
      pathArray = themePath;
    }
    let path = [];
    pathArray.forEach((element) => {
      if (typeof element === 'string') {
        path = [...path, ...element.split('/')];
      } else {
        path = [...path, element];
      }
    });
    let depth = 0;
    const getValueFromTree = (remainingTree, treePath) => {
      if (typeof treePath[0] === 'number') {
        return null;
      }
      const value = remainingTree[treePath[0]];
      if (value == null) {
        return null;
      }
      depth += 1;
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === 'string') {
        return [value];
      }
      return getValueFromTree(value, treePath.slice(1));
    };

    const colorDefinition = getValueFromTree(this.theme, path) || ['black'];
    let shade = 0;
    if (depth < path.length) {
      shade = path[depth];
    }

    return [colorDefinition, shade];
  }

  // get('diagram', 'text', 'base', 'light')
  // get('diagram/text/base', 'light')
  // get('diagram/text/base', 0.1)
  get(...inputNames: Array<string | number>) {
    const [colorDefinition, finalShade] = this.getThemeElement(inputNames);
    const [colorName, shade] = colorDefinition;
    if (this.palette[colorName] == null) {
      return new Color();
    }
    const col = this.palette[colorName]._dup().shade(shade || 0);
    return col.lighten(finalShade);
  }

  static lighten(inputColor: TypeInputColor, shade: string | number) {
    const col = new Color(inputColor);
    return col.lighten(shade);
  }

  fix() {
    const addColor = (parents, color) => {
      let level = this;
      for (let i = 0; i < parents.length; i += 1) {
        const nextLevelName = parents[i];       // $FlowFixMe
        if (level[nextLevelName] == null) {     // $FlowFixMe
          level[nextLevelName] = {};
        }
        if (i === parents.length - 1) {         // $FlowFixMe
          level[nextLevelName] = color;
        } else {                                // $FlowFixMe
          level = level[nextLevelName];
        }
      }
    };
    const processLevel = (level, parents) => {
      Object.keys(level).forEach((key) => {
        const colorOrNextLevel = level[key];
        if (Array.isArray(colorOrNextLevel) || typeof colorOrNextLevel === 'string') {
          const col = this.get(...[...parents, key]);
          addColor([...parents, key], col.rgb);
        } else {
          processLevel(colorOrNextLevel, [...parents, key]);
        }
      });
    };
    processLevel(this.theme, []);
  }
}

function loadColors() {
  return new Colors();
}

export {
  Color, Colors, HSBToHSL, HSLToHSB, RGBToHEX, HEXToRGB,
  HSBToRGB, HSLToRGB, RGBToHSL, RGBToHSB, loadColors,
};
