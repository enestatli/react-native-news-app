import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  getTopHeadlines,
  getSearchNews,
  getCategoryNews,
} from '../../utils/api';

import { ThemeContext } from '../../context';
import { CategoryBar, Header, RecentNews, TrendNews } from '../../components';

const tabs = [
  {
    id: 'general',
    title: 'General',
  },
  {
    id: 'business',
    title: 'Business',
  },
  {
    id: 'health',
    title: 'Health',
  },
  {
    id: 'science',
    title: 'Science',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
  },
  {
    id: 'sports',
    title: 'Sports',
  },
  {
    id: 'technology',
    title: 'Technology',
  },
];

const HomeView = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [testData, setTestData] = useState([]);
  const [trendNews, setTrendNews] = useState([]);
  const [query, setQuery] = useState('');
  const { mode, darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (query.length > 3) {
      getSearchNews(query)
        .then((data) => {
          setTestData(data);
        })
        .catch((error) => {
          console.log('error while fetching searchNews: ', error);
        });
    } else {
      getTopHeadlines('tr')
        .then((data) => {
          setTestData(data);
        })
        .catch((error) => {
          console.log('error while fetching topHeadlines', error);
        });
    }
  }, [query]);

  useEffect(() => {
    if (selectedTab === 'allNews') {
      getTopHeadlines('us')
        .then((data) => {
          setTrendNews(data);
        })
        .catch((error) => {
          console.log('error while fetching topHeadlines: ', error);
        });
    } else {
      getCategoryNews(selectedTab)
        .then((data) => {
          setTrendNews(data);
        })
        .catch((error) => {
          console.log('error while fetching categoryNews: ', error);
        });
    }
  }, [selectedTab]);

  useEffect(() => {
    setSelectedTab(tabs[0].id);
    StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
    StatusBar.setTranslucent(false);
    // TODO make this true and give paddingVertical to fix transition btw detail->home
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(mode.colors.background);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     setSelectedTab(tabs[0].id);
  //     StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
  //     // StatusBar.setTranslucent(false);
  //     Platform.OS === 'android' &&
  //       StatusBar.setBackgroundColor(mode.colors.background);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [darkMode]),
  // );

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
        // marginTop: StatusBar.currentHeight - 15,
      }}
    >
      {/* TODO statusbar */}
      {/* <StatusBar translucent={true} /> */}
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        {/* Header */}
        <Header
          avatar={'../../assets/images/ic_launcher.png'}
          setQuery={setQuery}
          nav={navigation}
        />
        {/* Category */}
        <CategoryBar
          tabs={tabs}
          selected={selectedTab}
          onPress={(id) => setSelectedTab(id)}
        />
        {/* Trend News */}
        {selectedTab && (
          <TrendNews trendNews={trendNews.articles} navigation={navigation} />
        )}
        <RecentNews recentNews={testData?.articles} navigation={navigation} />

        {/* Recent News */}
      </View>
    </View>
  );
};

export default HomeView;
