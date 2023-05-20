import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  MD3LightTheme as DefaultTheme,
  adaptNavigationTheme,
} from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// colors generated  by providing #7FCBEA on website
// https://callstack.github.io/react-native-paper/theming.html
const theme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(150, 73, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 220, 198)',
    onPrimaryContainer: 'rgb(49, 19, 0)',
    secondary: 'rgb(104, 71, 192)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(232, 221, 255)',
    onSecondaryContainer: 'rgb(33, 0, 93)',
    tertiary: 'rgb(0, 103, 131)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(188, 233, 255)',
    onTertiaryContainer: 'rgb(0, 31, 42)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 23)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 23)',
    surfaceVariant: 'rgb(244, 222, 211)',
    onSurfaceVariant: 'rgb(82, 68, 60)',
    outline: 'rgb(132, 116, 106)',
    outlineVariant: 'rgb(215, 195, 183)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 43)',
    inverseOnSurface: 'rgb(251, 238, 232)',
    inversePrimary: 'rgb(255, 183, 134)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(250, 242, 242)',
      level2: 'rgb(247, 237, 235)',
      level3: 'rgb(244, 231, 227)',
      level4: 'rgb(242, 230, 224)',
      level5: 'rgb(240, 226, 219)',
    },
    surfaceDisabled: 'rgba(32, 26, 23, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 23, 0.38)',
    backdrop: 'rgba(58, 46, 38, 0.4)',
  },
};

const lightTheme = merge(theme, LightTheme);

export default lightTheme;
