import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DashboardScreen from "../screens/home/HomeScreen";
import LiveMapScreen from "../screens/live-map/LiveMap";
import TripsScreen from "../screens/trips-screen/TripScreen";
import ProfileScreen from "../screens/profile-screen/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },

                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#9CA3AF",

                tabBarStyle: {
                    height: 70,
                    backgroundColor: "#FFFFFF",
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 12,
                    paddingBottom: Platform.OS === "android" ? 10 : 20,
                    elevation: 12, // Android shadow
                },

                tabBarIcon: ({ color, focused }) => {
                    let iconName: string = "circle-outline";

                    switch (route.name) {
                        case "Dashboard":
                            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
                            break;
                        case "LiveMap":
                            iconName = focused
                                ? "map-marker-radius"
                                : "map-marker-radius-outline";
                            break;
                        case "Trips":
                            iconName = focused ? "map-clock" : "map-clock-outline";
                            break;
                        case "Profile":
                            iconName = focused
                                ? "account-circle"
                                : "account-circle-outline";
                            break;
                    }

                    return (
                        <View style={{ marginTop: focused ? -4 : 0 }}>
                            <MaterialCommunityIcons
                                name={iconName}
                                size={26}
                                color={color}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="LiveMap" component={LiveMapScreen} />
            <Tab.Screen name="Trips" component={TripsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
