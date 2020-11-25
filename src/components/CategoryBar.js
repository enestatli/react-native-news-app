import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const CategoryBar = ({ theme, selected, onPress, str }) => {
  const listRef = useRef();

  const tabs2 = [
    {
      id: 'general',
      title: str.general,
    },
    {
      id: 'business',
      title: str.business,
    },
    {
      id: 'health',
      title: str.health,
    },
    {
      id: 'science',
      title: str.science,
    },
    {
      id: 'entertainment',
      title: str.entertainment,
    },
    {
      id: 'sports',
      title: str.sports,
    },
    {
      id: 'technology',
      title: str.technology,
    },
  ];

  useEffect(() => {
    listRef.current.scrollToIndex({
      index: tabs2.findIndex((el) => el.id === selected),
    });
  }, [selected, tabs2]);

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        ref={listRef}
        style={styles.categoryFlatList}
        data={tabs2}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                onPress(item.id);
                listRef.current.scrollToIndex({
                  index: tabs2.findIndex((el) => el === item),
                });
              }}
            >
              <Text
                style={[styles.categoryTitle, { color: theme.colors.icon }]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            {selected === item.id && (
              <View
                style={[
                  styles.borderBottom,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CategoryBar;

const styles = StyleSheet.create({
  categoryContainer: {
    height: 24,
    marginBottom: 12,
    width: '100%',
  },
  categoryFlatList: {
    width: '100%',
    height: '100%',
  },
  category: {
    paddingRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  categoryButton: {
    width: '100%',
  },
  categoryTitle: {
    fontSize: 17,
    color: '#777777',
  },
  borderBottom: {
    height: 2,
    backgroundColor: 'blue',
    width: 24,
    marginTop: 'auto',
  },
});
