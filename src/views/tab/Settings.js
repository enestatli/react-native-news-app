import React, { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Close,
  DarkModeIcon,
  HelpIcon,
  Language,
  LeftIcon,
  LocationIcon,
  NotificationIcon,
  RightIcon,
  TimeIcon2,
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

const SettingsView = ({ navigation }) => {
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

  const [timeStatus, setTimeStatus] = useState(false);

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
      id: 'news',
      title: strings.loc,
      switch: true,
      icon: <LocationIcon width={24} color={mode.colors.icon} />,
      switchComp: (
        <Switch
          style={{ marginLeft: 'auto', width: 36, height: 24 }}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
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
      id: 'block',
      title: strings.block,
      switch: true,
      icon: <Close width={24} color={mode.colors.icon} />,
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
      id: 'help',
      title: strings.help,
      switch: false,
      icon: <HelpIcon width={24} color={mode.colors.icon} />,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      // console.log(Number(new Date().getHours()) < 20);
      StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
      // StatusBar.setTranslucent(false);
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(mode.colors.background);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
              : () => console.log('clicked')
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
      {/* Header */}
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

      {/* User Info */}
      <View style={{ padding: 20 }}>
        <View style={styles.userInfo}>
          <Avatar size={64} color={mode.colors.primary} />
          {!user && (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 32,
                borderRadius: 6,
                borderColor: mode.colors.icon,
                borderWidth: 1,
                marginHorizontal: 24,
              }}
              onPress={authButton}
            >
              <Text style={{ color: mode.colors.icon }}>{strings.login}</Text>
            </TouchableOpacity>
          )}
          {user && (
            <>
              <View style={styles.userInfoTextContainer}>
                <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
                  Enes Tatli
                </Text>
                <Text style={{ color: mode.colors.icon, marginTop: 6 }}>
                  {user?.email}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: mode.colors.primary,
                    width: 60,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                  }}
                  onPress={() => logout()}
                >
                  <Text style={{ color: 'white' }}>{strings.logout}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
      {/* Preferences */}
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{ fontSize: 16, fontWeight: 'bold', color: mode.colors.icon }}
        >
          {strings.preferences}
        </Text>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
      <TimeChart bs={timeStatus} tb={showTimeChart} theme={mode} />
      {/* TODO move languagemodal to components */}
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
      {/* son */}
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    width: '100%',
    position: 'relative',
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
    // height: 48,
    height: (Dimensions.get('screen').height - 44 - 84) / 14,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 12,
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
});
