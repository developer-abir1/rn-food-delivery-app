import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';
import {
  categoryData,
  restaurantData,
  initialCurrentLocation,
} from '../utils/fakeData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);

  function onSelectCategory(category) {
    //filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );

    setRestaurants(restaurantList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  const renderCategory = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => onSelectCategory(item)}
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id
                ? COLORS.primary
                : COLORS.lightGray3,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: SIZES.padding,
            ...styles.shadow,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <Text className="text-4xl   font-bold  w-44 ml-4  ">Main Category</Text>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 40,
            paddingRight: 10,
          }}
        />
      </View>
    );
  };

  const renderRestaurantsList = () => {
    const renderItem = ({ item }) => (
      <View className="  m-2 rounded-md   bg-gray-100  shadow-2xl">
        <TouchableOpacity
          className=" pb-5 px-2  "
          onPress={() =>
            navigation.navigate('Restaurants', {
              item,
              initialCurrentLocation,
            })
          }
        >
          <View>
            <Image
              source={item.photo}
              className=" h-52 w-[100%]   rounded-xl  "
              resizeMode="cover"
            />

            <View className="  absolute bg-white   bottom-0 h-10 items-center justify-center  w-28  rounded-tr-xl rounded-bl-xl  ">
              <Text className="text-xl">{item.duration}</Text>
            </View>
          </View>
          <View className="flex-row justify-between px-4">
            <Text className="text-2xl mt-2">{item.name}</Text>
          </View>
          <View className="flex-row  items-center">
            <View className="flex-row   items-center space-x-2 mt-2 ml-2">
              <Icon name={'star'} size={24} color={'#E38617'} />
              <Text className="text-xl">{item.rating}</Text>
            </View>

            <View className="flex-row   items-center   space-x-1  mt-2 ml-2">
              {item.categories.map((categoryId) => {
                return (
                  <View key={categoryId}>
                    <Text className="text-sm text-gray-500 ">
                      {getCategoryNameById(categoryId)} .
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Price */}

            <View className="flex-row items-center mt-2 ml-12 space-x-1">
              {[1, 2, 3].map((priceRating) => (
                <Text
                  key={priceRating}
                  className={`text-sm ${
                    priceRating <= item.priceRating
                      ? 'text-black'
                      : 'text-gray-400'
                  }`}
                >
                  $
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingBottom: 350,
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      {/* Header section start */}
      <View className="flex-row justify-between px-4 mt-4 items-center mb-4">
        <View>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={40} />
        </View>
        <View>
          <TextInput
            placeholder="Search Resturant and favroit food "
            className="border  w-52 rounded-full h-10 text-center text-2xl font-semibold bg-gray-200"
            value={'Location'}
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text className="text-3xl absolute z-10 left-8  bottom-4 text-red-500">
              0
            </Text>
            <MaterialCommunityIcons name="shopping" size={40} color="#EF580C" />
          </TouchableOpacity>
        </View>
      </View>

      {renderCategory()}

      {renderRestaurantsList()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
