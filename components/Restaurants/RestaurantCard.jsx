import { View, Text, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";

const FeatureCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="shadow border border-gray-300 bg-white mr-3 rounded-md"
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(imageURL).url()
        }}
        className="h-40 w-60 rounded-md"
      />
      <View className="py-4 px-2">
        <Text className="font-bold text-lg">{title}</Text>
        <View className="flex flex-row items-center space-x-1 mt-1">
          <StarIcon size={22} color="green" opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-1 mt-1">
          <MapPinIcon size={22} opacity={0.5} color="gray" />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;
