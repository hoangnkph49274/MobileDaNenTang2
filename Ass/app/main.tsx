import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ImageBackground
} from 'react-native';

const plantsData = [
  { id: 1, name: 'Spider Plant', type: 'Lá đứng', price: 250000, image: require('../assets/images/spider-plant.png') },
  { id: 2, name: 'Song of India', type: 'Lá sáng', price: 250000, image: require('../assets/images/song-of-india.png') },
  { id: 3, name: 'Grey Star Calathrea', type: 'Lá sáng', price: 250000, image: require('../assets/images/grey-star.png') },
  { id: 4, name: 'Banana Plant', type: 'Lá sáng', price: 250000, image: require('../assets/images/banana-plant.png') }
];

const planterData = [
  { id: 1, name: 'Planta Trắng', price: 250000, image: require('../assets/images/planta-white.png') },
  { id: 2, name: 'Planta Lemon Balm', price: 250000, image: require('../assets/images/planta-lemon-balm.png') },
  { id: 3, name: 'Planta Rosewood', price: 250000, image: require('../assets/images/planta-rosewood.png') },
  { id: 4, name: 'Planta Dove Grey', price: 250000, image: require('../assets/images/planta-dove-grey.png') }
];

const accessoriesData = [
  { id: 1, name: 'Bình tưới CB2 SAIC', price: 250000, image: require('../assets/images/watering-can.png') },
  { id: 2, name: 'Bình xịt Xiaoda', price: 250000, image: require('../assets/images/watering-can2.png') },
  { id: 3, name: 'Bộ cuốc xẻng mini', price: 250000, image: require('../assets/images/garden-tools.png') },
  { id: 4, name: 'Giá đỡ Finn Terrazzo', price: 250000, image: require('../assets/images/stand.png') }
];

const PlantShopApp = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const renderPlantItem = (item: any) => (
    <TouchableOpacity style={styles.plantItem} key={item.id}>
      <Image source={item.image} style={styles.plantImage} />
      <Text style={styles.plantName}>{item.name}</Text>
      <Text style={styles.plantType}>{item.type}</Text>
      <Text style={styles.plantPrice}>{item.price.toLocaleString()}đ</Text>
    </TouchableOpacity>
  );

  const renderPlanterItem = (item: any) => (
    <TouchableOpacity style={styles.planterItem} key={item.id}>
      <View style={styles.planterImageContainer}>
        <Image source={item.image} style={styles.planterImage} />
        {item.overlay && (
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayText}>{item.overlay}</Text>
          </View>
        )}
      </View>
      <Text style={styles.planterName}>{item.name}</Text>
      <Text style={styles.planterPrice}>{item.price.toLocaleString()}đ</Text>
    </TouchableOpacity>
  );

  const renderAccessoryItem = (item: any) => (
    <TouchableOpacity style={styles.accessoryItem} key={item.id}>
      <Image source={item.image} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{item.name}</Text>
      <Text style={styles.accessoryPrice}>{item.price.toLocaleString()}đ</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroSection}>
        <ImageBackground
            source={require('../assets/images/hero-plants.png')} 
            style={styles.heroSection}
            >
            <Text style={styles.heroTitle}>Planta - tỏa sáng không gian nhà bạn</Text>
            <TouchableOpacity style={styles.newItemsButton}>
                <Text style={styles.newItemsButtonText}>Xem hàng mới →</Text>
            </TouchableOpacity>
        </ImageBackground>
        </View>

        {/* Plants Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Cây trồng</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Xem thêm Cây trồng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planterGrid}>
            {plantsData.map(renderPlantItem)}
          </View>
        </View>

        {/* Planter Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Chậu cây trồng</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Xem thêm Cây trồng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planterGrid}>
            {planterData.map(renderPlanterItem)}
          </View>
        </View>

        {/* Accessories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Phụ kiện</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Xem thêm Phụ kiện</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planterGrid}>
            {accessoriesData.map(renderAccessoryItem)}
          </View>
        </View>

        {/* Combo Section */}
        <View style={styles.comboSection}>
          <Text style={styles.sectionTitle}>Combo chăm sóc (Mới)</Text>
          <TouchableOpacity style={styles.comboItem}>
            <View style={styles.comboContentContainer}>
              <View style={styles.comboTextContainer}>
                <Text style={styles.comboTitle}>Lemon Balm Grow Kit</Text>
                <Text style={styles.comboDescription}>Gồm: hạt giống Lemon Balm, gói đất trồng, chậu Planta, marker đánh dấu</Text>
              </View>
              <Image 
                source={require('../assets/images/lemon-balm-kit.png')} 
                style={styles.comboImage} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setSelectedTab('home')}
        >
          <Text style={selectedTab === 'home' ? styles.activeTab : styles.inactiveTab}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setSelectedTab('search')}
        >
          <Text style={selectedTab === 'search' ? styles.activeTab : styles.inactiveTab}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setSelectedTab('notifications')}
        >
          <Text style={selectedTab === 'notifications' ? styles.activeTab : styles.inactiveTab}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setSelectedTab('profile')}
        >
          <Text style={selectedTab === 'profile' ? styles.activeTab : styles.inactiveTab}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#FFFFFF'
  },
  heroSection: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 15,
    height: 200
  },
  planterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  heroImageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  heroTitle: {
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  newItemsButton: {
    paddingHorizontal: 15,
    marginTop: 10
  },
  newItemsButtonText: {
    color: 'green',
    fontWeight: '600'
  },
  sectionContainer: {
    padding: 15
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  seeMoreText: {
    color: 'green',
    fontSize: 12
  },
  horizontalScroll: {
    paddingHorizontal: 15
  },
  plantItem: {
    marginRight: 10,
    marginTop: 10,
    width: 150,
    backgroundColor: '#f6f6f6',
    padding: 5
  },
  plantImage: {
    width: 140,
    height: 150,
    resizeMode: 'contain'
  },
  plantName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  plantType: {
    fontSize: 12,
    color: 'gray'
  },
  plantPrice: {
    fontSize: 13,
    color: 'green'
  },
  planterItem: {
    marginRight: 10,
    marginTop: 10,
    width: 150,
    backgroundColor: '#f6f6f6',
    padding: 5
  },
  planterImageContainer: {
    position: 'relative'
  },
  planterImage: {
    width: 140,
    height: 150,
    resizeMode: 'contain'
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5
  },
  overlayText: {
    color: 'white',
    fontSize: 10
  },
  planterName: {
    fontSize: 14
  },
  planterPrice: {
    fontSize: 13,
    color: 'green'
  },
  accessoryItem: {
    marginRight: 10,
    marginTop: 10,
    width: 150,
    backgroundColor: '#f6f6f6',
    padding: 5
  },
  accessoryImage: {
    width: 140,
    height: 150,
    resizeMode: 'contain'
  },
  accessoryName: {
    fontSize: 14
  },
  accessoryPrice: {
    fontSize: 13,
    color: 'green'
  },
  comboSection: {
    padding: 15,
    backgroundColor: '#F5F5F5'
  },
  comboItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  comboContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  comboTextContainer: {
    flex: 1,
    marginRight: 10
  },
  comboTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  comboDescription: {
    fontSize: 12,
    color: 'gray'
  },
  comboImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  navItem: {
    alignItems: 'center'
  },
  activeTab: {
    color: 'green',
    fontWeight: 'bold'
  },
  inactiveTab: {
    color: 'gray'
  }
});

export default PlantShopApp;