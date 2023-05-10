import {
    ActivityIndicator,
    StyleSheet,
    Modal,
    Alert,
    Pressable,
} from "react-native";

import React, { useLayoutEffect, useState, useEffect } from "react";
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
    Stack,
    Input,
    HStack,
} from "native-base";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";

export default function SellPageBookDetails() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();

    const [bookName, setBookName] = useState("");
    const [pages, setPages] = useState("");
    const [medium, setMedium] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("Currently not available");
    const [modalVisible, setModalVisible] = useState(false);
    const [bookStatus, setBookStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState(0);

    const send = () => {
        if (
            genre === "" ||
            bookName === "" ||
            pages === "" ||
            medium === "" ||
            authorName === ""
        ) {
            setMessage("Please provide all details");
            setModalVisible(true);
            return;
        }

        const numberRegex = /^\d+$/;
        if (!numberRegex.test(pages)) {
            setMessage("Please enter valid page number");
            setModalVisible(true);
            return;
        }

        const mediumRegex = /^[A-Za-z]+$/;
        if (!mediumRegex.test(medium)) {
            setMessage("Please enter valid medium");
            setModalVisible(true);
            return;
        }

        const genreRegex = /^([^0-9]*)$/;
        if (!genreRegex.test(genre)) {
            setMessage("Please enter valid Genre");
            setModalVisible(true);
            return;
        }

        navigation.navigate("UploadPhotos", {
            isbnNumber: route.params.isbnNumber,
            bookName: bookName,
            pages: pages.toString(),
            medium: medium,
            authorName: authorName,
            genre: genre,
            aboutBook: description,
            price: price,
        });
    };

    const getApiData = async () => {
        try {
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${route.params.isbnNumber}&key=AIzaSyDzFRk5Btsx9RgtSCH_RvUR1RF3fIAn_ZM`
            );
            const myData = await res.json();

            if (myData.totalItems === 1) {
                if (
                    myData.items[0].volumeInfo.pageCount !== undefined &&
                    myData.items[0].volumeInfo.pageCount !== 0 &&
                    myData.items[0].volumeInfo.categories[0] !== undefined
                ) {
                    setBookStatus(true);
                    setBookName(myData.items[0].volumeInfo.title);
                    setPages(myData.items[0].volumeInfo.pageCount.toString());
                    setMedium(myData.items[0].volumeInfo.language);
                    setAuthorName(myData.items[0].volumeInfo.authors[0]);
                    setGenre(myData.items[0].volumeInfo.categories[0]);
                    setDescription(myData.items[0].volumeInfo.description);
                    setPrice(myData.items[0].saleInfo.listPrice.amount);
                    setIsLoading(false);
                } else {
                    setBookStatus(false);
                    setMessage(
                        "Book is not available, please enter data manually"
                    );
                    setModalVisible(true);
                    setIsLoading(false);
                }
            } else if (myData.totalItems === 0) {
                setIsLoading(false);
                setMessage("Book is not available, please enter data manually");
                setModalVisible(true);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);
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
            <View backgroundColor={"#ffffff"} flex={1} position={"relative"}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <View>
                        {bookStatus ? (
                            <View>
                                <View top={50} position={"relative"}>
                                    <Center>
                                        <Progress.Bar
                                            progress={0.4}
                                            width={350}
                                            color={"#ED7966"}
                                        />
                                    </Center>
                                </View>
                                <View bottom={5}>
                                    <Text
                                        style={styles.genreText}
                                        fontFamily="Poppins"
                                    >
                                        Book Details
                                    </Text>
                                </View>

                                <View top={10}>
                                    <Stack space={5} w="80%" mx={20} bottom={5}>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    ISBN -{" "}
                                                </Text>
                                            </View>
                                            <View style={styles.ISBNSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter ISBN"
                                                    value={
                                                        route.params.isbnNumber
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Book Name -
                                                </Text>
                                            </View>
                                            <View style={styles.BNSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Book Name"
                                                    defaultValue={bookName}
                                                    onChangeText={(name) =>
                                                        setBookName(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Pages -
                                                </Text>
                                            </View>
                                            <View style={styles.PgSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    defaultValue={pages}
                                                    onChangeText={(name) =>
                                                        setPages(name)
                                                    }
                                                />
                                            </View>
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Medium -
                                                </Text>
                                            </View>
                                            <View style={styles.MSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    defaultValue={medium}
                                                    onChangeText={(name) =>
                                                        setMedium(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Author Name -
                                                </Text>
                                            </View>
                                            <View style={styles.AuthorSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Author Name"
                                                    defaultValue={authorName}
                                                    onChangeText={(name) =>
                                                        setAuthorName(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Genre -
                                                </Text>
                                            </View>
                                            <View style={styles.GenreSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Genre"
                                                    defaultValue={genre}
                                                    onChangeText={(name) =>
                                                        setGenre(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                    </Stack>
                                </View>

                                <View style={styles.tooltip} left={35}>
                                    <View
                                        style={styles.container}
                                        backgroundColor={"amber.300"}
                                    >
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onResquestClose={() => {
                                                Alert.alert(
                                                    "Modal has been closed"
                                                );
                                            }}
                                        >
                                            <View style={styles.container}>
                                                <View style={styles.modalView}>
                                                    <Text
                                                        fontFamily={"Poppins"}
                                                        textAlign="center"
                                                    >
                                                        Please Enter All The
                                                        Fields
                                                    </Text>
                                                    <Pressable
                                                        style={[
                                                            styles.button,
                                                            styles.buttonClose,
                                                        ]}
                                                        onPress={() =>
                                                            setModalVisible(
                                                                !modalVisible
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            fontFamily={
                                                                "Poppins"
                                                            }
                                                            style={
                                                                styles.okText
                                                            }
                                                        >
                                                            ok
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                                <Button
                                    style={styles.next}
                                    backgroundColor="#ED7966"
                                    onPress={send}
                                >
                                    <Text
                                        fontFamily="Poppins"
                                        fontSize={24}
                                        color="#ffffff"
                                    >
                                        Next
                                    </Text>
                                </Button>
                            </View>
                        ) : (
                            <View>
                                <View top={50} position={"relative"}>
                                    <Center>
                                        <Progress.Bar
                                            progress={0.48}
                                            width={350}
                                            color={"#ED7966"}
                                        />
                                    </Center>
                                </View>
                                <View bottom={5}>
                                    <Text
                                        style={styles.genreText}
                                        fontFamily="Poppins"
                                    >
                                        Book Details
                                    </Text>
                                </View>

                                <View top={10}>
                                    <Stack space={5} w="80%" mx={20} bottom={5}>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    ISBN -{" "}
                                                </Text>
                                            </View>
                                            <View style={styles.ISBNSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter ISBN"
                                                    value={
                                                        route.params.isbnNumber
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Book Name -
                                                </Text>
                                            </View>
                                            <View style={styles.BNSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Book Name"
                                                    onChangeText={(name) =>
                                                        setBookName(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Pages -
                                                </Text>
                                            </View>
                                            <View style={styles.PgSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    keyboardType="numeric"
                                                    onChangeText={(name) =>
                                                        setPages(name)
                                                    }
                                                />
                                            </View>
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Medium -
                                                </Text>
                                            </View>
                                            <View style={styles.MSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    onChangeText={(name) =>
                                                        setMedium(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Author Name -
                                                </Text>
                                            </View>
                                            <View style={styles.AuthorSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Author Name"
                                                    onChangeText={(name) =>
                                                        setAuthorName(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                        <HStack
                                            space={2}
                                            top={24}
                                            left={responsiveWidth(-15)}
                                        >
                                            <View style={styles.ISBNTxt}>
                                                <Text fontFamily="Poppins">
                                                    Genre -
                                                </Text>
                                            </View>
                                            <View style={styles.GenreSearch}>
                                                <Input
                                                    fontFamily="Poppins"
                                                    bgColor={"#FAE5DF"}
                                                    borderColor={"#FAE5DF"}
                                                    variant="rounded"
                                                    placeholder="Enter Genre"
                                                    onChangeText={(name) =>
                                                        setGenre(name)
                                                    }
                                                />
                                            </View>
                                        </HStack>
                                    </Stack>
                                </View>

                                <View style={styles.tooltip} left={35}>
                                    <View
                                        style={styles.container}
                                        backgroundColor={"amber.300"}
                                    >
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onResquestClose={() => {
                                                Alert.alert(
                                                    "Modal has been closed"
                                                );
                                            }}
                                        >
                                            <View style={styles.container}>
                                                <View style={styles.modalView}>
                                                    <Text
                                                        fontFamily={"Poppins"}
                                                        textAlign="center"
                                                    >
                                                        {message}
                                                    </Text>
                                                    <Pressable
                                                        style={[
                                                            styles.button,
                                                            styles.buttonClose,
                                                        ]}
                                                        onPress={() =>
                                                            setModalVisible(
                                                                !modalVisible
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            fontFamily={
                                                                "Poppins"
                                                            }
                                                            style={
                                                                styles.okText
                                                            }
                                                        >
                                                            ok
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                                <Button
                                    style={styles.next}
                                    backgroundColor="#ED7966"
                                    onPress={send}
                                >
                                    <Text
                                        fontFamily="Poppins"
                                        fontSize={24}
                                        color="#ffffff"
                                    >
                                        Next
                                    </Text>
                                </Button>
                            </View>
                        )}
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
    next: {
        position: "absolute",
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(93),
        marginRight: 20,
        marginLeft: 20,
    },
    genreText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(13),
    },
    ISBNSearch: {
        width: responsiveWidth(73),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    BNSearch: {
        width: responsiveWidth(60),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    PgSearch: {
        width: responsiveWidth(20),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    MSearch: {
        width: responsiveWidth(26.5),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    AuthorSearch: {
        width: responsiveWidth(56),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    GenreSearch: {
        width: responsiveWidth(71),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5.5),
    },
    ISBNTxt: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: 400,
        lineHeight: 36,
        top: responsiveHeight(1.5),
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF95",
        alignItems: "center",
        justifyContent: "center",
    },
    InputName: {
        width: responsiveWidth(71),
        fontSize: responsiveFontSize(1.5),
        lineHeight: 36,
        paddingTop: 10,
        opacity: 0.7,
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
