import { useIsSubscribed } from '../hooks/useIsSubscribed';
import { useSubscribedEvents } from '../hooks/useSubscribedEvents';
import theme from '../theme';
import CardRow from './CardRow';
import SubscribeButton from './SubscribeButton';
import { StyleSheet, View } from 'react-native';

const EventDetailsCard = ({ eventData }) => {
  const isSubscribed = useIsSubscribed(eventData);
  const { addEvent, removeEvent } = useSubscribedEvents();

  const handleOnClick = async () => {
    if (isSubscribed) {
      removeEvent(eventData);
    }
    if (!isSubscribed) {
      addEvent(eventData);
    }
  };

  return (
    <View style={styles.detailsCardContainer}>
      <View style={styles.wrapper}>
        <CardRow
          icon={'calendar'}
          text={`${eventData.startDate} - ${eventData.endDate}`}
        />
        <CardRow icon={'map-marker'} text={eventData.place} />
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
