import { StyleSheet } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    NativeBaseProvider,
    Button,
    Center,
    Text,
    View,
    Image,
    VStack,
    HStack,
    ScrollView,
} from "native-base";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import axios from "axios";
import "../global";

export default function ReviewPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const [buttonPress, setButtonPress] = useState(false);

    const currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    };

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

    const AddBook = async () => {
        const formData = new FormData();

        formData.append("book_isbn", route.params.isbnNumber);
        formData.append("book_name", route.params.bookName);
        formData.append("book_page", route.params.pages);
        formData.append("book_medium", route.params.medium);
        formData.append("book_author", route.params.authorName);
        formData.append("book_genre", route.params.genre);
        formData.append("book_cover_page", {
            name: "cover_page.jpg",
            uri: route.params.fcover,
            type: "image/jpg",
        });
        formData.append("book_last_page", {
            name: "last_page.jpg",
            uri: route.params.bcover,
            type: "image/jpg",
        });
        formData.append("book_page1", {
            name: "page1.jpg",
            uri: route.params.Page1,
            type: "image/jpg",
        });
        formData.append("book_page2", {
            name: "page2.jpg",
            uri: route.params.Page2,
            type: "image/jpg",
        });
        formData.append("book_page3", {
            name: "page3.jpg",
            uri: route.params.Page3,
            type: "image/jpg",
        });
        formData.append("book_price", route.params.price);
        formData.append("book_description", route.params.aboutBook);
        formData.append("status", "Posted");
        formData.append("posted_date", currentDate());
        formData.append("user_id", global.id);

        try {
            const prevResult = await authAxios.get("/sell/");
            const result = await authAxios.post("/sell/", formData);
            if (prevResult.data.length !== result.data.length) {
                nextPage();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteImages = async () => {
        try {
            await authAxios.delete(`/sell/imagedelete/${route.params.imageId}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (buttonPress) {
            AddBook();
            deleteImages();
        }
    }, [buttonPress]);

    const nextPage = () => {
        navigation.navigate("PostedProduct");
        setButtonPress(true);
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
                <View top={50}>
                    <Center>
                        <Progress.Bar
                            progress={1.0}
                            width={350}
                            color={"#ED7966"}
                        />
                    </Center>
                </View>

                <Text style={styles.reviewText} fontFamily="Poppins">
                    Review
                </Text>

                <View style={styles.review}>
                    <VStack space={4}>
                        <Text fontFamily="Poppins">
                            ISBN - {route.params.isbnNumber}
                        </Text>
                        <Text fontFamily="Poppins">
                            Book Name - {route.params.bookName}
                        </Text>
                        <Text fontFamily="Poppins">
                            Pages - {route.params.pages}
                        </Text>
                        <Text fontFamily="Poppins">
                            Medium - {route.params.medium}
                        </Text>
                        <Text fontFamily="Poppins">
                            Author Name -{route.params.authorName}
                        </Text>
                        <Text fontFamily="Poppins">
                            Genre - {route.params.genre}
                        </Text>
                        <Text fontFamily="Poppins">
                            Price - {route.params.price} {"\u20A8"}.
                        </Text>
                        <Text fontFamily="Poppins">Preview Images </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <HStack space={2}>
                                <Image
                                    source={{ uri: route.params.fcover }}
                                    alt="Alternate text"
                                    style={{ width: 90, height: 120 }}
                                    marginTop={1}
                                    marginLeft={2}
                                />
                                <Image
                                    source={{ uri: route.params.bcover }}
                                    alt="Alternate text"
                                    style={{ width: 90, height: 120 }}
                                    marginTop={1}
                                    marginLeft={2}
                                />
                                <Image
                                    source={{ uri: route.params.Page1 }}
                                    alt="Alternate text"
                                    style={{ width: 90, height: 120 }}
                                    marginTop={1}
                                    marginLeft={2}
                                />
                                <Image
                                    source={{ uri: route.params.Page2 }}
                                    alt="Alternate text"
                                    style={{ width: 90, height: 120 }}
                                    marginTop={1}
                                    marginLeft={2}
                                />
                                <Image
                                    source={{ uri: route.params.Page3 }}
                                    alt="Alternate text"
                                    style={{ width: 90, height: 120 }}
                                    marginTop={1}
                                    marginLeft={2}
                                />
                            </HStack>
                        </ScrollView>
                    </VStack>
                </View>

                <Button
                    style={styles.next}
                    backgroundColor="#ED7966"
                    onPress={() => setButtonPress(true)}
                >
                    <Text fontFamily="Poppins" fontSize={24} color="#ffffff">
                        Post
                    </Text>
                </Button>
            </View>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    edit: {
        top: 70,
        marginLeft: 330,
    },
    review: {
        marginTop: responsiveHeight(15),
        padding: 20,
    },
    reviewText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(13),
    },
    next: {
        position: "absolute",
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(93),
        marginRight: 20,
        marginLeft: 20,
    },
});
