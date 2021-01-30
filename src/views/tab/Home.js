import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Platform, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
  getTopHeadlines,
  getSearchNews,
  getCategoryNews,
} from '../../utils/api';

import {
  LanguageContext,
  NotificationContext,
  ThemeContext,
} from '../../context';
import { CategoryBar, Header, RecentNews, TrendNews } from '../../components';
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

const HomeView = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [testData, setTestData] = useState([]);
  const [trendNews, setTrendNews] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [query, setQuery] = useState('');
  const { mode, darkMode } = useContext(ThemeContext);
  const { strings } = useContext(LanguageContext);
  const { getNotifyData, enableNotifications } = useContext(
    NotificationContext,
  );
  const [countryCode, setCountryCode] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    (async () => {
      try {
        if (mounted) {
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
        }
      } catch (err) {
        console.log('error while setting countryCode', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isSubmit) {
        getSearchNews(query)
          .then((data) => {
            setTestData(data);
            if (enableNotifications) {
              getNotifyData(data?.articles[Math.floor(Math.random() * 11)]);
            }
          })
          .catch((error) => {
            console.log('error while fetching searchNews: ', error);
          });
      } else {
        getTopHeadlines(countryCode)
          .then((data) => {
            setTestData(data);
            if (enableNotifications && countryCode) {
              getNotifyData(data?.articles[Math.floor(Math.random() * 5)]);
            }
          })
          .catch((error) => {
            console.log('error while fetching topHeadlines', error);
          });
      }
    }
    return () => {
      mounted.current = false;
    };
  }, [query, countryCode, isSubmit]);

  useEffect(() => {
    if (mounted) {
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
    }
    return () => {
      mounted.current = false;
    };
  }, [selectedTab, countryCode]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
    }, [darkMode]),
  );

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        {/* Header */}
        <Header
          setQuery={setQuery}
          theme={mode}
          query={query}
          setIsSubmit={setIsSubmit}
        />
        {/* Category */}
        <CategoryBar
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
            theme={mode}
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
          query={query}
        />
      </View>
    </View>
  );
};

export default HomeView;
