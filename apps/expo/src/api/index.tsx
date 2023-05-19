import { type AppRouter } from '@informatyzacja/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import Constants from 'expo-constants';
import React from 'react';
import superjson from 'superjson';

interface AdditionalConstants {
  expoConfig: {
    hostUri?: string;
  };
}

declare module 'expo-constants' {
  interface Constants extends AdditionalConstants {
    expoConfig: {
      hostUri?: string;
      extra: {
        apiUrl?: string;
      };
    };
  }
}

/**
 * A set of typesafe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from '@informatyzacja/api';

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */

  let apiUrl = Constants.expoConfig.extra.apiUrl;

  if (apiUrl.includes('localhost')) {
    apiUrl = apiUrl.replace(
      'localhost',
      Constants.expoConfig.hostUri?.split(':')[0]
    );
  }

  console.log(apiUrl);

  if (!apiUrl) {
    throw new Error('Failed to get url.');
  }
  return apiUrl;
};

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
            staleTime: 2000,
          },
        },
      })
  );
  const [trpcClient] = React.useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        {children}
      </PersistQueryClientProvider>
    </api.Provider>
  );
};
