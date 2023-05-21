import EventDetailsCard from '../components/EventDetailsCard';
import { RootStackParamList } from './Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type EventDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetails'
>;

const EventDetails = ({ route }: EventDetailsProps) => {
  const eventData = route.params;
  return (
    <ScrollView>
      <View style={styles.mainViewContainer}>
        <Image
          source={{ uri: eventData.logoUrl }}
          style={styles.imageContainer}
          resizeMode="cover"
        />
        <Text variant="headlineLarge">{eventData.name}</Text>
        <View style={styles.detailsContainer}>
          <EventDetailsCard event={eventData} />
        </View>
        <View>
          <Text variant="titleLarge">Opis</Text>
          <Text style={styles.description} variant="bodyMedium">
            {eventData.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 200,
    width: null,
  },
  description: {
    margin: 5,
  },
  detailsContainer: { height: 80 },
});
export default EventDetails;
