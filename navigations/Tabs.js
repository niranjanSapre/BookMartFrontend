import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import Account from "../screens/Account/Account";
import Chat from "../screens/Chat/Chat";
import Wishlist from "../screens/Wishlist/Wishlist";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import StartSellingPage from "../screens/Sell/StartSellingPage";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -25,
            justifyContent: "center",
            alignItems: "center",
            ...styles.shadow,
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#ED7966",
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
);
const Tabs = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                style: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow,
                },
            }}
        >
            <Tab.Screen
                name="HomeScreenTab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                //top: 5,
                            }}
                        >
                            <Ionicons
                                name={"home"}
                                size={35}
                                color={focused ? "#ED7966" : "black"}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ChatTab"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                //top: 5,
                            }}
                        >
                            <MaterialIcons
                                name={"chat"}
                                size={35}
                                color={focused ? "#ED7966" : "black"}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="StartSellingPageTab"
                component={StartSellingPage}
                options={{
                    tabBarIcon: () => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AntDesign
                                name={"pluscircle"}
                                size={55}
                                color={"white"}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name="WishlistTab"
                component={Wishlist}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                //top: 0,
                            }}
                        >
                            <AntDesign
                                name={focused ? "heart" : "hearto"}
                                size={35}
                                color={focused ? "#ED7966" : "black"}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="AccountTab"
                component={Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                //top: 5,
                            }}
                        >
                            <MaterialCommunityIcons
                                name={"account"}
                                size={35}
                                color={focused ? "#ED7966" : "black"}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});
