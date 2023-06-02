import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    const loadDarkModeState = async () => {
      try {
        const storedDarkModeState = await AsyncStorage.getItem('isDarkMode');
        if (storedDarkModeState !== null) {
          setIsDarkMode(JSON.parse(storedDarkModeState));
        }
      } catch (error) {
        console.log('Error loading dark mode state:', error);
      }
    };

    loadDarkModeState();
  }, []);

  useEffect(() => {
    const saveDarkModeState = async () => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      } catch (error) {
        console.log('Error saving dark mode state:', error);
      }
    };

    saveDarkModeState();
  }, [isDarkMode]);

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
      {isDarkMode ? (
        <StatusBar barStyle={'light-content'} />
      ) : (
        <StatusBar barStyle={'dark-content'} />
      )}
      <FlashMessage position="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
