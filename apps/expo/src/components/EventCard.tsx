import { Event, EventsListNavigationProp } from '../routes/EventsList';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

const EventCard = ({ item }: { item: Event }) => {
  // console.log(console.log('item', JSON.stringify(item, null, 2)));
  //TODO: Switch in later version from fake api call to AsyncStorage Call
  const navigation = useNavigation<EventsListNavigationProp>();
  return (
    <TouchableRipple
      onPress={() => navigation.navigate('EventDetails', item)}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <Card mode="elevated" style={styles.eventCard}>
        <Card.Cover source={{ uri: item.logoUrl }} />
        <Card.Title
          title={item.name}
          titleVariant="headlineSmall"
          // subtitle={item.startsAt.toDateString()}
          subtitleVariant="titleSmall"
        />
        <Card.Content>
          <Text>{item.description}</Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  eventCard: {
    margin: 13,
    backgroundColor: 'white',
  },
});
export default EventCard;
