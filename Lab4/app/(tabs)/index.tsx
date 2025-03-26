import React, { useState, useEffect } from 'react';
import { Alert, Image, View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
                Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền Camera và Thư viện để tiếp tục.");
            }
        })();
    }, []);

    const onOpenCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const onPickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: imageUri || 'https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png',
                }}
                style={styles.avatar}
            />
            <View style={{flexDirection: 'row', gap: 20 }}>
              <Button title="📷 Chụp ảnh" onPress={onOpenCamera} />
              <Button title="📂 Chọn ảnh từ thư viện" onPress={onPickImage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
});
