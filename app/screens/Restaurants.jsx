import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons, images, SIZES } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const Restaurants = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    let { item, initialCurrentLocation } = route.params;
    setRestaurants(item), setCurrentLocation(initialCurrentLocation);
  }, []);

  const editPrice = (action, menuId, price) => {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId == menuId);
    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item?.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  };

  const getOrderQty = (id) => {
    let orderItem = orderItems.filter((a) => a.menuId == id);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  };

  const getShoppingQty = () => {
    const itemQty = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemQty;
  };

  const sumOrder = () => {
    const totalPrice = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return totalPrice;
  };
  const renderHeader = () => {
    return (
      <View className="my-4">
        <View className="flex-row  items-center  space-x-10 ">
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.back} className="h-8 w-8 ml-5  " />
            </TouchableOpacity>
          </View>
          <View className="bg-gray-300 w-60 items-center h-8 rounded-lg justify-center">
            <Text className="text-xl  font-bold">{restaurants?.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {restaurants?.menu.map((item, index) => (
          <View
            key={`menu-${index}`}
            style={{
              alignItems: 'center',
            }}
          >
            <View style={{ height: SIZES.height * 0.35 }}>
              <Image
                source={item?.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />
            </View>

            {/*  quntity  count */}
            <View className="flex-row   items-center   bottom-6">
              <TouchableOpacity
                className="bg-white w-16 h-12 items-center justify-center   rounded-l-full"
                onPress={() => editPrice('-', item.menuId, item.price)}
              >
                <FontAwesome name="minus" size={24} />
              </TouchableOpacity>

              <View className="bg-white w-16 h-12 items-center justify-center">
                <Text className="text-3xl">{getOrderQty(item.menuId)}</Text>
              </View>
              <TouchableOpacity
                className="bg-white w-16 h-12 items-center justify-center rounded-r-full"
                onPress={() => editPrice('+', item.menuId, item.price)}
              >
                <FontAwesome name="plus" size={24} />
              </TouchableOpacity>
            </View>
            {/* quntity cout end */}

            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}
            >
              <Text className="text-2xl  text-center  font-bold ">
                {item?.name} -{' '}
                <Text className=" text-orange-500">$ {item.price}</Text>
              </Text>
              <Text className="text-sm  text-center    mt-2 ">
                {item?.description}
              </Text>

              <View className="flex-row items-center space-x-2 mt-2">
                <Image source={icons.fire} className="h-8 w-8" />
                <Text>{item?.calories.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          height: 30,
        }}
      >
        <View
          style={{
            height: SIZES.padding,
          }}
          className="flex-row items-center justify-center "
        >
          {restaurants?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index + 1}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };
  const renderOrder = () => {
    return (
      <View>
        {renderDots()}

        <View className="bg-white ">
          <View className="mt-8 mb-4 flex-row justify-between item-center px-4">
            <Text className="text-xl font-bold">
              {getShoppingQty()} item in Cart
            </Text>
            <Text className="text-xl font-bold">${sumOrder()}</Text>
          </View>
          <View className="mb-4 flex-row justify-between item-center px-4">
            <Text className="text-xl font-bold ">
              <Icon name="map-marker" size={30} />

              <Text className=" "> Location</Text>
            </Text>

            <Text className="text-xl font-bold">
              {' '}
              <Icon name="toggle-on" size={30} color={'#E3E1E0'} /> 888
            </Text>
          </View>
          <View className="mb-4  px-4  justify-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: restaurants,
                  currentLocation: currentLocation,
                })
              }
              className=" bg-orange-600   rounded-2xl h-12  justify-center items-center flex-row w-full mb-2"
            >
              <Text className="text-white text-3xl">Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurants;
