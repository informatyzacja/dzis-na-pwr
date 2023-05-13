import { RouterOutputs } from '../api';
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

  const unSubscribe = (event: Event) => {
    const newSubscribedEvents = subscribedEvents.filter((item) => {
      if (item.id === event.id) {
        removeNotification(event);
        event.AgendaItem.map((subEvent) => {
          removeNotification(subEvent.id);
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
