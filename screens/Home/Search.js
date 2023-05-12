import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
    HStack,
    Input,
    NativeBaseProvider,
    Box,
    Image,
    VStack,
    Spacer,
    Button,
} from "native-base";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-virtualized-view";

const Search = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [filteredData, setfilteredData] = useState(route.params.bookData);
    const [search, setsearch] = useState("");

    const masterData = route.params.bookData;
    const data = []

    for(let i=0; i<10; i++) {
        data.push(masterData[i]);
    }

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

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.book_name
                    ? item.book_name.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilteredData(newData);
            setsearch(text);
        } else {
            setfilteredData(data);
            setsearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
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
                    <HStack space={[2, 3]} justifyContent="space-between">
                        <Image
                            position={"relative"}
                            borderWidth={2}
                            borderColor={"#000000"}
                            width={90}
                            height={137}
                            source={{ uri: item.book_cover_page }}
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
                                    fontFamily: "PoppinsBold",
                                }}
                            >
                                {item.book_name}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                style={{ fontFamily: "Poppins" }}
                            >
                                Seller- {item.user.username}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                style={{ fontFamily: "Poppins" }}
                            >
                                ISBN- {item.book_isbn}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                numberOfLines={1}
                                style={{ width: 150, fontFamily: "Poppins" }}
                            >
                                Genre- {item.book_genre}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                style={{ fontFamily: "Poppins" }}
                            >
                                Price- {item.book_price} {"\u20A8"}
                            </Text>
                        </VStack>
                        <Spacer />
                        <VStack space={responsiveHeight(8)}>
                            <Button
                                width={responsiveWidth(27)}
                                top={responsiveHeight(12)}
                                backgroundColor="#ED7966"
                                left={-115}
                                onPress={() =>
                                    navigation.navigate("Buy1", {
                                        book_id: item.id,
                                        book_isbn: item.book_isbn,
                                        book_name: item.book_name,
                                        book_page: item.book_page,
                                        book_medium: item.book_medium,
                                        book_author: item.book_author,
                                        book_genre: item.book_genre,
                                        book_cover_page: item.book_cover_page,
                                        book_last_page: item.book_last_page,
                                        book_page1: item.book_page1,
                                        book_page2: item.book_page2,
                                        book_page3: item.book_page3,
                                        book_rental: item.book_rental,
                                        book_price: item.book_price,
                                        book_description: item.book_description,
                                        book_seller: item.user.username,
                                        book_seller_id: item.user.id,
                                    })
                                }
                                position="absolute"
                            >
                                <Text
                                    style={{
                                        fontFamily: "Poppins",
                                        color: "#ffffff",
                                    }}
                                    fontSize={15}
                                >
                                    Buy Now
                                </Text>
                            </Button>
                        </VStack>
                    </HStack>
                </Box>
            </TouchableWithoutFeedback>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View style={{ width: "90%", backgroundColor: "#000000" }}></View>
        );
    };

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                <View style={styles.container}>
                    <HStack space={2.5} left={1}>
                        <Input
                            width={"97%"}
                            fontSize={responsiveFontSize(1.8)}
                            fontFamily="Poppins"
                            bgColor={"#FAE5DF"}
                            borderColor={"#ed7966"}
                            height={responsiveHeight(5.5)}
                            borderRadius={20}
                            borderWidth={1}
                            value={search}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => searchFilter(text)}
                            placeholder="Search Novels, Comic, Biography,.."
                        ></Input>
                    </HStack>
                    <ScrollView>
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ItemView}
                        />
                    </ScrollView>
                </View>
            </View>
        </NativeBaseProvider>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        top: responsiveHeight(5),
        paddingLeft: 2,
    },
    itemStyle: {
        padding: 15,
    },
    textInputStyle: {
        height: 60,
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: "#009688",
        backgroundColor: "white",
    },
});
