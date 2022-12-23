import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { XMarkIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { DELIVEROO_COLOR } from "../globals/global";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getRestaurant } from "../slices/cartSlice";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigator = useNavigation();
  navigator.setOptions({
    presentation: "fullScreenModal",
    headerShown: false,
    gestureEnabled: false
  });
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setConfirmed(true);
    }, 3000);
  });
  const data = useSelector(getRestaurant);
  const dispatch = useDispatch();
  return (
    <>
      {confirmed ? (
        <View className="bg-primary flex-1">
          <View className="z-50">
            <SafeAreaView className="relative z-50">
              <View className="flex-row items-center justify-between p-4">
                <TouchableOpacity
                  onPress={() => {
                    dispatch(clearCart());
                    navigator.navigate("Home");
                  }}
                >
                  <XMarkIcon size={35} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg">Order Help</Text>
              </View>
              <View className="bg-white mx-3 my-3 p-6 rounded-lg flex-row justify-between">
                <View>
                  <Text className="text-lg text-gray-400">
                    Estimated Arrival
                  </Text>
                  <Text className="text-4xl font-bold">30-35 Minutes</Text>
                  <Progress.Bar
                    indeterminate={true}
                    color={DELIVEROO_COLOR}
                    className="my-3"
                  />
                  <Text className="text-gray-500">
                    Your order at {data?.payload.restaurant.split(" ")[0]} is
                    being prepared
                  </Text>
                </View>
                <Image
                  source={{
                    uri: "https://links.papareact.com/fls"
                  }}
                  className="h-20 w-20"
                />
              </View>
            </SafeAreaView>
          </View>
          <MapView
            initialRegion={{
              latitude: data?.payload.lat,
              longitude: data?.payload.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            className="flex-1 -mt-10 z-0"
            mapType="mutedStandard"
          >
            <Marker
              coordinate={{
                latitude: data?.payload.lat,
                longitude: data?.payload.long
              }}
              title={data?.payload.restaurant}
              description={data?.payload.description}
              identifier="origin"
              pinColor={DELIVEROO_COLOR}
            />
          </MapView>
          <View className="absolute bottom-0 bg-white z-50 w-full p-5 flex-row items-center justify-between">
            <View className="flex-row items-center space-x-5">
              <Image
                source={{
                  uri: "https://links.papareact.com/wru"
                }}
                className="h-14 w-14 rounded-full bg-gray-200"
              />
              <View>
                <Text className="text-lg">Ramesh Tiwari</Text>
                <Text className="text-gray-500 text-xs">Your Rider</Text>
              </View>
            </View>
            <Text className="text-primary text-lg font-semibold">Call</Text>
          </View>
        </View>
      ) : (
        <View className="bg-primary flex-1 justify-center items-center">
          <Progress.Circle color="white" size={60} indeterminate={true} />
          <Text className="text-white font-bold mt-9 text-base">
            Waiting for Restaurant to confirm your order!
          </Text>
        </View>
      )}
    </>
  );
};

export default DeliveryScreen;
