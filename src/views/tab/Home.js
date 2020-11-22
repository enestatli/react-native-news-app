import React, { useContext, useEffect, useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';

import {
  getTopHeadlines,
  getSearchNews,
  getCategoryNews,
} from '../../utils/api';

import { LanguageContext, ThemeContext } from '../../context';
import { CategoryBar, Header, RecentNews, TrendNews } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../utils/newsLangCode';

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
  const { strings } = useContext(LanguageContext);
  const [countryCode, setCountryCode] = useState('');

  //TODO sometimes news come with same key, drop this
  //TODO google news rss
  //TODO search button

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('newsLanguage');
        if (value !== null) {
          setCountryCode(value);
        } else {
          const code = strings.getInterfaceLanguage().substring(0, 2);
          const f = data.find((i) => i.icon.toLowerCase() === code);
          if (f !== undefined) {
            setCountryCode(code);
          } else {
            setCountryCode('us');
          }
        }
      } catch (err) {
        console.log('error while setting countryCode', err);
      }
    })();
  }, []);

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
      getTopHeadlines(countryCode)
        .then((data) => {
          setTestData(data);
        })
        .catch((error) => {
          console.log('error while fetching topHeadlines', error);
        });
    }
  }, [query, countryCode]);

  useEffect(() => {
    if (selectedTab === 'general') {
      getTopHeadlines(countryCode)
        .then((data) => {
          setTrendNews(data);
        })
        .catch((error) => {
          console.log('error while fetching topHeadlines: ', error);
        });
    } else {
      getCategoryNews(selectedTab, countryCode)
        .then((data) => {
          setTrendNews(data);
        })
        .catch((error) => {
          console.log('error while fetching categoryNews: ', error);
        });
    }
  }, [selectedTab, countryCode]);

  useEffect(() => {
    setSelectedTab(tabs[0].id);
    StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
    StatusBar.setTranslucent(false);
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

  //TODO langModal transition is bad
  //TODO recentNews marginTop check

  //TODO use dimension width height!!

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
      }}
    >
      {/* remove flex 1 */}
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        {/* Header */}
        <Header
          avatar={'../../assets/images/ic_launcher.png'}
          setQuery={setQuery}
          nav={navigation}
          theme={mode}
        />
        {/* Category */}
        <CategoryBar
          tabs={tabs}
          selected={selectedTab}
          onPress={(id) => setSelectedTab(id)}
          str={strings}
          theme={mode}
        />
        {/* Trend News */}
        {selectedTab && (
          <TrendNews
            trendNews={trendNews.articles}
            navigation={navigation}
            str={strings}
          />
        )}

        {/* Recent News */}

        <RecentNews
          articles={testData?.articles}
          navigation={navigation}
          str={strings}
          setCountryCode={setCountryCode}
          countryCode={countryCode}
          theme={mode}
        />
      </View>
    </View>
  );
};

export default HomeView;
