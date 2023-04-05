import { subscribedEventsAtom } from '../atoms/subscribedEvents';
import * as Notifications from 'expo-notifications';
import { useAtom } from 'jotai';

// TODO: Add iteration on
const scheduleNotification = async (event) => {
  const trigger = new Date(event.startDate);
  trigger.setMinutes(trigger.getMinutes() - 15);
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: event.name,
      body: `Masz wydarzenie odbywające się w miejscu: ${event.place}`,
      sound: false,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger,
  });
  return id;
};

const removeNotification = (event) => {
  Notifications.cancelScheduledNotificationAsync(event.notificationId);
};

export const useSubscribedEvents = () => {
  const [subscribedEvents, setSubscribedEvents] = useAtom(subscribedEventsAtom);

  const subscribe = async (event) => {
    const id = await scheduleNotification(event);
    event.notificationId = id;
    event.subEvents.map(async (subEvent) => {
      const id = await scheduleNotification(subEvent);
      subEvent.notificationId = id;
    });
    const newSubscribedEvents = [...subscribedEvents, event];
    setSubscribedEvents(newSubscribedEvents);
  };

  const unSubscribe = (event) => {
    const newSubscribedEvents = subscribedEvents.filter((item) => {
      if (item.id === event.id) {
        removeNotification(event);
        event.subEvents.map((subEvent) => {
          removeNotification(subEvent);
        });
      }
      return item.id !== event.id;
    });
    setSubscribedEvents(newSubscribedEvents);
  };

  return {
    subscribedEvents: subscribedEvents,
    addEvent: subscribe,
    removeEvent: unSubscribe,
  };
};
