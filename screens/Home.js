import { Text, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
} from "react-native-heroicons/outline";
import Categories from "../components/Category/Categories";
import FeatureOffer from "../components/Restaurants/FeatureOffers";
import { ScrollView } from "react-native";
import sanity from "../sanity";

const Home = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);
  const [featuredCategories, setfeaturedCategories] = useState([]);
  useEffect(() => {
    sanity
      .fetch(
        `*[_type=="featured"]{
  ...,
  restaurants[]->{
    ...,
    dishes[]->
  },
}`
      )
      .then((data) => {
        setfeaturedCategories(data);
      });
  }, []);
  return (
    <>
      <SafeAreaView className="pt-3 bg-white h-screen">
        <View className="flex flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          ></Image>
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location <ChevronDownIcon size={"20"} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>
        <View className="flex items-center flex-row space-x-2 mt-2 mx-2 pb-3">
          <View className="flex-1 p-3 flex-row items-center bg-gray-200 mx-1 space-x-2">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
              className="w-full"
            />
          </View>
          <AdjustmentsVerticalIcon
            size={25}
            color="#00CCBB"
            className="flexitems-center"
          />
        </View>
        {/* Main */}
        <ScrollView>
          <View>
            <Categories />
          </View>
          {featuredCategories?.map((category) => {
            return (
              <FeatureOffer
                key={category._id}
                id={category._id}
                desc={category.short_description}
                secTitle={category.name}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
