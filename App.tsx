/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren, PropsWithoutRef} from 'react';
import * as React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SurahListPage from './page/SurahList';
import { Route, NativeRouter, Routes } from 'react-router-native';
import SurahPage from './page/SurahPage';
import { RecoilRoot } from 'recoil';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [currentTranslationEdition, setCurrentTranslationEdition] = React.useState("en.asad");
  return (<RecoilRoot>
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NativeRouter>

      <Routes>
          <Route path="/" element={<SurahListPage />} />
          <Route path="/surahlist" element={<SurahListPage  />} />
          <Route path="/surah/:id" element={<SurahPage />} />
      </Routes>
      </NativeRouter>
    </SafeAreaView>
    </RecoilRoot>
  );
}



type DefaultPageProps = PropsWithoutRef<{
  backgroundColor: any;
  isDarkMode: boolean;
}>;

function DefaultPage({backgroundColor: backgroundStyle, isDarkMode}: DefaultPageProps) {
  return <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={backgroundStyle}>
    <Header />
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flex: 1,
      }}>
      <Section title="Step One">
        Edit <Text style={styles.highlight}>App.asdasddsa</Text> to change this
        screen and then come back to see your.
      </Section>
      <View style={{flex: 1, backgroundColor: 'red'}} />
    </View>
  </ScrollView>;
}

function AlternativePage({backgroundColor: backgroundStyle, isDarkMode}: DefaultPageProps) {
  return <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={backgroundStyle}>
    <Header />
    <View
      style={{
        backgroundColor: !isDarkMode ? Colors.black : Colors.white,
        flex: 1,
      }}>
      <Section title="Step One">
        Edit <Text style={styles.highlight}>App.tsxxxxxxxxxx</Text> to change this
        screen and then come back to see your.
      </Section>
      <View style={{flex: 1, backgroundColor: 'red'}} />
    </View>
  </ScrollView>;
}

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  button:{
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    color: '#ff00ff',
  },
});


