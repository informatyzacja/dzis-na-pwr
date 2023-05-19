import { RouterOutputs } from '../api';
import { notificationsAtom } from '../atoms/notifications';
import { subscribedEventsAtom } from '../atoms/subscribedEvents';
import * as Notifications from 'expo-notifications';
import { useAtom } from 'jotai';

type Event = RouterOutputs['events']['list'][number];

// TODO: Add iteration on
const scheduleNotification = async (event: Event) => {
  const trigger = event.startsAt;
  trigger.setMinutes(trigger.getMinutes() - 15);
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: event.name,
      body: `Masz wydarzenie odbywające się w miejscu: ${event.location}`,
      sound: false,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger,
  });
  return id;
};

const removeNotification = (event: { notificationId: string }) => {
  Notifications.cancelScheduledNotificationAsync(event.notificationId);
};

export const useSubscribedEvents = () => {
  const [subscribedEvents, setSubscribedEvents] = useAtom(subscribedEventsAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const subscribe = async (event: Event) => {
    const id = await scheduleNotification(event);

    const newNotification = {
      eventId: event.id,
      notificationId: id,
    };

    const newNotifications = [...notifications, newNotification];
    const newSubscribedEvents = [...subscribedEvents, event];

    setNotifications(newNotifications);
    setSubscribedEvents(newSubscribedEvents);
  };

  const unsubscribe = (event: Event) => {
    const newSubscribedEvents = subscribedEvents.filter((item) => {
      if (item.id === event.id) {
        removeNotification({
          notificationId: notifications.find(
            (notification) => notification.eventId === event.id
          )?.notificationId,
        });
      }
      return item.id !== event.id;
    });

    const newNotifications = notifications.filter(
      (notification) => notification.eventId !== event.id
    );

    setNotifications(newNotifications);
    setSubscribedEvents(newSubscribedEvents);
  };

  return {
    subscribedEvents: subscribedEvents,
    addEvent: subscribe,
    removeEvent: unsubscribe,
  };
};
