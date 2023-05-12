import { StyleSheet } from "react-native";
import {
    NativeBaseProvider,
    Box,
    Text,
    View,
    Image,
    HStack,
    VStack,
} from "native-base";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { AntDesign } from '@expo/vector-icons'; 

export default function OrderDetails() {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
        Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
    });
    if (!loaded) {
        return null;
    }
    return (
        <NativeBaseProvider>
            <View backgroundColor="#ffffff" flex={1}>
                <View
                    style={{ marginTop: responsiveHeight(5), paddingLeft: 8 }}
                >
                    <Text fontFamily="Poppins" fontSize={24}>
                        Order Details
                    </Text>
                </View>
                <View style={styles.container}>
                    <HStack space={150}>
                        <VStack space={2}>
                            <Text
                                fontFamily="PoppinsBold"
                                numberOfLines={1}
                                width={250}
                            >
                                {route.params.book_name}
                            </Text>
                            <Text fontFamily="Poppins">
                                Seller- {route.params.seller}
                            </Text>
                            <Text
                                fontFamily="Poppins"
                                numberOfLines={1}
                                width={250}
                            >
                                Genre- {route.params.book_genre}
                            </Text>
                            <Text fontFamily="Poppins">
                                ISBN- {route.params.book_isbn}
                            </Text>
                            <Text fontFamily="Poppins">
                                Price- {route.params.price} {"\u20A8"}.
                            </Text>
                            <Text fontFamily="Poppins">
                                Purchase date- {route.params.purchase_date}
                            </Text>
                        </VStack>
                        <Image
                            top={2}
                            left={265}
                            position={"absolute"}
                            borderWidth={2}
                            borderColor={"#000000"}
                            height={137}
                            width={90}
                            source={{ uri: route.params.book_image }}
                            alt="Alternate Text"
                        />
                    </HStack>
                </View>
                <View paddingLeft={4} top={responsiveHeight(2)}>
                    <Box style={styles.rectangle}>
                        <View
                            alignItems={"center"}
                            top={4}
                            paddingRight={responsiveWidth(70)}
                        >
                            <AntDesign name="checkcircle" size={24} color="purple" />
                            <View
                                style={{
                                    width: 2,
                                    height: 75,
                                    backgroundColor: "purple",
                                }}
                            ></View>
                            <AntDesign name="checkcircle" size={24} color="#fad02c" />
                            <View
                                style={{
                                    width: 2,
                                    height: 75,
                                    backgroundColor: "#fad02c",
                                }}
                            ></View>
                            <AntDesign name="checkcircle" size={24} color="green" />
                        </View>
                        <View>
                            <Text style={styles.orderText} fontFamily="Poppins">
                                Ordered
                            </Text>
                            <Text style={styles.outText} fontFamily="Poppins">
                                Out for delivery
                            </Text>
                            <Text
                                style={styles.deliveryText}
                                fontFamily="Poppins"
                            >
                                Delivered
                            </Text>
                        </View>
                    </Box>
                </View>
                <View paddingLeft={4} top={responsiveHeight(4)}>
                    <Box style={styles.rectangle2}>
                        <Text fontFamily="Poppins" opacity={0.5} left={1} paddingBottom={5}>
                            Shipping Details
                        </Text>
                        <Text style={styles.buyerName} fontFamily="Poppins">
                            {route.params.buyername}
                        </Text>
                        <Text fontFamily="Poppins" left={2} top={2}>
                            Address- {route.params.buyeraddress}
                        </Text>
                        <Text fontFamily="Poppins" left={2} top={2}>
                            Mobile No.- {route.params.buyermobile}
                        </Text>
                    </Box>
                </View>
            </View>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: responsiveHeight(3),
        paddingLeft: 8,
    },
    rectangle: {
        height: 250,
        width: 350,
        borderWidth: 1,
        position: "relative",
    },
    rectangle2: {
        height: 150,
        width: 350,
        borderWidth: 1,
        position: "relative",
        zIndex: 99,
    },
    orderText: {
        fontSize: responsiveFontSize(2),
        left: 60,
        top: responsiveHeight(-25),
    },
    outText: {
        fontSize: responsiveFontSize(2),
        left: 60,
        top: responsiveHeight(-15.9),
    },
    deliveryText: {
        fontSize: responsiveFontSize(2),
        left: 60,
        top: responsiveHeight(-6.2),
    },
    buyerName: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 400,
        left: 4,
        top: 4,
    },
});
