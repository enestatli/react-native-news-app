const palette = {
  red: '#E93D25',
  lightGray: '#707070',
  midGray: '#777777',
  darkGray: '#464646',
  gray: '#c4c4c4',
  blue: '#1E4079',
  lightBlack: '#343434',
  black: '#1b1b1f',
  darkWhite: '#F8F8F8',
  lightWhite: '#F3F3F3',
  white: '#FFFFFF',
  tab: '#f9f9f9',
  tabDark: '#121214',
  card: '#202024',
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    tabBar: palette.tab,
    icon: palette.midGray,
    card: palette.lightWhite,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
  },
  breakpoints: {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
    primary: palette.red,
    success: palette.green,
    danger: palette.blue,
    failure: palette.red,
    tabBar: palette.tabDark,
    icon: palette.white,
    card: palette.card,
  },
};
