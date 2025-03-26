import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, SafeAreaView, Alert, StyleSheet } from "react-native";
import { Audio, AVPlaybackSource } from "expo-av";
import Icon from 'react-native-vector-icons/Feather';
import { ImageBackground } from "react-native";

const playlist = [
  {
    title: "Head In The Clouds",
    artist: "Hayd",
    uri: { uri: "https://files.catbox.moe/uejax3.mp3" } as AVPlaybackSource,
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sVXq9fqAXRhcdQzucFL9UU2vzd8z_8VCOQ&s" },
  },
  {
    title: "Daylight ",
    artist: "David Kushner",
    uri: { uri: "https://files.catbox.moe/kp8l4h.mp3" } as AVPlaybackSource,
    image: { uri: "https://i.scdn.co/image/ab67616d0000b2733d4b0b2c50c89d7c433f6b96" },
  },
  {
    title: "7 Years",
    artist: "Lukas Graham",
    uri: { uri: "https://files.catbox.moe/2ds9h1.mp3" } as AVPlaybackSource,
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjF87AVffXSg8MmDFMVMZOy6ivAB7lTIt7A&s" },
  },
  {
    title: "Em cưới rồi à remix",
    artist: "Thanh Hưng",
    uri: { uri: "https://files.catbox.moe/tg5j7e.mp3" } as AVPlaybackSource,
    image: { uri: "https://i.ytimg.com/vi/T_61bDvM4YI/0.jpg" },
  },
];

const AudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Khởi tạo Audio Mode khi component mount
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.error("Lỗi cấu hình âm thanh:", error);
      }
    };

    setupAudio();
  }, []);

  async function loadSound(trackIndex: number) {
    try {
      // Giải phóng âm thanh cũ nếu có
      if (sound) {
        await sound.unloadAsync();
      }

      // Tạo âm thanh mới
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        playlist[trackIndex].uri,
        { shouldPlay: false }
      );

      // Thiết lập sự kiện cập nhật trạng thái
      newSound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.isLoaded) {
          setPlaybackPosition(playbackStatus.positionMillis);
          setDuration(playbackStatus.durationMillis || 0);
          
          // Cập nhật trạng thái phát
          setIsPlaying(playbackStatus.isPlaying);
        }
      });

      setSound(newSound);
      return newSound;
    } catch (error) {
      console.error("Lỗi tải âm thanh:", error);
      Alert.alert("Lỗi", "Không thể tải bài hát. Vui lòng thử lại.");
      return null;
    }
  }

  async function togglePlayPause() {
    try {
      // Nếu chưa có âm thanh, tải và phát
      if (!sound) {
        const newSound = await loadSound(currentTrack);
        if (newSound) {
          await newSound.playAsync();
          setIsPlaying(true);
          return;
        }
      }

      // Kiểm tra trạng thái hiện tại
      const status = await sound?.getStatusAsync();
      
      if (status?.isLoaded) {
        if (status.isPlaying) {
          // Đang phát thì dừng
          await sound?.pauseAsync();
          setIsPlaying(false);
        } else {
          // Đang dừng thì phát
          await sound?.playAsync();
          setIsPlaying(true);
        }
      } else {
        // Nếu không tải được, thử lại
        const newSound = await loadSound(currentTrack);
        if (newSound) {
          await newSound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Lỗi chuyển đổi trạng thái phát:", error);
      Alert.alert("Lỗi", "Không thể điều khiển âm thanh. Vui lòng thử lại.");
    }
  }

  async function nextTrack() {
    try {
      const nextTrackIndex = (currentTrack + 1) % playlist.length;
      setCurrentTrack(nextTrackIndex);
      
      // Tải và phát bài hát mới
      const newSound = await loadSound(nextTrackIndex);
      if (newSound) {
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Lỗi chuyển bài kế tiếp:", error);
      Alert.alert("Lỗi", "Không thể chuyển bài hát. Vui lòng thử lại.");
    }
  }

  async function prevTrack() {
    try {
      const prevTrackIndex = (currentTrack - 1 + playlist.length) % playlist.length;
      setCurrentTrack(prevTrackIndex);
      
      // Tải và phát bài hát mới
      const newSound = await loadSound(prevTrackIndex);
      if (newSound) {
        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Lỗi chuyển bài trước:", error);
      Alert.alert("Lỗi", "Không thể chuyển bài hát. Vui lòng thử lại.");
    }
  }

  // Cleanup khi component bị hủy
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ImageBackground
      source={playlist[currentTrack].image }
      style={styles.background}
    >
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 20 
      }}>
        <Image 
          source={playlist[currentTrack].image} 
          style={{ 
            width: 300, 
            height: 300, 
            borderRadius: 10, 
            marginBottom: 30 
          }} 
        />
        
        <Text style={{ 
          color: 'white', 
          fontSize: 24, 
          fontWeight: 'bold' 
        }}>
          {playlist[currentTrack].title}
        </Text>
        <Text style={{ 
          color: 'gray', 
          fontSize: 16, 
          marginBottom: 20 
        }}>
          {playlist[currentTrack].artist}
        </Text>

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 20 
        }}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            {formatTime(playbackPosition)}
          </Text>
          <View style={{ 
            flex: 1, 
            height: 4, 
            backgroundColor: 'rgba(255,255,255,0.3)' 
          }}>
            <View 
              style={{ 
                width: `${(playbackPosition / duration) * 100}%`, 
                height: '100%', 
                backgroundColor: 'white' 
              }} 
            />
          </View>
          <Text style={{ color: 'white', marginLeft: 10 }}>
            {formatTime(duration)}
          </Text>
        </View>

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 40 
        }}>
          <TouchableOpacity onPress={prevTrack}>
            <Icon name="chevron-left" color="white" size={36} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={togglePlayPause} 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: 50, 
              padding: 15 
            }}
          >
            {isPlaying ? (
              <Icon name="pause" color="black" size={30} />
            ) : ( 
              <Icon name="play" color="black" size={30} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={nextTrack}>
            <Icon name="chevron-right" color="white" size={36} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
})
export default AudioPlayer;