import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const CategoryCard = ({ imageURL, title }) => {
  return (
    <TouchableOpacity className="mr-2">
      <Image source={{ uri: imageURL }} className="h-20 w-20 rounded" />
      <Text className="bottom-5 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
