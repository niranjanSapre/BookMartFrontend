import { StyleSheet } from "react-native";
import {
    NativeBaseProvider,
    Button,
    Box,
    ScrollView,
    Text,
    View,
    Image,
} from "native-base";
import { Animated, Modal, Alert, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { HStack, VStack } from "native-base";
import axios from "axios";

export default function Buy1() {
    const [liked, setliked] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [wishListId, setWishListId] = useState(-1);

    const navigation = useNavigation();
    const route = useRoute();

    const currentValue = new Animated.Value(1);
    const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

    useEffect(() => {
        if (liked == true) {
            Animated.spring(currentValue, {
                toValue: 2,
                friction: 2,
                useNativeDriver: true,
            }).start(() => {
                Animated.spring(currentValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start(() => {
                    setVisible(false);
                });
            });
        }
        wishListHeartStatus();
    }, [liked]);

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

    const wishListHeartStatus = async () => {
        try {
            const result = await authAxios.get("/wishlist/userwishlist");
            if (result.data.length !== 0) {
                result.data.forEach((element) => {
                    if (
                        element.book.id === route.params.book_id &&
                        element.user.id === global.id
                    ) {
                        setWishListId(element.id);
                        setliked(true);
                    }
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteFromWishlist = async () => {
        try {
            await authAxios.delete(`/wishlist/${wishListId}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const addWishlist = async () => {
        const formData = new FormData();

        formData.append("user", global.id);
        formData.append("book", route.params.book_id);
        formData.append("status", "liked");

        try {
            await authAxios.post("/wishlist/", formData);
        } catch (error) {
            console.log(error.message);
        }
    };

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
            <View backgroundColor="#ffffff" flex={1}>
                <ScrollView>
                    <View
                        style={{
                            marginTop: responsiveHeight(5),
                        }}
                    >
                        <HStack space={8}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={24}
                                numberOfLines={2}
                                style={{ width: 300 }}
                                paddingLeft={2}
                            >
                                {route.params.book_name}
                            </Text>
                            <View top={2}>
                                <AntDesign
                                    name={liked ? "heart" : "hearto"}
                                    size={28}
                                    color={liked ? "red" : "black"}
                                    onPress={() => {
                                        if (liked == false) {
                                            setVisible(true);
                                            setliked(true);
                                            addWishlist();
                                        } else if (liked == true) {
                                            setVisible(false);
                                            setliked(false);
                                            deleteFromWishlist();
                                        }
                                    }}
                                />
                            </View>
                        </HStack>
                    </View>
                    <View style={styles.container}>
                        <HStack space={10}>
                            <VStack space={2}>
                                <Text
                                    fontFamily="Poppins"
                                    numberOfLines={2}
                                    style={{ width: 230 }}
                                >
                                    Author Name: {route.params.book_author}
                                </Text>
                                <Text fontFamily="Poppins">
                                    Seller: {route.params.book_seller}
                                </Text>
                                <Text
                                    fontFamily="Poppins"
                                    numberOfLines={2}
                                    width={250}
                                >
                                    Genre- {route.params.book_genre}
                                </Text>
                                <Text fontFamily="Poppins">
                                    ISBN- {route.params.book_isbn}
                                </Text>
                                <Text fontFamily="Poppins">
                                    Price- {route.params.book_price} {"\u20A8"}.
                                </Text>
                                <Text
                                    fontFamily="Poppins"
                                    fontSize={responsiveFontSize(2.5)}
                                >
                                    About book-
                                </Text>
                                <View
                                    width={370}
                                    h={responsiveHeight(25)}
                                    borderWidth={1}
                                    bgColor={"#FAE5DF"}
                                >
                                    <ScrollView>
                                        <Text
                                            fontFamily="Poppins"
                                            fontSize={14}
                                            editable={false}
                                        >
                                            {route.params.book_description}
                                        </Text>
                                    </ScrollView>
                                </View>
                            </VStack>
                            <Image
                                top={2}
                                left={250}
                                position={"absolute"}
                                borderWidth={2}
                                borderColor={"#000000"}
                                height={137}
                                width={90}
                                source={{ uri: route.params.book_cover_page }}
                                alt="Alternate Text"
                            />
                            {Visible && (
                                <AnimatedIcon
                                    style={{
                                        position: "absolute",
                                        top: 250,
                                        left: responsiveWidth(35),
                                        opacity: 0.7,
                                        elevation: 4,
                                        transform: [
                                            {
                                                scale: currentValue,
                                            },
                                        ],
                                    }}
                                    name="heart"
                                    size={100}
                                    color="red"
                                />
                            )}
                        </HStack>
                    </View>
                    <View>
                        <Text
                            fontSize={responsiveFontSize(2.5)}
                            fontWeight={400}
                            lineHeight={36}
                            width={responsiveWidth(100)}
                            marginTop={5}
                            marginLeft={3}
                            fontFamily="Poppins"
                        >
                            Book Images
                        </Text>
                        <Box>
                            <Box
                                padding={2}
                                left={5}
                                width={"90%"}
                                height={"180"}
                                borderColor={"#000000"}
                            >
                                <HStack space={5}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View>
                                            <Image
                                                marginRight={5}
                                                position={"relative"}
                                                borderWidth={2}
                                                borderColor={"#000000"}
                                                height={137}
                                                width={90}
                                                source={{
                                                    uri: route.params
                                                        .book_cover_page,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </View>
                                        <View>
                                            <Image
                                                marginRight={5}
                                                position={"relative"}
                                                borderWidth={2}
                                                borderColor={"#000000"}
                                                height={137}
                                                width={90}
                                                source={{
                                                    uri: route.params
                                                        .book_page1,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </View>
                                        <View>
                                            <Image
                                                marginRight={5}
                                                position={"relative"}
                                                borderWidth={2}
                                                borderColor={"#000000"}
                                                height={137}
                                                width={90}
                                                source={{
                                                    uri: route.params
                                                        .book_page2,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </View>
                                        <View>
                                            <Image
                                                marginRight={5}
                                                position={"relative"}
                                                borderWidth={2}
                                                borderColor={"#000000"}
                                                height={137}
                                                width={90}
                                                source={{
                                                    uri: route.params
                                                        .book_page3,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </View>
                                        <View>
                                            <Image
                                                marginRight={5}
                                                position={"relative"}
                                                borderWidth={2}
                                                borderColor={"#000000"}
                                                height={137}
                                                width={90}
                                                source={{
                                                    uri: route.params
                                                        .book_last_page,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </View>
                                    </ScrollView>
                                </HStack>
                            </Box>
                        </Box>
                    </View>
                    <View style={styles.tooltip} left={35}>
                        <View
                            style={styles.container1}
                            backgroundColor={"amber.300"}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onResquestClose={() => {
                                    Alert.alert("Modal has been closed");
                                }}
                            >
                                <View style={styles.container1}>
                                    <View style={styles.modalView}>
                                        <Text
                                            fontFamily={"Poppins"}
                                            textAlign="center"
                                        >
                                            Already added in wishlist
                                        </Text>
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                            ]}
                                            onPress={() =>
                                                setModalVisible(!modalVisible)
                                            }
                                        >
                                            <Text
                                                fontFamily={"Poppins"}
                                                style={styles.okText}
                                            >
                                                ok
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
                <View marginTop={4}>
                        <Button.Group
                            isAttached
                            colorScheme="blue"
                            mx={{
                                base: "auto",
                                md: 0,
                            }}
                            size="60"
                        >
                            <Button
                                backgroundColor={"#f5f5f5"}
                                width={responsiveWidth(50)}
                                onPress={() =>
                                    navigation.navigate("ChatUI", {
                                        userName: route.params.book_seller,
                                        id: route.params.book_seller_id,
                                    })
                                }
                            >
                                <HStack space={2}>
                                    <Text
                                        color={"black"}
                                        fontFamily="Poppins"
                                        fontSize={22}
                                    >
                                        Chat
                                    </Text>
                                    <MaterialIcons
                                        name={"chat"}
                                        size={24}
                                        color={"black"}
                                    />
                                </HStack>
                            </Button>
                            <Button
                                variant="outline"
                                backgroundColor={"#ED7966"}
                                width={responsiveWidth(50)}
                                onPress={() =>
                                    navigation.navigate("OrderSummary", {
                                        bookID: route.params.book_id,
                                        bookName: route.params.book_name,
                                        bookPrice: route.params.book_price,
                                        bookCoverPage:
                                            route.params.book_cover_page,
                                        bookSeller: route.params.book_seller,
                                        bookISBN: route.params.book_isbn,
                                        bookGenre: route.params.book_genre,
                                    })
                                }
                            >
                                <Text
                                    color={"#ffffff"}
                                    fontFamily="Poppins"
                                    fontSize={22}
                                >
                                    Buy Now
                                </Text>
                            </Button>
                        </Button.Group>
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
    container1: {
        flex: 1,
        backgroundColor: "#FFFFFF95",
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        top: responsiveHeight(2),
        width: responsiveWidth(35),
        height: responsiveHeight(4),
        borderRadius: 5,
        padding: 4,
        elevation: 12,
    },
    buttonClose: {
        backgroundColor: "#ED7966",
    },
    modalText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    okText: {
        textAlign: "center",
        color: "white",
    },
});
