import { Colors } from '@/constants/colors';
import { useSettingsContext } from '@/context/settings-context';
import { StyleSheet, Switch, Text, View } from 'react-native';

const Settings = () => {
  const { theme, setTheme } = useSettingsContext();
  const toggleSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={theme === 'dark'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
});

export default Settings;
