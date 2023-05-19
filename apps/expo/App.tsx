import { expo } from './app.config';
import { TRPCProvider } from './src/api';
import { useNotifications } from './src/hooks/useNotifications';
import { useOnlineManager } from './src/hooks/useOnlineManager';
import Navigation from './src/routes/Navbar';
import theme from './src/theme';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
  useOnlineManager();
  useNotifications();
  return (
    <TRPCProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <NavigationContainer theme={theme}>
            <Navigation />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </TRPCProvider>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
AppRegistry.registerComponent(expo.name, () => Main);
