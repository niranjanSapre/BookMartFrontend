import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import {
    NativeBaseProvider,
    Button,
    Image,
    Text,
    View,
    HStack,
} from "native-base";
import { useFonts } from "expo-font";
import { Avtar } from "../../assets";

export default function Account() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                <View top={12}>
                    <HStack space={responsiveWidth(16)}>
                        <Image
                            source={Avtar}
                            alt="Alternate text"
                            height={120}
                            width={120}
                            borderRadius={60}
                            left={7}
                        ></Image>

                        <Text
                            marginTop={responsiveHeight(4)}
                            fontSize={responsiveFontSize(2)}
                            fontFamily="Poppins"
                            numberOfLines={2}
                            width={150}
                        >
                            Hello, {global.username}
                        </Text>
                    </HStack>
                </View>
                <View justifyContent={"center"} alignItems={"center"}>
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        top={responsiveHeight(13)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={() => navigation.navigate("PostedProduct")}
                    >
                        <HStack space={responsiveWidth(35)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                color="#ffffff"
                            >
                                Posted Product
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        top={responsiveHeight(16)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={() => navigation.navigate("MyOrder")}
                    >
                        <HStack space={responsiveWidth(51)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                left={responsiveWidth(0)}
                                color="#ffffff"
                            >
                                My Orders
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        top={responsiveHeight(19)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <HStack space={responsiveWidth(57)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                left={responsiveWidth(0)}
                                color="#ffffff"
                            >
                                Settings
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                </View>
            </View>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    acc: {
        top: responsiveHeight(3),
    },
});
