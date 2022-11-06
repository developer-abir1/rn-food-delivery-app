import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { COLORS, icons } from '../constants';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Ionicons';
// AIzaSyCxAfa9YkK0G0NWs22bOJTcIM31cRuQNUk
const apikeyGps = 'AIzaSyBhbw6YZb8bD0bXGPYNr7rxCJ2kiO4S4W8';
const OrderDelivery = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    let { restaurant, currentLocation } = route.params;

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const renderMap = () => {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}
          >
            <Image
              source={icons.pin}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker coordinate={fromLocation} anchor={{ x: 0.5, y: 0.5 }} flat={true}>
        <Image
          source={icons.car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        >
          <MapViewDirections
            origin={fromLocation}
            apikey={apikeyGps}
            destination={toLocation}
            strokeWidth={5}
            optimizeWaypoints={true}
            strokeColor={COLORS.primary}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  };

  const renderDstinationinfo = () => {
    return (
      <View className="  absolute  item-center justifyContent mt-12 ml-6   ">
        <View className="flex-row items-center  space-x-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={50} />
          </TouchableOpacity>
          <View className="  bg-slate-100 w-60  items-center h-8  justify-center rounded-full">
            <Text className="text-xl font-bold">{streetName}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCoustomerinfo = () => {
    return (
      <View className="bg-white absolute  bottom-0  w-full pb-4">
        <View className="px-4">
          <View className="flex-row  justify-between mt-4 items-center  ">
            <Image
              source={restaurant?.courier.avatar}
              className="h-14 w-14  "
            />
            <Text className="text-3xl">{restaurant?.courier.name}</Text>
          </View>
          <View className="mt-2 flex-row justify-between">
            <TouchableOpacity className="  bg-orange-500 w-40 rounded h-10 items-center justify-center">
              <Text className="text-3xl text-center text-white">Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity className="  bg-gray-200 hover:bg-slate-300 w-40 rounded h-10 items-center justify-center">
              <Text className="text-3xl text-center  ">SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDstinationinfo()}
      {renderCoustomerinfo()}
    </View>
  );
};

export default OrderDelivery;
