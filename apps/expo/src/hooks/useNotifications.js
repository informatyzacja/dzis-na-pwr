import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useNotifications = () => {
  // for acquiring permissions to use both on android and IOS
  const handleNotification = () => {
    console.warn('ok! got your notif');
  };
  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') console.log('Notification permissions granted.');
  };

  useEffect(() => {
    askNotification();
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
  }, []);
};
