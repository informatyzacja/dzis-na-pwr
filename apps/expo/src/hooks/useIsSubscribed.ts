import { useSubscribedEvents } from './useSubscribedEvents';
import React from 'react';

export const useIsSubscribed = (event: { id: string }) => {
  const { subscribedEvents } = useSubscribedEvents();

  const isSubscribed = subscribedEvents.some((item) => item.id === event.id);

  return isSubscribed;
};
