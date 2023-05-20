import { useIsSubscribed } from '../hooks/useIsSubscribed';
import { useSubscribedEvents } from '../hooks/useSubscribedEvents';
import { Event } from '../routes/EventsList';
import theme from '../theme';
import CardRow from './CardRow';
import SubscribeButton from './SubscribeButton';
import { StyleSheet, View } from 'react-native';

const EventDetailsCard = ({ event }: { event: Readonly<Event> }) => {
  const isSubscribed = useIsSubscribed(event);
  const { addEvent, removeEvent } = useSubscribedEvents();

  const handleOnClick = async () => {
    isSubscribed ? removeEvent(event) : addEvent(event);
  };

  const startsAt = new Date(event.startsAt);
  const endsAt = new Date(event.endsAt);

  return (
    <View style={styles.detailsCardContainer}>
      <View style={styles.wrapper}>
        <CardRow
          icon={'calendar'}
          text={`${startsAt.toLocaleDateString()} - ${event.endsAt}`}
        />
        <CardRow icon={'map-marker'} text={event.location} />
      </View>
      <View style={styles.buttonContainer}>
        <SubscribeButton
          icon={isSubscribed ? 'cards-heart' : 'cards-heart-outline'}
          onPress={handleOnClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsCardContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primaryContainer,
    flex: 1,
    flexDirection: 'row',
  },
  wrapper: { flex: 1, flexGrow: 3 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
});

export default EventDetailsCard;
