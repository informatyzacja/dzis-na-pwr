import { api } from '../api';
import EventCard from '../components/EventCard';
import useDebounce from '../hooks/useDebounce';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

const Category = ({ name }: { name: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Image
        source={{ uri: `https://picsum.photos/80/60?random=${name}` }}
        style={{
          width: 80,
          height: 60,
          borderRadius: 10,
        }}
      />
      <Text variant="bodyMedium">{name}</Text>
    </View>
  );
};

const Search = () => {
  const ref = React.useRef(null);
  const [search, setSearch] = useState('');
  const searchDebounced = useDebounce(search, 500);
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = api.events.list.useQuery(
    {
      search: searchDebounced,
    },
    {
      enabled: searchDebounced !== '',
    }
  );

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const unsubscribe = navigation.addListener('focus', () => {
      timeout = setTimeout(() => {
        ref.current?.focus();
      }, 100);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View
      style={{
        marginHorizontal: 13,
        flex: 1,
      }}
    >
      <Searchbar
        ref={ref}
        icon="arrow-left"
        onIconPress={() => {
          navigation.goBack();
        }}
        value={search}
        style={{
          marginBottom: 10,
        }}
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={() => {}}
        autoFocus={true}
        placeholder="Szukaj wydarzenia"
      />
      {searchDebounced === '' ? (
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            rowGap: 16,
            paddingTop: 16,
            paddingBottom: 32,
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              fontWeight: 'bold',
            }}
          >
            Szukaj wg kategorii
          </Text>
          <Category name="Kultura" />
          <Category name="Edukacja" />
          <Category name="Sport" />
          <Category name="Zdrowie" />
          <Category name="Biznes" />
          <Category name="Nauka" />
          <Category name="Technologia" />
          <Category name="Polityka" />
          <Category name="Religia" />
          <Category name="Inne" />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            paddingBottom: 32,
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => <EventCard item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <Text variant="headlineSmall">Brak wyników :(</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
