import { Alert, Platform, Share } from 'react-native';

const onShare = async (item) => {
  try {
    let text = `${item.title} \n\n See more about the news...\n Download World News App\n`;
    if (Platform.OS === 'android') {
      text = text.concat(
        'https://play.google.com/store/apps/details?id=com.tdksozlukreactnative',
      );
    } else {
      text = text.concat('https://itunes.apple.com');
    }
    await Share.share({
      title: 'Cekmecem News',
      message: text,
      url: 'app://cekmecemnews',
    });
  } catch (err) {
    Alert.alert(
      'Error occured',
      'Error while trying to share a news, please try again',
    );
  }
};

export { onShare };
