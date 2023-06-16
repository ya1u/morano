import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  // RefreshControl,
  // ScrollView,
  StatusBar,
} from 'react-native';

import Header from './src/components/Header';
import LanguageSet from './src/components/LanguageSet';
import Translate from './src/components/Translate';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('ko');
  // const [refreshing, setRefreshing] = useState(false);

  const loadDarkModeState = useCallback(async () => {
    try {
      const storedDarkModeState = await AsyncStorage.getItem('isDarkMode');
      if (storedDarkModeState !== null) {
        setIsDarkMode(JSON.parse(storedDarkModeState));
      }
    } catch (error) {
      console.log('Error loading dark mode state:', error);
    }
  }, []);

  const saveDarkModeState = useCallback(async () => {
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.log('Error saving dark mode state:', error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    loadDarkModeState();
  }, [loadDarkModeState]);

  useEffect(() => {
    saveDarkModeState();
  }, [saveDarkModeState]);

  const darkModeSwitch = useCallback(() => {
    setIsDarkMode(previousState => !previousState);
  }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  return (
    <View style={styles.container}>
      <View
        // <ScrollView
        // contentContainerStyle={styles.container}
        style={styles.container}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        {/* <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
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
      </View>
      {/* </ScrollView> */}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlashMessage position="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
