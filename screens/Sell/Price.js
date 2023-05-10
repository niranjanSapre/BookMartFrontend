import {
    StyleSheet,
    Modal,
    Alert,
    Pressable,
    ActivityIndicator,
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
import { Foundation } from "@expo/vector-icons";
import axios from "axios";

export default function Price() {
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [imageId, setImageId] = useState(0);
    const [text, setText] = useState(
        "This Price is based on Your Book Condition"
    );

    const [price, setPrice] = useState("");
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

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await authAxios.get(`/sell/estprice`);
                const data = response.data;
                setPrice(data.est_price.toString());
                setImageId(data.id);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 300);
    }, []);

    const send = () => {
        if (price === "") {
            setText("Please enter price");
            setModalVisible(true);
            return;
        }

        navigation.navigate("ReviewPage", {
            isbnNumber: route.params.isbnNumber,
            bookName: route.params.bookName,
            pages: route.params.pages,
            medium: route.params.medium,
            authorName: route.params.authorName,
            genre: route.params.genre,
            fcover: route.params.fcover,
            bcover: route.params.bcover,
            Page1: route.params.Page1,
            Page2: route.params.Page2,
            Page3: route.params.Page3,
            price: price,
            aboutBook: route.params.aboutBook,
            imageId: imageId,
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

    const combinedFunction = () => {
        setText("This Price is based on Your Book Condition");
        setModalVisible(false);
    };

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <View>
                        <View top={50}>
                            <Center>
                                <Progress.Bar
                                    progress={0.8}
                                    width={350}
                                    color={"#ED7966"}
                                />
                            </Center>
                        </View>
                        <Text style={styles.priceText} fontFamily="Poppins">
                            Price
                        </Text>

                        <View style={styles.tooltip} left={35}>
                            <Stack space={2} w="80%" maxW="300px" mx={20}>
                                <HStack space={2.5}>
                                    <View style={styles.container}>
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
                                                        {text}
                                                    </Text>
                                                    <Pressable
                                                        style={[
                                                            styles.button,
                                                            styles.buttonClose,
                                                        ]}
                                                        onPress={() =>
                                                            combinedFunction()
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
                                        <Pressable
                                            onPress={() =>
                                                setModalVisible(true)
                                            }
                                        >
                                            <Foundation
                                                name="info"
                                                size={24}
                                                color="#ed7966"
                                            />
                                        </Pressable>
                                    </View>
                                    <View style={styles.EstTxt}>
                                        <Text fontFamily={"Poppins"}>
                                            Estimated Price -
                                        </Text>
                                    </View>
                                    <View>
                                        <View left={5} style={styles.EstPrice}>
                                            <Input
                                                fontFamily="Poppins"
                                                bgColor={"#FAE5DF"}
                                                borderColor={"#FAE5DF"}
                                                variant="rounded"
                                                defaultValue={price}
                                                onChangeText={(name) =>
                                                    setPrice(name)
                                                }
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>
                                </HStack>
                            </Stack>
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
                                Review
                            </Text>
                        </Button>
                    </View>
                )}
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
    priceText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(13),
    },
    tooltip: {
        top: responsiveHeight(16),
        left: responsiveWidth(-15),
    },
    EstTxt: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: 400,
        lineHeight: 36,
        marginRight: -10,
        top: responsiveHeight(1),
    },
    EstPrice: {
        top: responsiveHeight(-0.8),
        width: responsiveWidth(35),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5),
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
