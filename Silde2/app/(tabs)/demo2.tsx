import { Text, View, Button } from 'react-native';
import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext('light');

export function UseContextScreen() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={theme}>
      <View style={{marginTop: 50}}>
        <Text>UseContextScreen</Text>
        <Button title="Đổi theme" onPress={toggleTheme} />
        <Paragraph />
      </View>
    </ThemeContext.Provider>
  );
}

function Paragraph() {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme === 'light' ? 'white' : 'gray', padding: 10 }}>
      <Text style={{ color: theme === 'light' ? 'black' : 'white' }}>
        Lớp học React Native là một lớp học tuyệt vời, với những kiến thức cực kỳ dễ học và tràn đầy yêu thương.
      </Text>
    </View>
  );
}

export default UseContextScreen;
