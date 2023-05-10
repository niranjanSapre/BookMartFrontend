import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
    useNavigation,
    useFocusEffect,
    useIsFocused,
} from "@react-navigation/native";
import {
    NativeBaseProvider,
    Image,
    Box,
    Text,
    View,
    Stack,
    HStack,
    ScrollView,
    Pressable,
} from "native-base";
import { useFonts } from "expo-font";
import {
    Novel,
    Biography,
    Fantasy,
    Fiction,
    Mystery,
    Mythology,
    Narrative,
    Romance,
    ScienceFiction,
    SelfHelp,
    Thriller,
} from "../../assets";
import axios from "axios";
import {
    ActivityIndicator,
    StyleSheet,
    BackHandler,
    Alert,
} from "react-native";
import "../global";
import { NoData } from "../../assets";

export default function HomeScreen() {
    const navigation = useNavigation();
    const IsFocused = useIsFocused();

    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const logoutAlert = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Yes",
                onPress: () => {
                    navigation.navigate("Login");
                },
            },
            {
                text: "No",
            },
        ]);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                logoutAlert();
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPress
                );
        }, [navigation])
    );

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

    const bookDetails = async () => {
        try {
            const response = await authAxios.get("/sell/all");
            const filterData = [];
            response.data.forEach((element) => {
                if (
                    element.user.id !== global.id &&
                    element.status !== "Sold"
                ) {
                    filterData.push(element);
                }
            });
            setBookData(filterData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        useCallback(() => {
            bookDetails();
        }),
        [IsFocused]
    );

    const send = (i) => {
        navigation.navigate("Buy1", {
            book_id: bookData[i].id,
            book_isbn: bookData[i].book_isbn,
            book_name: bookData[i].book_name,
            book_page: bookData[i].book_page,
            book_medium: bookData[i].book_medium,
            book_author: bookData[i].book_author,
            book_genre: bookData[i].book_genre,
            book_cover_page: bookData[i].book_cover_page,
            book_last_page: bookData[i].book_last_page,
            book_page1: bookData[i].book_page1,
            book_page2: bookData[i].book_page2,
            book_page3: bookData[i].book_page3,
            book_rental: bookData[i].book_rental,
            book_price: bookData[i].book_price,
            book_description: bookData[i].book_description,
            book_seller: bookData[i].user.username,
            book_seller_id: bookData[i].user.id,
        });
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
            <View backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <View>
                        <Pressable
                            onPress={() =>
                                navigation.navigate("Search", {
                                    bookData: bookData,
                                })
                            }
                        >
                            <View marginTop={10} left={-60}>
                                <Stack space={2} w="80%" maxW="300px" mx={20}>
                                    <HStack space={2.5}>
                                        <View
                                            width={"112%"}
                                            fontSize={responsiveFontSize(1.8)}
                                            fontFamily="Poppins"
                                            bgColor={"#FAE5DF"}
                                            borderColor={"#ed7966"}
                                            height={responsiveHeight(5.5)}
                                            borderRadius={20}
                                            borderWidth={1}
                                            justifyContent={"center"}
                                        >
                                            <Text
                                                fontFamily="Poppins"
                                                opacity={0.4}
                                                paddingLeft={2.5}
                                            >
                                                Search Novels, Comic,
                                                Biography,..
                                            </Text>
                                        </View>
                                    </HStack>
                                </Stack>
                            </View>
                        </Pressable>
                        <View
                            height={83}
                            borderWidth={1}
                            padding={2}
                            borderRadius={25}
                            left={5}
                            top={"5"}
                            width={"90%"}
                            bgColor={"#F5CAC2"}
                            opacity={0.8}
                            borderColor={"#ED7966"}
                        >
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                borderRadius={20}
                            >
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Novel",
                                        })
                                    }
                                >
                                    <Image
                                        marginRight={2}
                                        rounded={70}
                                        position={"relative"}
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        height={65}
                                        width={65}
                                        source={Novel}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Biography",
                                        })
                                    }
                                >
                                    <Image
                                        marginRight={2}
                                        rounded={70}
                                        position={"relative"}
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        height={65}
                                        width={65}
                                        source={Biography}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Fantasy",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        marginRight={2}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        width={65}
                                        source={Fantasy}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Fiction",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        marginRight={2}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        width={65}
                                        source={Fiction}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Mystery",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        marginRight={2}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        width={65}
                                        source={Mystery}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Mythology",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        marginRight={2}
                                        position={"relative"}
                                        height={65}
                                        width={65}
                                        source={Mythology}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Narrative",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        marginRight={2}
                                        width={65}
                                        source={Narrative}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Romance",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        marginRight={2}
                                        width={65}
                                        source={Romance}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Science Fiction",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        position={"relative"}
                                        marginRight={2}
                                        height={65}
                                        width={65}
                                        source={ScienceFiction}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Self-Help",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        marginRight={2}
                                        width={65}
                                        source={SelfHelp}
                                        alt="Alternate Text"
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("GenreFilter", {
                                            bookData: bookData,
                                            bookGenre: "Thriller",
                                        })
                                    }
                                >
                                    <Image
                                        borderWidth={2}
                                        borderColor={"#000000"}
                                        rounded={70}
                                        position={"relative"}
                                        height={65}
                                        width={65}
                                        marginRight={2}
                                        source={Thriller}
                                        alt="Alternate Text"
                                    />
                                </Pressable>
                            </ScrollView>
                        </View>
                        <View top={8}>
                            {bookData.length < 12 ? (
                                <View
                                    top={20}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Image
                                        width={250}
                                        height={250}
                                        source={NoData}
                                        alt="Alternate Text"
                                    />
                                    <Text
                                        fontFamily="Poppins"
                                        textAlign={"center"}
                                        fontSize={responsiveFontSize(3)}
                                    >
                                        No Data :{"("}
                                    </Text>
                                </View>
                            ) : (
                                <>
                                    <ScrollView
                                        maxHeight={responsiveHeight(73)}
                                    >
                                        <View top={-35}>
                                            <Text
                                                fontSize={responsiveFontSize(
                                                    2.5
                                                )}
                                                fontWeight={400}
                                                lineHeight={36}
                                                width={responsiveWidth(100)}
                                                marginLeft={7}
                                                top={10}
                                                fontFamily="Poppins"
                                            >
                                                Recommended Books
                                            </Text>
                                            <Box>
                                                <Box
                                                    padding={2}
                                                    marginTop={39.5}
                                                    left={5}
                                                    width={"90%"}
                                                    height={"230"}
                                                    borderColor={"black"}
                                                >
                                                    <HStack space={5}>
                                                        <ScrollView
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }
                                                        >
                                                            <Pressable
                                                                onPress={() =>
                                                                    send(0)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[0]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[0]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[0]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(1)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[1]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[1]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[1]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(2)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[2]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[2]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[2]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(3)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[3]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[3]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[3]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>
                                                        </ScrollView>
                                                    </HStack>
                                                </Box>
                                            </Box>
                                        </View>
                                        <View top={responsiveHeight(-4)}>
                                            <Text
                                                fontSize={responsiveFontSize(
                                                    2.5
                                                )}
                                                fontWeight={400}
                                                lineHeight={36}
                                                width={responsiveWidth(100)}
                                                marginLeft={7}
                                                fontFamily="Poppins"
                                            >
                                                Top Picks
                                            </Text>
                                            <Box>
                                                <Box
                                                    padding={2}
                                                    left={5}
                                                    width={"90%"}
                                                    height={"230"}
                                                    borderColor={"black"}
                                                >
                                                    <HStack space={5}>
                                                        <ScrollView
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }
                                                        >
                                                            <Pressable
                                                                onPress={() =>
                                                                    send(4)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[4]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[4]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[4]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(5)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[5]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[5]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[5]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(6)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[6]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[6]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[6]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(7)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[7]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[7]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[7]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>
                                                        </ScrollView>
                                                    </HStack>
                                                </Box>
                                            </Box>
                                        </View>
                                        <View top={responsiveHeight(-4)}>
                                            <Text
                                                fontSize={responsiveFontSize(
                                                    2.5
                                                )}
                                                fontWeight={400}
                                                lineHeight={36}
                                                width={responsiveWidth(100)}
                                                marginLeft={7}
                                                fontFamily="Poppins"
                                            >
                                                Top Weekly Picks
                                            </Text>
                                            <Box>
                                                <Box
                                                    padding={2}
                                                    left={5}
                                                    width={"90%"}
                                                    height={"230"}
                                                    borderColor={"#000000"}
                                                >
                                                    <HStack space={5}>
                                                        <ScrollView
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={
                                                                false
                                                            }
                                                        >
                                                            <Pressable
                                                                onPress={() =>
                                                                    send(8)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[8]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[8]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[8]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(9)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[9]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[9]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[9]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(10)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[10]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[10]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[10]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() =>
                                                                    send(11)
                                                                }
                                                            >
                                                                <View>
                                                                    <Image
                                                                        marginRight={
                                                                            5
                                                                        }
                                                                        borderWidth={
                                                                            2
                                                                        }
                                                                        borderColor={
                                                                            "#000000"
                                                                        }
                                                                        height={
                                                                            137
                                                                        }
                                                                        width={
                                                                            90
                                                                        }
                                                                        source={{
                                                                            uri: bookData[11]
                                                                                .book_cover_page,
                                                                        }}
                                                                        alt="Alternate Text"
                                                                    />
                                                                    <Text
                                                                        marginTop={
                                                                            2
                                                                        }
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                        numberOfLines={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            width: 100,
                                                                        }}
                                                                    >
                                                                        {
                                                                            bookData[11]
                                                                                .book_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        fontSize={responsiveFontSize(
                                                                            1.8
                                                                        )}
                                                                        fontFamily="Poppins"
                                                                    >
                                                                        Price -{" "}
                                                                        {
                                                                            bookData[11]
                                                                                .book_price
                                                                        }{" "}
                                                                        {
                                                                            "\u20A8"
                                                                        }
                                                                        .
                                                                    </Text>
                                                                </View>
                                                            </Pressable>
                                                        </ScrollView>
                                                    </HStack>
                                                </Box>
                                            </Box>
                                        </View>
                                    </ScrollView>
                                </>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
