import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import MenuCard from "../components/Menu/MenuCard";
import CartIndicator from "../components/CartIndicator/CartIndicator";

const Restaurant = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);
  const {
    params: {
      id,
      imageURL,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat
    }
  } = useRoute();
  return (
    <>
      <ScrollView className="h-screen">
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imageURL).url()
            }}
            className="w-full h-56 bg-gray p-4"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="p-3 bg-white">
          <Text className="text-2xl font-bold">{title}</Text>
          <View className="flex flex-row items-center space-x-1 mt-1">
            <StarIcon size={22} color="gray" opacity={0.5} />
            <Text className="text-xs text-gray-500">
              <Text>{rating}</Text> . {genre}
            </Text>
            <MapPinIcon size={22} color="gray" />
            <Text className="text-xs text-gray-500">Nearby . {address}</Text>
          </View>
          <Text className="mt-2 text-gray-500">{short_description}</Text>
          <View className="w-full h-[0.5px] bg-gray-300 mt-4" />
          <View className="flex flex-row my-3">
            <View className="flex-1 flex-row items-center space-x-3">
              <QuestionMarkCircleIcon size={20} color="gray" />
              <Text className="font-bold">Have a food allergy?</Text>
            </View>
            <ChevronRightIcon size={20} color="#00CCBB" />
          </View>
        </View>
        <View>
          <Text className="font-bold text-xl px-4 pt-6 mb-3">Menu</Text>
          <View className="bg-white p-3">
            {dishes.map((dish) => {
              return (
                <MenuCard
                  restaurant={title}
                  image={dish.image}
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  description={dish.short_description}
                  price={dish.price}
                  lat={lat}
                  long={long}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <CartIndicator title={title} />
    </>
  );
};

export default Restaurant;
