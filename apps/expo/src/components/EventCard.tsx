import { Event, EventsListNavigationProp } from '../routes/EventsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image, View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

const eventsNames = [
  'Wieczór Gier Planszowych',
  'OdraNa Juwenalia',
  'Wieczór RPG - maj 2023',
  'Studenckie Wesele PWr Party',
  'Studenci na tropie wydziałowych tajemnic - Gra samorządowca 2023',
  'Studencka Dawka Kultury x DKF - „Sekrety i kłamstwa',
];

const limit = 35;

const limitEventName = (name: string) => {
  if (name.length > limit) {
    return name.slice(0, limit) + '...';
  }
  return name;
};

const EventCard = ({ item }: { item: Event }) => {
  const navigation = useNavigation<EventsListNavigationProp>();

  return (
    <TouchableRipple
      onPress={() => navigation.navigate('EventDetails', item)}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 4 }}
          source={{ uri: `https://picsum.photos/80/80?random=${item.id}` }}
        />
        <View>
          <Text
            variant="labelSmall"
            style={{
              color: '#e76f51',
            }}
          >
            {item &&
              item.startsAt &&
              item.startsAt.toLocaleDateString &&
              item.startsAt.toLocaleDateString()}
            {` • `}
            {item &&
              item.startsAt &&
              item.startsAt.toLocaleTimeString &&
              item.startsAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
          </Text>
          <Text variant="titleMedium">
            {limitEventName(
              eventsNames[Math.floor(Math.random() * eventsNames.length)]
            )}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              color: 'rgba(0, 0, 0, .54)',
              marginTop: 2,
            }}
          >
            Pola mokotowskie
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginTop: 'auto',
            }}
          >
            <MaterialCommunityIcons name="account-eye" size={12} />
            <Text variant="bodySmall">
              {Math.floor(Math.random() * 1000)} osób
            </Text>
          </View>
        </View>
      </View>
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
