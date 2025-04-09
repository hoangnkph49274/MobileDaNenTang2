import React, { useEffect, useState } from 'react';
import { Text, View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuthScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '959395398209-f93d6a7p8tqd34eshacrao56t796vue4.apps.googleusercontent.com',
    androidClientId: '959395398209-f93d6a7p8tqd34eshacrao56t796vue4.apps.googleusercontent.com',
  });
  

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication?.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    setUserInfo(user);
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.title}>Xin chào {userInfo.name}</Text>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text>Email: {userInfo.email}</Text>
          <Button title="Đăng xuất" onPress={logout} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Đăng nhập bằng Google"
          onPress={() => promptAsync()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 16 },
});
