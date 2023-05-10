import { StyleSheet, Modal, Alert, Pressable } from "react-native";

import React, { useLayoutEffect, useState } from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
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
const ISBNPage = () => {
    const navigation = useNavigation();

    const [isbnNumber, setisbnNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const send = () => {
        if (isbnNumber === "") {
            setMessage("Please provide isbn");
            setModalVisible(true);
            return;
        }

        const regexNumber = /^\d{13}$/;
        if (!regexNumber.test(isbnNumber)) {
            setMessage("Please provide 13-digit isbn");
            setModalVisible(true);
            return;
        }

        navigation.navigate("SellPageBookDetails", {
            isbnNumber: isbnNumber,
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
                <View top={50}>
                    <Center>
                        <Progress.Bar
                            progress={0.2}
                            width={350}
                            color={"#ED7966"}
                        />
                    </Center>
                </View>
                <View>
                    <Text style={styles.isbnText} fontFamily="Poppins">
                        Enter ISBN Number-
                    </Text>
                </View>
                <Stack space={5} w="80%" maxW="300px" mx={20}>
                    <HStack
                        space={2}
                        top={responsiveHeight(15)}
                        left={responsiveWidth(-15)}
                    >
                        <View style={styles.ISBNTxt}>
                            <Text>ISBN -</Text>
                        </View>
                        <View style={styles.ISBNSearch}>
                            <Input
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="Enter ISBN"
                                onChangeText={(text) => setisbnNumber(text)}
                                keyboardType="numeric"
                            />
                        </View>
                    </HStack>
                </Stack>
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
                                        {message}
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
};

export default ISBNPage;

const styles = StyleSheet.create({
    isbnText: {
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
    ISBNSearch: {
        width: responsiveWidth(77),
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
