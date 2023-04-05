import { name as appName } from './app.json';
import { useNotifications } from './src/hooks/useNotifications';
import { useOnlineManager } from './src/hooks/useOnlineManager';
import Navbar from './src/routes/Navbar';
import theme from './src/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { AppRegistry, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
      staleTime: 2000,
    },
  },
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
export default function Main() {
  useOnlineManager();
  useNotifications();
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <NavigationContainer>
            <Navbar />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
AppRegistry.registerComponent(appName, () => Main);
