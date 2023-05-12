import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
    NativeBaseProvider,
    Text,
    View,
    Image,
    Button,
    VStack,
    HStack,
    Spacer,
    Box,
} from "native-base";
import { useFonts } from "expo-font";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { WishlistImg } from "../../assets";

export default function Wishlist() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [wishlistData, setWishlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const accessToken = global.token;
    const apiUrl = global.apiUrl;

    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const deleteWishlistItem = async () => {
        try {
            const response = await authAxios.get("/wishlist/deletewishlist");
            setWishlistData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const userWishlist = async () => {
        try {
            const response = await authAxios.get("/wishlist/userwishlist");
            setWishlistData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const addToLocalWishlist = async (id) => {
        const formData = new FormData();

        formData.append("status", "liked");

        try {
            await authAxios.patch(`/wishlist/${id}`, formData);
            userWishlist();
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteFromLocalWishlist = async (id) => {
        const formData = new FormData();

        formData.append("status", "unliked");

        try {
            await authAxios.patch(`/wishlist/${id}`, formData);
            userWishlist();
        } catch (error) {
            console.log(error.message);
        }
    };

    const data = wishlistData;

    useEffect(() => {
        deleteWishlistItem();
    }, [isFocused]);

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
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <>
                        <Text style={styles.custText} fontFamily="Poppins">
                            Wishlist
                        </Text>

                        {data.length === 0 ? (
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    width={300}
                                    height={250}
                                    source={WishlistImg}
                                    alt="Alternate Text"
                                />
                                <Text
                                    fontFamily="Poppins"
                                    textAlign={"center"}
                                    fontSize={responsiveFontSize(3)}
                                >
                                    Opps! Your Wishlist is empty :{"("}
                                </Text>
                            </View>
                        ) : (
                            <>
                                <ScrollView
                                    top={responsiveHeight(10)}
                                    maxHeight={responsiveHeight(89)}
                                >
                                    <Box>
                                        <FlatList
                                            data={data}
                                            renderItem={({ item }) => (
                                                <Box
                                                    borderBottomWidth="1"
                                                    _dark={{
                                                        borderColor: "muted.50",
                                                    }}
                                                    borderColor="muted.800"
                                                    pl={["0", "4"]}
                                                    pr={["0", "5"]}
                                                    py="2"
                                                >
                                                    <HStack
                                                        space={[2, 3]}
                                                        justifyContent="space-between"
                                                    >
                                                        <Image
                                                            //top={4}
                                                            position={
                                                                "relative"
                                                            }
                                                            borderWidth={2}
                                                            borderColor={
                                                                "#000000"
                                                            }
                                                            width={90}
                                                            height={137}
                                                            left={1.5}
                                                            source={{
                                                                uri: item.book
                                                                    .book_cover_page,
                                                            }}
                                                            alt="Alternate Text"
                                                        />
                                                        <VStack left={1}>
                                                            <Text
                                                                _dark={{
                                                                    color: "warmGray.50",
                                                                }}
                                                                color="coolGray.800"
                                                                fontFamily="PoppinsBold"
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                            >
                                                                {
                                                                    item.book
                                                                        .book_name
                                                                }
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily="Poppins"
                                                            >
                                                                Seller-{" "}
                                                                {
                                                                    item.book
                                                                        .user
                                                                        .username
                                                                }
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily="Poppins"
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                            >
                                                                Genre-{" "}
                                                                {
                                                                    item.book
                                                                        .book_genre
                                                                }
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily="Poppins"
                                                            >
                                                                Price-{" "}
                                                                {
                                                                    item.book
                                                                        .book_price
                                                                }{" "}
                                                                {"\u20A8"}
                                                            </Text>
                                                        </VStack>
                                                        <Spacer />
                                                        <VStack
                                                            space={responsiveHeight(
                                                                8
                                                            )}
                                                            top={1}
                                                        >
                                                            <View
                                                                alignItems={
                                                                    "flex-end"
                                                                }
                                                                right={3}
                                                            >
                                                                <AntDesign
                                                                    name={
                                                                        item.status ===
                                                                        "liked"
                                                                            ? "heart"
                                                                            : "hearto"
                                                                    }
                                                                    size={28}
                                                                    color={
                                                                        item.status ===
                                                                        "liked"
                                                                            ? "red"
                                                                            : "black"
                                                                    }
                                                                    onPress={() => {
                                                                        if (
                                                                            item.status ===
                                                                            "liked"
                                                                        ) {
                                                                            deleteFromLocalWishlist(
                                                                                item.id
                                                                            );
                                                                        } else if (
                                                                            item.status ===
                                                                            "unliked"
                                                                        ) {
                                                                            addToLocalWishlist(
                                                                                item.id
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </View>
                                                            <Button
                                                                width={responsiveWidth(
                                                                    26
                                                                )}
                                                                backgroundColor="#ED7966"
                                                                left={-12}
                                                                onPress={() =>
                                                                    navigation.navigate(
                                                                        "Buy1",
                                                                        {
                                                                            book_id:
                                                                                item
                                                                                    .book
                                                                                    .id,
                                                                            book_isbn:
                                                                                item
                                                                                    .book
                                                                                    .book_isbn,
                                                                            book_name:
                                                                                item
                                                                                    .book
                                                                                    .book_name,
                                                                            book_page:
                                                                                item
                                                                                    .book
                                                                                    .book_page,
                                                                            book_medium:
                                                                                item
                                                                                    .book
                                                                                    .book_medium,
                                                                            book_author:
                                                                                item
                                                                                    .book
                                                                                    .book_author,
                                                                            book_genre:
                                                                                item
                                                                                    .book
                                                                                    .book_genre,
                                                                            book_cover_page:
                                                                                item
                                                                                    .book
                                                                                    .book_cover_page,
                                                                            book_last_page:
                                                                                item
                                                                                    .book
                                                                                    .book_last_page,
                                                                            book_page1:
                                                                                item
                                                                                    .book
                                                                                    .book_page1,
                                                                            book_page2:
                                                                                item
                                                                                    .book
                                                                                    .book_page2,
                                                                            book_page3:
                                                                                item
                                                                                    .book
                                                                                    .book_page3,
                                                                            book_rental:
                                                                                item
                                                                                    .book
                                                                                    .book_rental,
                                                                            book_price:
                                                                                item
                                                                                    .book
                                                                                    .book_price,
                                                                            book_description:
                                                                                item
                                                                                    .book
                                                                                    .book_description,
                                                                            book_seller:
                                                                                item
                                                                                    .book
                                                                                    .user
                                                                                    .username,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    fontFamily="Poppins"
                                                                    fontSize={
                                                                        15
                                                                    }
                                                                    color="#ffffff"
                                                                >
                                                                    Buy Now
                                                                </Text>
                                                            </Button>
                                                        </VStack>
                                                    </HStack>
                                                </Box>
                                            )}
                                            keyExtractor={(item) => item.id}
                                            extraData={data}
                                        />
                                    </Box>
                                </ScrollView>
                            </>
                        )}
                    </>
                )}
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    custText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(8),
    },
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
