import React, { useContext, useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { ThemeContext } from '../context';

const CategoryBar = ({ tabs, selected, onPress }) => {
  const listRef = useRef();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    listRef.current.scrollToIndex({
      index: tabs.findIndex((el) => el.id === selected),
    });
  }, [selected, tabs]);

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        ref={listRef}
        style={styles.categoryFlatList}
        data={tabs}
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
                  index: tabs.findIndex((el) => el === item),
                });
              }}
            >
              <Text style={[styles.categoryTitle, { color: mode.colors.icon }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {selected === item.id && (
              <View
                style={[
                  styles.borderBottom,
                  { backgroundColor: mode.colors.primary },
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
    marginTop: 24,
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
