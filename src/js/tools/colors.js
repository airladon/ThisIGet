// @flow

// function modifyColor(c: Array<number>, modifier: number | string = 0) {
//   let mod = 0;
//   if (typeof modifier === 'string') {
//     if (modifiers[modifier] != null) {
//       mod = modifiers[modifier];
//     }
//   } else {
//     mod = modifier;
//   }

//   return [
//     Math.max(Math.min(c[0] + mod, 1), 0),
//     Math.max(Math.min(c[1] + mod, 1), 0),
//     Math.max(Math.min(c[2] + mod, 1), 0),
//     c[3],
//   ];
// }

// function hexToArray(col: string): Array<number> {
//   let colHex: string = col.slice(1);
//   if (colHex.length < 6) {
//     colHex =
//       `${colHex[0]}${colHex[0]}${colHex[1]}${colHex[1]}${colHex[2]}${colHex[2]}`;
//   }
//   return [
//     parseInt(colHex.slice(0, 2), 16) / 255.0,
//     parseInt(colHex.slice(2, 4), 16) / 255.0,
//     parseInt(colHex.slice(4, 6), 16) / 255.0,
//     1,
//   ];
// }

// From https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
function HSLToRGB(hsl) {
  let [hue, saturation, luminance, opacity] = hsl;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (luminance < 0) { luminance = 0; }
  if (luminance > 1) { luminance = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 0) { opacity = 1; }
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
function HSBToRGB(hsb) {
  let [hue, saturation, brightness, opacity] = hsb;
  if (hue < 0) { hue += 360; }
  if (hue > 360) { hue -= 360; }
  if (saturation < 0) { saturation = 0; }
  if (saturation > 1) { saturation = 1; }
  if (brightness < 0) { brightness = 0; }
  if (brightness > 1) { brightness = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 0) { opacity = 1; }
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
    if (opacity > 0) { opacity = 1; }
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
    if (opacity > 0) { opacity = 1; }
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

function RGBToHSL(rgb) {
  let [r, g, b, opacity] = rgb;
  if (r < 0) { r = 0; }
  if (r > 1) { r = 1; }
  if (b < 0) { b = 0; }
  if (b > 1) { b = 1; }
  if (g < 0) { g = 0; }
  if (g > 1) { g = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 0) { opacity = 1; }
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let H = 0;
  if (r === max) {
    H = (g - b) / (max - min);
  } else if (g === max) {
    H = 2.0 + (b - r) / (max - min);
  } else {
    H = 4.0 + (r - g) / (max - min);
  }
  H *= 60;
  const L = (max + min) / 2;
  const S = (max - min) / (1 - Math.abs(max + min - 1));
  if (opacity != null) {
    return [H, S, L, opacity];
  }
  return [H, S, L];
}

function RGBToHSB(rgb) {
  let [r, g, b, opacity] = rgb;
  if (r < 0) { r = 0; }
  if (r > 1) { r = 1; }
  if (b < 0) { b = 0; }
  if (b > 1) { b = 1; }
  if (g < 0) { g = 0; }
  if (g > 1) { g = 1; }
  if (opacity != null) {
    if (opacity < 0) { opacity = 0; }
    if (opacity > 0) { opacity = 1; }
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let H = 0;
  if (r === max) {
    H = (g - b) / (max - min);
  } else if (g === max) {
    H = 2.0 + (b - r) / (max - min);
  } else {
    H = 4.0 + (r - g) / (max - min);
  }
  H *= 60;
  const V = max;
  const S = (max - min) / max;
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

function RGBToHEX(rgb) {
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
    if (opacity > 0) { opacity = 1; }
  }
  let hexRGB = `${Math.round((r * 255)).toString(16)}${Math.round((g * 255)).toString(16)}${Math.round((b * 255)).toString(16)}`;
  if (opacity != null) {
    hexRGB = `${hexRGB}${Math.round((opacity * 255)).toString(16)}`;
  }
  return hexRGB;
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

  constructor(
    c: string | Array<number> = [0, 0, 0, 1],
  ) {
    this.opacity = 1;
    if (typeof c === 'string') {
      this.setHex(c);
    } else if (Math.max(...c) > 1) {
      this.setRedGreenBlue(c);
    } else {
      this.setRGB(c);
    }
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
    return new Color(HSBToRGB([this.hue, this.hsbSaturation, brightness, this.opacity]));
  }

  newHsbSaturation(hsbSaturation: number) {
    return new Color(HSBToRGB([this.hue, hsbSaturation, this.brightness, this.opacity]));
  }

  newHue(hue: number) {
    return new Color(HSBToRGB([hue, this.hsbSaturation, this.brightness, this.opacity]));
  }

  // This is the same as lighter in sass
  lighten(delta: number) {
    this.setLuminance(this.luminance + delta);
  }

  // This is the same as lighter in sass
  darken(delta: number) {
    this.setLuminance(this.luminance - delta);
  }

  _dup() {
    return new Color(this.rgb);
  }
}


const palettes = {
  standard: {
    blue: '89A2E8',
    red: 'FFA9A7',
    green: 'ABFF9A',
    yellow: 'E8DD8A',
    cyan: '9AFFEA',
    brown: 'DEC28B',
    orange: 'E8B382',
    violet: 'D882E8',
    grey: '727F8C',
    white: 'FFF',
    offWhite: 'FAFAFA',
    black: '000',
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
      warning: ['red', 'base'],
      secondary: ['blue', 'light'],
      text: ['grey', 'darker'],
      background: ['offWhite', 'base'],
      disabled: ['grey', 'base'],
      safe: ['green', 'base'],
      menus: ['grey', 'darker'],
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
// const abstract = {
//   alpha: ['blue'],
//   bravo: ['red'],
//   charlie: ['green'],
//   delta: ['yellow'],
//   echo: ['cyan'],
//   foxtrot: ['orange'],
// };

// const hues = {
//   blue: ['blue'],
//   red: ['red'],
//   green: ['green'],
//   yellow: ['yellow'],
//   cyan: ['cyan'],
//   brown: ['brown'],
//   orange: ['orange'],
//   violet: ['violet'],
//   grey: ['grey'],
//   white: ['white'],
//   black: ['black'],
// };

// const site = {
//   primary: ['logo'],
// };

// const diagram = {
//   primary: ['blue'],
//   secondary: ['red'],
//   tertiary: ['green'],
//   construction: ['yellow', 'darker'],
// };

// const families = {
//   abstract, hues, site, diagram,
// };

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

// function modify(col: [number, number, number, number], modifier: number) {
//   return [
//     Math.max(Math.min(1, col[0] + modifier), 0),
//     Math.max(Math.min(1, col[1] + modifier), 0),
//     Math.max(Math.min(1, col[2] + modifier), 0),
//     col[3],
//   ];
// }

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

  families: {
    [familyName: string]: {
      [colorName: string]: Array<number>;
    };
  };

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
    }
    return Colors.instance;
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
      } else {
        this.palette[colorName] = col._dup();
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

  get(...names: Array<string | number>) {
    let lastShade = 0;
    let lastIndex = names.length - 1;
    const last = names.slice(-1)[0];
    if (typeof last === 'number' || shades[last] != null) {
      lastShade = getShade(last);
      lastIndex -= 2;
    }
    let definition = this.theme;
    for (let i = 0; i <= lastIndex; i += 1) {
      if (definition[names[i]] == null) {
        return new Color();
      }
      definition = definition[names[i]];
    }
    console.log(definition)
    if (!Array.isArray(definition) && typeof definition !== 'string') {
      return new Color();
    }
    console.log('asdf')
    const [colorName, shade] = definition;
    if (this.palette[colorName] == null) {
      return new Color();
    }
    const col = this.palette[colorName];
    const totalShade = getShade(shade) + lastShade;
    return new col._dup().lighten(totalShade);
  }
  // setPalette(paletteColors: Object) {
  //   this.palette = {};
  //   Object.keys(paletteColors).forEach((col) => {
  //     this.palette[col] = new Color(paletteColors[col]);
  //   });


  //   this.families = {};
  //   Object.keys(families).forEach((familyName) => {
  //     const family = families[familyName];
  //     if (this.families[familyName] == null) {
  //       this.families[familyName] = {};
  //     }
  //     Object.keys(family).forEach((member) => {
  //       let [c, modifier] = families[familyName][member];
  //       if (c == null) {
  //         c = 'black';
  //       }
  //       if (modifier == null) {
  //         modifier = 0;
  //       }
  //       this.families[familyName][member] = this.palette[c].modify(modifier);
  //     });
  //   });
  // }

  // get(
  //   colorOrFamily: string,
  //   colorModOrFamilyMember: string | number,
  //   modOfFamilyMember: number = 0,
  // ) {
  //   let c = [0, 0, 0, 1];
  //   let mod = 0;
  //   if (this.families.hues[colorOrFamily] != null) {
  //     c = this.families.hues[colorOrFamily];
  //     if (typeof colorModOrFamilyMember === 'number') {
  //       mod = colorModOrFamilyMember;
  //     } else {
  //       mod = colorModOrFamilyMember;
  //     }
  //   } else {
  //     if (typeof colorModOrFamilyMember === 'string') {
  //       c = this.families[colorOrFamily][colorModOrFamilyMember];
  //     }
  //     mod = modOfFamilyMember;
  //   }
  //   return modifyColor(c, mod);
  // }
}

// Do not automatically create and instance and return it otherwise can't
// mock elements in jest
// // const globalvars: Object = new GlobalVariables();
// // Object.freeze(globalvars);

// function getColor(
//   familyName: 'site' | 'hues' | 'abstract',
//   semanticName: string,
//   modifier: number | string = 0,
// ) {
//   let hex = '000';
//   let paletteColor = 'black';
//   let mod = 0;
//   let family = diagram;
//   if (familyName === 'hues') {
//     family = hues;
//   } else if (familyName === 'site') {
//     family = site;
//   } else if (familyName === 'abstract') {
//     family = abstract;
//   }
//   [paletteColor, mod] = family[semanticName];
//   if (paletteColor == null) {
//     paletteColor = 'black';
//   }
//   if (mod == null) {
//     mod = 0;
//   }
//   const col = hexToArray(pallete[paletteColor] || '000');
//   if (typeof modifiers === 'string') {
//     mod += modifiers[modifier] || 0;
//   } else {
//     mod += modifier;
//   }
//   return modify(col, mod);
// }

// function color(hueName, modifier) {
//   return getColor('hues', hueName, modifier);
// }

export { Color, Colors, HSBToHSL, HSLToHSB };
