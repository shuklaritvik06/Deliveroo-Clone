import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FeatureCard from "./RestaurantCard";
import sanity from "../../sanity";
import { DELIVEROO_COLOR } from "../../globals/global";

const FeatureOffer = ({ id, secTitle, desc }) => {
  const [restaurants, setrestaurants] = useState([]);
  useLayoutEffect(() => {
    sanity
      .fetch(
        `*[_type=="featured" && _id==$id]{
  ...,
  restaurants[]->{
    ...,
    dishes[]->,
    type->{
      name
    }
  },
}[0]`,
        {
          id
        }
      )
      .then((data) => {
        setrestaurants(data?.restaurants);
      });
  }, [id]);
  return (
    <>
      <View className="flex flex-row items-center mx-4 my-2 justify-between">
        <View>
          <Text className="font-bold text-lg">{secTitle}</Text>
          <Text className="text-gray-500 text-xs">{desc}</Text>
        </View>
        <ArrowRightIcon size={20} color={DELIVEROO_COLOR} />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10
        }}
      >
        {restaurants?.map((restaurant) => {
          return (
            <FeatureCard
              id={restaurant._id}
              key={restaurant._id}
              address={restaurant.address}
              dishes={restaurant.dishes}
              genre={restaurant.type?.name}
              imageURL={restaurant.image}
              lat={restaurant.lat}
              long={restaurant.long}
              rating={restaurant.rating}
              short_description={restaurant.short_description}
              title={restaurant.name}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

export default FeatureOffer;
