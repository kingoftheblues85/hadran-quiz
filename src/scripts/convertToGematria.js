export const convertToGematria = (num) => {
  /**
   * Converts any integer between 1 and 999 into its Hebrew gematria representation.
   * @param (number) num - The number to be converted into gematria
   * @returns (string) The gematria
   */

  const hebrewLetters = {
    1: "א",
    2: "ב",
    3: "ג",
    4: "ד",
    5: "ה",
    6: "ו",
    7: "ז",
    8: "ח",
    9: "ט",
    10: "י",
    20: "כ",
    30: "ל",
    40: "מ",
    50: "נ",
    60: "ס",
    70: "ע",
    80: "פ",
    90: "צ",
    100: "ק",
    200: "ר",
    300: "ש",
    400: "ת",
    500: "ך",
    600: "ם",
    700: "ן",
    800: "ף",
    900: "ץ",
  };

  const result = num
    .toString()
    .split("")
    .map((digit, index, array) => {
      const place = Math.pow(10, array.length - index - 1);
      const value = parseInt(digit) * place;
      if (value < 10) {
        return hebrewLetters[value];
      } else if (value > 10 && value < 100) {
        return hebrewLetters[value];
      } else {
        return hebrewLetters[place];
      }
    })
    .join("");

  return result;
};
