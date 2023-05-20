import theme from '../theme';
import EventDetails from './EventDetails';
import EventsList, { Event } from './EventsList';
import Search from './Search';
import SubscribedEventsList from './SubscribedEventsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Events: undefined;
  SubscribedEvents: undefined;
  EventDetails: Event;
  main: undefined;
  Profile: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Events"
        component={EventsList}
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
        name="SubscribedEvents"
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
        component={SubscribedEventsList}
      />
      <Tab.Screen
        name="Profile"
        component={EventsList}
        options={{
          tabBarLabel: 'Konto',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        options={{
          headerShown: false,
        }}
        component={TabNavigation}
      />
      <Stack.Screen
        name="EventDetails"
        options={({ route }) => ({
          title: route.params.name,
        })}
        component={EventDetails}
      />
      <Stack.Screen
        name="Search"
        options={{
          headerShown: false,
        }}
        component={Search}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
