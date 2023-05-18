import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from './src/components/Header';
import LanguageSet from './src/components/LanguageSet';
import Translate from './src/components/Translate';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const darkModeSwitch = () => setIsDarkMode(previousState => !previousState);

  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('ko');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header isDarkMode={isDarkMode} darkModeSwitch={darkModeSwitch} />
        <LanguageSet
          isDarkMode={isDarkMode}
          sourceLang={sourceLang}
          setSourceLang={setSourceLang}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
        />
        <Translate
          isDarkMode={isDarkMode}
          sourceLang={sourceLang}
          targetLang={targetLang}
        />
      </ScrollView>
      {isDarkMode ? <StatusBar barStyle={'light-content'} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
