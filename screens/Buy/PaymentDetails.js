import React, { useLayoutEffect, useState } from "react";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CreditCardInput } from "react-native-credit-card-input";
import {
    NativeBaseProvider,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    Button,
} from "native-base";
import { payment } from "../../assets";
import { useFonts } from "expo-font";
import axios from "axios";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Modal,
    Pressable,
    LogBox,
} from "react-native";

LogBox.ignoreAllLogs();

export default function PaymentDetails() {
    const navigation = useNavigation();
    const route = useRoute();

    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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

    const buyBook = async () => {
        const formData = new FormData();

        formData.append("user", global.id);
        formData.append("buyer_name", route.params.buyerName);
        formData.append("buyer_mobile_no", route.params.buyerMobileNo);
        formData.append("buyer_country", route.params.buyerCountry);
        formData.append("buyer_state", route.params.buyerState);
        formData.append("buyer_city", route.params.buyerCity);
        formData.append("buyer_postal_code", route.params.buyerPincode);
        formData.append("buyer_address", route.params.buyerAddress);
        formData.append("book", route.params.bookID);
        formData.append("total_amount", route.params.bookPrice);
        formData.append("purchase_date", currentDate());
        formData.append("payment_status", "successful");
        formData.append("payment_method", "card payment");
        formData.append("delivery_status", "Delivered");

        try {
            await authAxios.post("/buy/", formData);
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

    const send = () => {
        buyBook();
        setLoader(true);
        setTimeout(() => setLoader(false), 3000);
        setModalVisible(true);
    };

    const nextPage = () => {
        setModalVisible(false);
        navigation.navigate("Receipt", {
            bookID: route.params.bookID,
            bookPrice: route.params.bookPrice,
            bookName: route.params.bookName,
            buyerAddress: route.params.buyerAddress,
            buyerName: route.params.buyerName,
        });
    };

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                {loader ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                        <Text>Processing...</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.paymentText} fontFamily="Poppins">
                            Payment Details
                        </Text>

                        <View top={responsiveHeight(2)}>
                            <Text style={styles.cardText} fontFamily="Poppins">
                                Accepted Cards
                            </Text>
                            <Image
                                source={payment}
                                alt="alternate text"
                                width={180}
                                height={45}
                                left={5}
                                top={responsiveHeight(6)}
                            />
                        </View>
                        <KeyboardAvoidingView
                            behavior="position"
                            keyboardVerticalOffset={170}
                        >
                            <View top={responsiveHeight(20)}>
                                <CreditCardInput onChange={this._onChange} />
                            </View>
                        </KeyboardAvoidingView>
                        <Button
                            width={responsiveWidth(90)}
                            height={68}
                            top={responsiveHeight(46)}
                            marginRight={20}
                            marginLeft={responsiveWidth(5)}
                            backgroundColor="#ED7966"
                            onPress={send}
                        >
                            <Text
                                fontFamily="Poppins"
                                fontSize={24}
                                color="#ffffff"
                            >
                                Place Order
                            </Text>
                        </Button>
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
                                                Payment Successful
                                            </Text>
                                            <Pressable
                                                style={[
                                                    styles.button,
                                                    styles.buttonClose,
                                                ]}
                                                onPress={() => nextPage()}
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
    paymentText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(6),
    },
    cardText: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(6),
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
