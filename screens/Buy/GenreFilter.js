import { FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    NativeBaseProvider,
    Text,
    View,
    Image,
    Button,
    Stack,
    VStack,
    HStack,
    Box,
    Spacer,
    Center,
    Pressable,
} from "native-base";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-virtualized-view";
import { Empty } from "../../assets";

export default function GenreFilter() {
    const navigation = useNavigation();
    const route = useRoute();

    const bookGenre = route.params.bookGenre;
    const masterData = route.params.bookData;

    const newData = masterData.filter((item) => {
        const itemData = item.book_genre.toUpperCase();
        const textData = bookGenre.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });

    const data = newData;

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
                <Pressable
                    onPress={() =>
                        navigation.navigate("Search", {
                            bookData: route.params.bookData,
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
                                        Search Novels, Comic, Biography,..
                                    </Text>
                                </View>
                            </HStack>
                            <View>
                                <Text
                                    fontFamily="Poppins"
                                    fontSize={responsiveFontSize(3)}
                                >
                                    {route.params.bookGenre}
                                </Text>
                            </View>
                        </Stack>
                    </View>
                </Pressable>

                {data.length === 0 ? (
                    <View
                        justifyContent={"center"}
                        alignItems={"center"}
                        flex={1}
                        top={responsiveHeight(-7)}
                    >
                        <Center>
                            <Image
                                width={250}
                                height={250}
                                source={Empty}
                                alt="Alternate Text"
                            />
                        </Center>
                        <Text fontFamily="Poppins" textAlign={"center"}>
                            Currently books are not available for
                            <Text fontFamily="PoppinsBold">
                                {" "}
                                {route.params.bookGenre}
                            </Text>{" "}
                            genre.
                        </Text>
                    </View>
                ) : (
                    <>
                        <ScrollView
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
                                                    position={"relative"}
                                                    borderWidth={2}
                                                    borderColor={"#000000"}
                                                    width={90}
                                                    height={137}
                                                    source={{
                                                        uri: item.book_cover_page,
                                                    }}
                                                    alt="Alternate Text"
                                                    left={1.5}
                                                />
                                                <VStack left={1}>
                                                    <Text
                                                        _dark={{
                                                            color: "warmGray.50",
                                                        }}
                                                        color="coolGray.800"
                                                        numberOfLines={2}
                                                        style={{
                                                            width: 150,
                                                            fontFamily:
                                                                "PoppinsBold",
                                                        }}
                                                    >
                                                        {item.book_name}
                                                    </Text>
                                                    <Text
                                                        color="coolGray.600"
                                                        _dark={{
                                                            color: "warmGray.200",
                                                        }}
                                                        style={{
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        Seller-{" "}
                                                        {item.user.username}
                                                    </Text>
                                                    <Text
                                                        color="coolGray.600"
                                                        _dark={{
                                                            color: "warmGray.200",
                                                        }}
                                                        style={{
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        ISBN- {item.book_isbn}
                                                    </Text>
                                                    <Text
                                                        color="coolGray.600"
                                                        _dark={{
                                                            color: "warmGray.200",
                                                        }}
                                                        numberOfLines={1}
                                                        style={{
                                                            width: 150,
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        Genre- {item.book_genre}
                                                    </Text>
                                                    <Text
                                                        color="coolGray.600"
                                                        _dark={{
                                                            color: "warmGray.200",
                                                        }}
                                                        style={{
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        Price- {item.book_price}{" "}
                                                        {"\u20A8"}
                                                    </Text>
                                                </VStack>
                                                <Spacer />
                                                <VStack
                                                    space={responsiveHeight(8)}
                                                    top={responsiveHeight(11)}
                                                >
                                                    <Button
                                                        width={responsiveWidth(
                                                            27
                                                        )}
                                                        backgroundColor="#ED7966"
                                                        left={-115}
                                                        onPress={() =>
                                                            navigation.navigate(
                                                                "Buy1",
                                                                {
                                                                    book_isbn:
                                                                        item.book_isbn,
                                                                    book_name:
                                                                        item.book_name,
                                                                    book_page:
                                                                        item.book_page,
                                                                    book_medium:
                                                                        item.book_medium,
                                                                    book_author:
                                                                        item.book_author,
                                                                    book_genre:
                                                                        item.book_genre,
                                                                    book_cover_page:
                                                                        item.book_cover_page,
                                                                    book_last_page:
                                                                        item.book_last_page,
                                                                    book_page1:
                                                                        item.book_page1,
                                                                    book_page2:
                                                                        item.book_page2,
                                                                    book_page3:
                                                                        item.book_page3,
                                                                    book_rental:
                                                                        item.book_rental,
                                                                    book_price:
                                                                        item.book_price,
                                                                    book_description:
                                                                        item.book_description,
                                                                    book_seller:
                                                                        item
                                                                            .user
                                                                            .username,
                                                                    book_seller_id:
                                                                        item
                                                                            .user
                                                                            .id,
                                                                }
                                                            )
                                                        }
                                                        position="absolute"
                                                    >
                                                        <Text
                                                            fontFamily="Poppins"
                                                            fontSize={15}
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
                                />
                            </Box>
                        </ScrollView>
                    </>
                )}
            </View>
        </NativeBaseProvider>
    );
}
