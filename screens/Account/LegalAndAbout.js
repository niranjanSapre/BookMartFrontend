import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import {
    VStack,
    HStack,
    Image,
    Text,
    View,
    NativeBaseProvider,
} from "native-base";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Aditya, Ankit, Anuja, Niranjan } from "../../assets";

export default function LegalAndAbout() {
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
                <View>
                    <Text style={styles.SupportText} fontFamily="Poppins">
                        About Us
                    </Text>
                    <Text fontFamily="Poppins" style={styles.ParaText}>
                        a urna. Suspendisse sagittis, est nec fermentum
                        molestie, neque enim rhoncus leo pulvinar convallis a eu
                        arcu. a urna. Suspendisse sagittis, est nec fermentum
                        molestie, neque enim rhoncus leo pulvinar convallis a eu
                        arcu.a urna. Suspendisse sagittis, est nec fermentum
                        molestie, neque enim rhoncus leo pulvinar convallis a eu
                        arcu.a urna.
                    </Text>
                </View>

                <View>
                    <Text style={styles.settingText} fontFamily="Poppins">
                        Team
                    </Text>
                    <VStack space={5}>
                        <HStack>
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    source={Ankit}
                                    alt="Alternate text"
                                    height={100}
                                    width={100}
                                    rounded={50}
                                ></Image>
                                <Text paddingTop={5} fontFamily="Poppins">
                                    Ankit Singh
                                </Text>
                                <Text fontFamily="Poppins">
                                    CEO at BookMart
                                </Text>
                            </View>
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    source={Aditya}
                                    alt="Alternate text"
                                    height={100}
                                    width={100}
                                    rounded={50}
                                ></Image>
                                <Text paddingTop={5} fontFamily="Poppins">
                                    Aditya Pandit
                                </Text>
                                <Text fontFamily="Poppins">
                                    CTO at BookMart
                                </Text>
                            </View>
                        </HStack>
                        <HStack>
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    source={Niranjan}
                                    alt="Alternate text"
                                    height={100}
                                    width={100}
                                    rounded={50}
                                ></Image>
                                <Text paddingTop={5} fontFamily="Poppins">
                                    Niranjan Sapre
                                </Text>
                                <Text fontFamily="Poppins">
                                    CMO at BookMart
                                </Text>
                            </View>
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    source={Anuja}
                                    alt="Alternate text"
                                    height={100}
                                    width={100}
                                    rounded={50}
                                ></Image>
                                <Text paddingTop={5} fontFamily="Poppins">
                                    Anuja Ingale
                                </Text>
                                <Text fontFamily="Poppins">
                                    CPO at BookMart
                                </Text>
                            </View>
                        </HStack>
                    </VStack>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    settingText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 65,
        width: responsiveWidth(100),
        left: 20,
        marginTop: responsiveHeight(1),
    },
    SupportText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 30,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(8),
    },
    ParaText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 300,
        lineHeight: 22,
        width: responsiveWidth(90),
        left: 20,
        top: responsiveHeight(0.5),
        marginTop: responsiveWidth(18),
    },
});
