import theme from '../theme';
import EventDetails from './EventDetails';
import EventsList, { Event } from './EventsList';
import SubscribedEventsList from './SubscribedEventsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  EventsList: undefined;
  SubscribedEventsList: undefined;
  EventDetails: Event;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const EventsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="EventsList"
        component={EventsList}
      />
      <Stack.Screen
        name="EventDetails"
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
        })}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};
const SubscribedEventsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscribedEventsList"
        component={SubscribedEventsList}
      />
      <Stack.Screen
        name="EventDetails"
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
        })}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};

const Navbar = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: theme.colors.primaryContainer }}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="EventsList"
        component={EventsNavigator}
        options={{
          tabBarLabel: 'Wydarzenia',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            );
          },
        }}
      />
      <Tab.Screen
        name="SubscribedEventsList"
        options={{
          tabBarLabel: 'Obserwowane',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="cards-heart"
                color={color}
                size={26}
              />
            );
          },
        }}
        component={SubscribedEventsNavigator}
      />
    </Tab.Navigator>
  );
};
export default Navbar;
