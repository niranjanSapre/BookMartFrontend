import { StyleSheet } from "react-native";
import React from "react";
import {
    NativeBaseProvider,
    Button,
    Box,
    Text,
    View,
    Image,
    Spacer,
    HStack,
    VStack,
} from "native-base";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function OrderSummary() {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                <Text style={styles.orderSummaryText} fontFamily="Poppins">
                    Order Summary
                </Text>
                <Box style={styles.rectangle1}>
                    <View style={styles.content1}>
                        <HStack>
                            <VStack space={responsiveHeight(8)}>
                                <VStack space={1}>
                                    <Text fontFamily="Poppins" fontSize={20}>
                                        BOOK DETAILS
                                    </Text>

                                    <Text
                                        fontFamily="Poppins"
                                        fontSize={16}
                                        numberOfLines={2}
                                        style={{ width: 150 }}
                                    >
                                        {route.params.bookName}
                                    </Text>
                                    <Text fontFamily="Poppins">
                                        Seller- {route.params.bookSeller}
                                    </Text>
                                    <Text fontFamily="Poppins">
                                        ISBN- {route.params.bookISBN}
                                    </Text>
                                    <Text
                                        fontFamily="Poppins"
                                        numberOfLines={1}
                                        style={{ width: 150 }}
                                    >
                                        Genre- {route.params.bookGenre}
                                    </Text>
                                    <Text fontFamily="Poppins" fontSize={16}>
                                        Price- {route.params.bookPrice}{" "}
                                        {"\u20A8"}.
                                    </Text>
                                </VStack>
                            </VStack>
                            <Spacer />
                            <Image
                                marginRight={5}
                                position={"relative"}
                                borderWidth={2}
                                borderColor={"#000000"}
                                height={137}
                                width={90}
                                source={{
                                    uri: route.params.bookCoverPage,
                                }}
                                alt="Alternate Text"
                            />
                        </HStack>
                    </View>
                </Box>

                <Box style={styles.rectangle2}>
                    <View style={styles.content1}>
                        <Text fontFamily="Poppins" fontSize={20}>
                            PRICE DETAILS
                        </Text>
                    </View>
                    <VStack style={styles.content1}>
                        <View>
                            <HStack space={responsiveWidth(50)}>
                                <Text fontFamily="Poppins" fontSize={16}>
                                    Price-
                                </Text>

                                <Text fontFamily="Poppins" fontSize={16}>
                                    {route.params.bookPrice} {"\u20A8"}.
                                </Text>
                            </HStack>
                        </View>
                        <View>
                            <HStack space={responsiveWidth(50)}>
                                <Text fontFamily="Poppins" fontSize={16}>
                                    Delivery
                                </Text>

                                <Text
                                    fontFamily="Poppins"
                                    fontSize={16}
                                    color={"#1DAA07"}
                                >
                                    Free
                                </Text>
                            </HStack>
                        </View>
                    </VStack>

                    <View style={styles.content2}>
                        <HStack space={responsiveWidth(21)}>
                            <Text fontFamily="Poppins" fontSize={18}>
                                Amount Payable
                            </Text>

                            <Text fontFamily="Poppins" fontSize={18}>
                                {route.params.bookPrice} {"\u20A8"}.
                            </Text>
                        </HStack>
                    </View>
                </Box>

                <Box style={styles.rectangle3}>
                    <View>
                        <HStack space={5}>
                            <VStack>
                                <View style={styles.content3}>
                                    <Text fontFamily="Poppins" fontSize={18}>
                                        {route.params.bookPrice} {"\u20A8"}.
                                    </Text>

                                    <Text fontFamily="Poppins" fontSize={16}>
                                        Total Payable Amount
                                    </Text>
                                </View>
                            </VStack>

                            <Button
                                width={responsiveWidth(32)}
                                backgroundColor="#ED7966"
                                height={responsiveHeight(5)}
                                top={5}
                                onPress={() =>
                                    navigation.navigate("BillingDetails", {
                                        bookID: route.params.bookID,
                                        bookPrice: route.params.bookPrice,
                                        bookName: route.params.bookName,
                                    })
                                }
                            >
                                <Text
                                    fontFamily="Poppins"
                                    fontSize={15}
                                    color="#ffffff"
                                >
                                    Continue
                                </Text>
                            </Button>
                        </HStack>
                    </View>
                </Box>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    orderSummaryText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(6),
    },
    hstackView: {
        marginTop: responsiveHeight(8),
        paddingLeft: 20,
    },
    changeBtn: {
        opacity: 0.8,
        backgroundColor: "#ED7966",
        width: responsiveWidth(25),
        height: responsiveHeight(5),
        top: -5,
    },
    content1: {
        marginTop: responsiveHeight(3),
        paddingLeft: 20,
    },
    content2: {
        marginTop: responsiveHeight(8),
        paddingLeft: 20,
    },
    content3: {
        marginTop: responsiveHeight(2),
        paddingLeft: 20,
    },
    rectangle1: {
        height: 220,
        width: 350,
        borderWidth: 1,
        left: responsiveWidth(5),
        top: responsiveHeight(11),
        position: "relative",
    },
    rectangle2: {
        height: 250,
        width: 350,
        borderWidth: 1,
        left: responsiveWidth(5),
        top: responsiveHeight(13),
        position: "relative",
    },
    rectangle3: {
        height: 80,
        width: 350,
        borderWidth: 1,
        left: responsiveWidth(5),
        top: responsiveHeight(15),
        position: "relative",
    },
});
