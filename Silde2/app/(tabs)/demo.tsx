import { Text, View, Button, StyleSheet } from 'react-native';
import React, { useState, useCallback, memo } from 'react';

// Định nghĩa kiểu dữ liệu cho props
interface ContentProps {
  onIncrease: () => void;
}

// Component chính
export const UseCallBackScreen = () => {
  const [count, setCount] = useState(0);

  // Hàm tăng count được tối ưu với useCallback
  const handleIncrease1 = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textCount}>{count}</Text>

      {/* Truyền callback xuống component con */}
      <ContentUseCallBack onIncrease={handleIncrease1} />
    </View>
  );
};

// Component con sử dụng memo để tối ưu re-render
const ContentUseCallBack: React.FC<ContentProps> = memo(({ onIncrease }) => {
  console.log('Component con re-render');

  return (
    <View>
      <Button title="Tăng count" onPress={onIncrease} />
    </View>
  );
});

// Định nghĩa styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  textCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UseCallBackScreen;
