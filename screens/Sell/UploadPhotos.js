import { StyleSheet, Modal, Alert, Pressable } from "react-native";
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
    Image,
    HStack,
    Stack,
    ScrollView,
} from "native-base";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function UploadPhotos() {
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [hasGalleryPermission, setHasCameraPermission] = useState(null);
    const [fcover, setFcover] = useState(null);
    const [bcover, setBcover] = useState(null);
    const [Page1, setPage1] = useState(null);
    const [Page2, setPage2] = useState(null);
    const [Page3, setPage3] = useState(null);

    console.log(route.params.price);

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

    const sendBookImage = async () => {
        const formData = new FormData();
        formData.append("book_page1", {
            name: "page1.jpg",
            uri: Page1,
            type: "image/jpg",
        });
        formData.append("book_page2", {
            name: "page2.jpg",
            uri: Page2,
            type: "image/jpg",
        });
        formData.append("book_page3", {
            name: "page3.jpg",
            uri: Page3,
            type: "image/jpg",
        });
        formData.append("price", route.params.price);

        try {
            const result = await authAxios.post("/sell/bookimage", formData);
            if (result.data.length !== 0) {
                nextPage();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const nextPage = () => {
        navigation.navigate("Price", {
            isbnNumber: route.params.isbnNumber,
            bookName: route.params.bookName,
            pages: route.params.pages,
            medium: route.params.medium,
            authorName: route.params.authorName,
            genre: route.params.genre,
            fcover: fcover,
            bcover: bcover,
            Page1: Page1,
            Page2: Page2,
            Page3: Page3,
            aboutBook: route.params.aboutBook,
        });
    };

    const send = () => {
        if (
            fcover === null ||
            bcover === null ||
            Page1 === null ||
            Page2 === null ||
            Page3 === null
        ) {
            setModalVisible(true);
            return;
        }
        sendBookImage();
    };

    useEffect(() => {
        (async () => {
            const galleryStatus =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasCameraPermission(galleryStatus.status === "granted");
        })();
    }, []);
    const pickImage = async () => {
        let result1 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 5,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result1.canceled) {
            setFcover(result1.assets[0].uri);
            setBcover(result1.assets[1].uri);
            setPage1(result1.assets[2].uri);
            setPage2(result1.assets[3].uri);
            setPage3(result1.assets[4].uri);
        }
    };
    const captureImage = async () => {
        let result1 = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        let result2 = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        let result3 = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        let result4 = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        let result5 = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (
            !result1.canceled ||
            !result2.canceled ||
            !result3.canceled ||
            !result4.canceled ||
            !result5.canceled
        ) {
            setFcover(result1.assets[0].uri);
            setBcover(result2.assets[0].uri);
            setPage1(result3.assets[0].uri);
            setPage2(result4.assets[0].uri);
            setPage3(result5.assets[0].uri);
        }
    };
    if (hasGalleryPermission == false) {
        return <Text>No Access to Internal Storage</Text>;
    }
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
                            progress={0.6}
                            width={350}
                            color={"#ED7966"}
                        />
                    </Center>
                </View>
                <Text style={styles.genreText} fontFamily="Poppins">
                    Upload Photos
                </Text>

                <Text
                    style={styles.noteText}
                    fontFamily="Poppins"
                    numberOfLines={2}
                    width={350}
                >
                    {" "}
                    Note: First 2 photos will be consider as "Cover Photos"
                </Text>

                <HStack
                    space={4}
                    left={responsiveWidth(2)}
                    top={responsiveHeight(-2)}
                >
                    <Button
                        style={styles.capture}
                        backgroundColor="#ED7966"
                        onPress={() => captureImage()}
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize={20}
                            color="#ffffff"
                        >
                            Capture
                        </Text>
                    </Button>
                    <Button
                        style={styles.browse}
                        onPress={() => pickImage()}
                        backgroundColor="#ED7966"
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize={20}
                            color="#ffffff"
                        >
                            Browse
                        </Text>
                    </Button>
                </HStack>
                <HStack space={4}>
                    <Stack top={responsiveHeight(4)} space={7}>
                        <View
                            borderRadius={10}
                            left={responsiveWidth(2)}
                            width={responsiveWidth(95)}
                            height={responsiveHeight(22)}
                            borderWidth={1}
                        >
                            <Text
                                marginLeft={2}
                                marginTop={2}
                                fontFamily="Poppins"
                                fontSize={20}
                                color="#000000"
                            >
                                Cover Photos
                            </Text>
                            <HStack space={2}>
                                {fcover && (
                                    <Image
                                        source={{ uri: fcover }}
                                        alt="Alternate text"
                                        style={{ width: 90, height: 120 }}
                                        marginTop={1}
                                        marginLeft={2}
                                    />
                                )}
                                {bcover && (
                                    <Image
                                        source={{ uri: bcover }}
                                        alt="Alternate text"
                                        style={{ width: 90, height: 120 }}
                                        marginTop={1}
                                        marginLeft={2}
                                    />
                                )}
                            </HStack>
                        </View>
                        <View
                            borderRadius={10}
                            left={responsiveWidth(2)}
                            width={responsiveWidth(95)}
                            height={responsiveHeight(22)}
                            borderWidth={1}
                        >
                            <Text
                                marginLeft={2}
                                marginTop={2}
                                fontFamily="Poppins"
                                fontSize={20}
                                color="#000000"
                            >
                                Page Photos
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <HStack space={2} marginRight={2}>
                                    {Page1 && (
                                        <Image
                                            source={{ uri: Page1 }}
                                            alt="Alternate text"
                                            style={{ width: 90, height: 120 }}
                                            marginTop={1}
                                            marginLeft={2}
                                        />
                                    )}
                                    {Page2 && (
                                        <Image
                                            source={{ uri: Page2 }}
                                            alt="Alternate text"
                                            style={{ width: 90, height: 120 }}
                                            marginTop={1}
                                            marginLeft={2}
                                        />
                                    )}
                                    {Page3 && (
                                        <Image
                                            source={{ uri: Page3 }}
                                            alt="Alternate text"
                                            style={{ width: 90, height: 120 }}
                                            marginTop={1}
                                            marginLeft={2}
                                        />
                                    )}
                                </HStack>
                            </ScrollView>
                        </View>
                    </Stack>
                </HStack>
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
                                Alert.alert("Modal has been closed");
                            }}
                        >
                            <View style={styles.container}>
                                <View style={styles.modalView}>
                                    <Text
                                        fontFamily={"Poppins"}
                                        textAlign="center"
                                    >
                                        Please Upload 5 photos
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
                <Button
                    style={styles.next}
                    backgroundColor="#ED7966"
                    onPress={send}
                >
                    <Text fontFamily="Poppins" fontSize={24} color="#ffffff">
                        Next
                    </Text>
                </Button>
            </View>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    next: {
        position: "absolute",
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(93),
        marginRight: 20,
        marginLeft: 20,
    },
    capture: {
        width: responsiveWidth(45),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(20),
    },
    browse: {
        width: responsiveWidth(45),
        height: responsiveHeight(8),
        marginTop: responsiveHeight(20),
    },
    genreText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(10),
    },
    noteText: {
        fontSize: responsiveFontSize(1.8),
        left: 20,
        top: responsiveHeight(12),
        color: "red",
    },
    orText: {
        textAlign: "center",
        fontSize: responsiveFontSize(2.4),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        top: responsiveHeight(8),
    },
    container: {
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
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
