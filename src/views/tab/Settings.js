import React, { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {
  Avatar,
  Close,
  DarkModeIcon,
  Email,
  HelpIcon,
  Language,
  LeftIcon,
  NotificationIcon,
  RightIcon,
  Sources,
  TimeIcon2,
  Whatsapp,
} from '../../components/icons';

import {
  AuthContext,
  LanguageContext,
  NotificationContext,
  SettingsContext,
  ThemeContext,
} from '../../context';
import TimeChart from '../../components/TimeChart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '../../components/BottomSheetModal';
import { windowHeight } from '../../utils/dimensions';
import { getNewsSources } from '../../utils/api';

const SettingsView = ({ navigation }) => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);
  const [sources, setSources] = useState(null);

  const { mode, darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, logout, setIsAuth } = useContext(AuthContext);
  const { isJSEnabled, setIsJSEnabled } = useContext(SettingsContext);
  const { toggleNotifications, enableNotifications } = useContext(
    NotificationContext,
  );
  const {
    langModalVisible,
    toggleLangModal,
    changeLanguage,
    strings,
  } = useContext(LanguageContext);
  const [dbUser, setDbUser] = useState([]);

  const [timeStatus, setTimeStatus] = useState(false);

  const usersRef = firestore().collection('users');
  const emailUrl = 'mailto:cekmecemapp@gmail.com';
  const whatsappUrl = 'https://wa.me/905067758252';

  const OpenEmailButton = ({ url, children, ...props }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity title={children} onPress={handlePress} {...props}>
        {children}
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      try {
        if (user) {
          const snap = (await usersRef.doc(user.uid).get()).data();
          if (snap) {
            setDbUser(snap);
          }
        } else {
          setDbUser(null);
        }
      } catch (error) {
        Alert.alert(
          'Error happened',
          'Please refresh the app some error occured in database',
        );
      }
    });
    return unsub;
  }, [navigation, user]);

  React.useEffect(() => {
    (async () => {
      try {
        const newsSourcesData = await getNewsSources();
        if (newsSourcesData.status !== 'ok') {
          return;
        }
        setSources(newsSourcesData.sources);
      } catch (error) {
        Alert.alert('Error', 'Error occured while fetching news sources');
      }
    })();
  }, []);

  const showTimeChart = () => {
    setTimeStatus(!timeStatus);
  };

  const onLang = async (key) => {
    try {
      changeLanguage(key);
      toggleLangModal(true);
      await AsyncStorage.setItem('appLanguage', key);
    } catch (err) {
      console.log(`error when clicked change language(${key}) button`, err);
    }
  };

  const tabs = [
    {
      id: 'darkMode',
      title: strings.mode,
      switch: true,
      icon: <DarkModeIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          value={darkMode}
          onValueChange={() => toggleDarkMode(darkMode)}
          trackColor={{
            false: '#c4c4c4',
            true: mode.colors.primary,
          }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'notifications',
      title: strings.notification,
      switch: true,
      icon: <NotificationIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          onValueChange={() => toggleNotifications(enableNotifications)}
          value={enableNotifications}
          trackColor={{ false: '#c4c4c4', true: mode.colors.primary }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'block',
      title: strings.block,
      switch: true,
      icon: <Close color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          onValueChange={setIsJSEnabled}
          value={!isJSEnabled}
          trackColor={{ false: '#c4c4c4', true: mode.colors.primary }}
          thumbColor={'#f4f3f4'}
        />
      ),
    },
    {
      id: 'timeToRead',
      title: strings.timeSpent,
      switch: false,
      icon: <TimeIcon2 width={24} color={mode.colors.icon} />,
    },
    {
      id: 'language',
      title: strings.lang,
      switch: false,
      icon: <Language width={24} color={mode.colors.icon} />,
    },
    {
      id: 'help',
      title: strings.help,
      switch: false,
      icon: <HelpIcon width={24} color={mode.colors.icon} />,
    },
    {
      id: 'sources',
      title: 'News Sources',
      switch: false,
      icon: <Sources size={24} color={mode.colors.icon} />,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
    }, [darkMode]),
  );

  const authButton = () =>
    Alert.alert(
      'Authentication required',
      'You have to login to see your time spent',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Login', onPress: () => setIsAuth(true) },
      ],
      { cancelable: true },
    );

  const toggleHelp = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const toggleSources = () => {
    setSourcesVisible(!sourcesVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.preferences}>
      <View style={styles.border}>{item.icon}</View>
      <Text
        style={{
          paddingLeft: 24,
          fontSize: 16,
          color: mode.colors.icon,
        }}
      >
        {item.title}
      </Text>
      {item.switch ? (
        item.switchComp
      ) : (
        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={
            item.id === 'timeToRead'
              ? user
                ? showTimeChart
                : authButton
              : item.id === 'language'
              ? toggleLangModal
              : item.id === 'sources'
              ? toggleSources
              : toggleHelp
          }
        >
          <RightIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
      )}
    </View>
  );

  const buttonSetter = (k) => {
    if (strings.preferences.startsWith(k)) {
      return [true, '#b9b9b9'];
    }
    return [false, '#f4f3f4'];
  };

  return (
    <View
      style={{
        backgroundColor: mode.colors.background,
        flex: 1,
        paddingVertical: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
        >
          <LeftIcon width={24} color={mode.colors.icon} />
        </TouchableOpacity>
        <Text style={{ color: mode.colors.foreground, fontSize: 24 }}>
          {strings.settings}
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.userInfo}>
          <Avatar
            size={64}
            color={mode.colors.primary}
            authColor={user ? mode.colors.primary : 'transparent'}
          />
          {!user && (
            <TouchableOpacity
              style={[styles.loginButton, { borderColor: mode.colors.icon }]}
              onPress={authButton}
            >
              <Text style={{ color: mode.colors.icon }}>{strings.login}</Text>
            </TouchableOpacity>
          )}
          {user && (
            <>
              <View style={styles.userInfoTextContainer}>
                <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
                  {dbUser?.name}
                </Text>
                <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
                  {dbUser?.email}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.logoutButton,
                    { backgroundColor: mode.colors.primary },
                  ]}
                  onPress={() => logout()}
                >
                  <Text style={{ color: 'white' }}>{strings.logout}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: mode.colors.icon,
            marginBottom: 20,
          }}
        >
          {strings.preferences}
        </Text>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 12 }} />}
        />
      </View>

      <TimeChart bs={timeStatus} tb={showTimeChart} theme={mode} />

      <BottomSheet
        visible={langModalVisible}
        closeBottomSheet={toggleLangModal}
        lang={true}
      >
        <View
          style={{
            flex: 1,
            padding: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[
              styles.languageButton,
              { backgroundColor: buttonSetter('Pre')[1] },
            ]}
            onPress={() => onLang('en')}
            disabled={buttonSetter('Pre')[0]}
          >
            <Text style={{ fontSize: 22 }}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              { backgroundColor: buttonSetter('优先')[1] },
            ]}
            onPress={() => onLang('zh')}
            disabled={buttonSetter('优先')[0]}
          >
            <Text style={{ fontSize: 22 }}>Chinese</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              { backgroundColor: buttonSetter('Ter')[1] },
            ]}
            onPress={() => onLang('tr')}
            disabled={buttonSetter('Ter')[0]}
          >
            <Text style={{ fontSize: 22 }}>Turkish</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={toggleHelp}
        statusBarTranslucent={addTodoVisible && true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: mode.colors.background,
            paddingTop: StatusBar.currentHeight + 24,
          }}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={toggleHelp}>
              <LeftIcon width={24} color={mode.colors.icon} />
            </TouchableOpacity>
            <Text
              style={{
                color: mode.colors.foreground,
                fontSize: 24,
              }}
            >
              Help and Suggestions
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 164,
                marginBottom: 24,
              }}
            >
              <OpenEmailButton url={whatsappUrl}>
                <Whatsapp size={72} fill={mode.colors.primary} />
              </OpenEmailButton>
              <OpenEmailButton url={emailUrl}>
                <Email size={72} color={mode.colors.primary} />
              </OpenEmailButton>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode="clip"
              style={{
                color: mode.colors.foreground,
                fontSize: 16,
                marginHorizontal: 20,
              }}
            >
              Please help us to improve user experience
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={sourcesVisible}
        onRequestClose={toggleSources}
        statusBarTranslucent={sourcesVisible && true}
      >
        <View
          style={[
            styles.sourcesContainer,
            { backgroundColor: mode.colors.background },
          ]}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={toggleHelp}>
              <LeftIcon width={24} color={mode.colors.icon} />
            </TouchableOpacity>
            <Text
              style={{
                color: mode.colors.foreground,
                fontSize: 24,
              }}
            >
              News Sources
            </Text>
          </View>

          <FlatList
            contentContainerStyle={{ paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
            data={sources}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OpenEmailButton url={item.url} style={styles.sources}>
                <Text style={{ color: mode.colors.icon }}>{item.name}</Text>
                <Text style={{ color: mode.colors.icon }}>{item.url}</Text>
                <Text style={{ fontWeight: 'bold', color: mode.colors.icon }}>
                  {item.language.toUpperCase()}, {item.country.toUpperCase()}
                </Text>
              </OpenEmailButton>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderColor: mode.colors.icon,
                }}
              />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    paddingHorizontal: 20,
    height: '100%',
  },
  userInfoContainer: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoTextContainer: {
    marginLeft: 12,
  },
  preferences: {
    height: (windowHeight - 44) / 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#c4c4c4',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    marginTop: 6,
  },
  languageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: Dimensions.get('screen').width / 4,
    backgroundColor: '#f4f3f4',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ffffff',
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 24,
  },
  logoutButton: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  sourcesContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 24,
  },
  sources: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
