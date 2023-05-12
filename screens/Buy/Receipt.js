import React, { useLayoutEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Aditya, Ankit, Anuja, Niranjan } from "../../assets";
import { useFonts } from "expo-font";
import axios from "axios";

export default function Receipt() {
    const navigation = useNavigation();
    const route = useRoute();

    const currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    };

    const invoice1 = Math.floor(Math.random() * 10000);
    const invoice2 = Math.floor(Math.random() * 10000);
    const tran_date = currentDate();
    const bookPrice = route.params.bookPrice;
    const bookName = route.params.bookName;
    const receiptNumber = Math.floor(Math.random() * 10000000000);
    const billingEmail = global.email;
    const billingAddress = route.params.buyerAddress;
    const book = route.params.bookID;

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

    const PaymentDetails = async () => {
        const formData = new FormData();

        formData.append(
            "invoice_number",
            "#" + invoice1.toString() + "-" + invoice2.toString()
        );
        formData.append("transaction_date", tran_date);
        formData.append("book_price", bookPrice);
        formData.append("book_name", bookName);
        formData.append("payment_method", "card");
        formData.append("receipt_number", receiptNumber);
        formData.append("billing_email", billingEmail);
        formData.append("billing_address", billingAddress);
        formData.append("book", book);
        formData.append("payment_status", "successful");

        try {
            await authAxios.post("/buy/paymentdetails", formData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const send = () => {
        PaymentDetails();
        navigation.navigate("MyOrder");
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
        <View backgroundColor={"#ffffff"} flex={1}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.receipt}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.receiptLogo}>
                        <FontAwesome name="book" size={60} color="#ed7966" />
                    </View>

                    <Text style={styles.receiptTitle}>BookMart Pvt. Ltd.</Text>

                    <Text style={styles.receiptSubtitle} fontFamily="Poppins">
                        Invoice #{invoice1}-{invoice2}
                    </Text>

                    <View style={styles.receiptPrice} fontFamily="Poppins">
                        <Text style={styles.receiptPriceText}>
                            {"\u20B9"} {bookPrice}
                        </Text>

                        <Text
                            style={[
                                styles.receiptPriceText,
                                { fontSize: 20, lineHeight: 32 },
                            ]}
                        >
                            .00
                        </Text>
                    </View>

                    <Text style={styles.receiptDescription}>
                        Purchase with BookMart
                    </Text>

                    <View style={styles.avatarWrapper}>
                        <Image
                            alt=""
                            source={Anuja}
                            style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                        />
                        <Image
                            alt=""
                            source={Niranjan}
                            style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                        />
                        <Image
                            alt=""
                            source={Ankit}
                            style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                        />
                        <Image
                            alt=""
                            source={Aditya}
                            style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                        />
                    </View>

                    <View style={styles.divider}>
                        <View style={styles.dividerInset} />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.detailsTitle}>
                            Transaction details
                        </Text>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>Date</Text>

                            <Text style={styles.detailsValue}>{tran_date}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>Book Name</Text>

                            <Text style={styles.detailsValue}>{bookName}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>
                                Payment method
                            </Text>

                            <Text style={styles.detailsValue}>Card</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>
                                Receipt Number
                            </Text>

                            <Text style={styles.detailsValue}>
                                {receiptNumber}
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>
                                Billing Name
                            </Text>

                            <Text style={styles.detailsValue}>
                                {route.params.buyerName}
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>
                                Billing Email
                            </Text>

                            <Text style={styles.detailsValue}>
                                {billingEmail}
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsField}>
                                Billing Address
                            </Text>

                            <Text style={styles.detailsValue}>
                                {billingAddress}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.overlay}>
                <TouchableOpacity onPress={send}>
                    <View style={styles.btnSecondary}>
                        <Text style={styles.btnSecondaryText}>Go Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
        paddingHorizontal: 16,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        top: 30,
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "stretch",
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 48,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#000",
        fontFamily: "Poppins",
    },
    receipt: {
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 140,
    },
    receiptLogo: {
        width: 70,
        height: 70,
        borderRadius: 9999,
        marginBottom: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    receiptTitle: {
        fontSize: 21,
        fontWeight: "600",
        color: "#151515",
        marginBottom: 2,
        fontFamily: "Poppins",
    },
    receiptSubtitle: {
        fontSize: 13,
        lineHeight: 20,
        color: "#818181",
        marginBottom: 12,
        fontFamily: "Poppins",
    },
    receiptPrice: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginBottom: 6,
        fontFamily: "Poppins",
    },
    receiptPriceText: {
        fontSize: 30,
        lineHeight: 38,
        fontWeight: "bold",
        letterSpacing: 0.35,
        color: "#ed7966",
        fontFamily: "Poppins",
    },
    receiptDescription: {
        fontSize: 14,
        lineHeight: 22,
        color: "#818181",
        textAlign: "center",
        marginBottom: 12,
        fontFamily: "Poppins",
    },
    details: {
        width: "100%",
        flexDirection: "column",
        alignItems: "stretch",
        fontFamily: "Poppins",
    },
    detailsTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#222",
        marginBottom: 16,
        fontFamily: "Poppins",
    },
    detailsRow: {
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        fontFamily: "Poppins",
    },
    detailsField: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "500",
        color: "#8c8c8c",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        fontFamily: "Poppins",
    },
    detailsValue: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "600",
        color: "#444",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "right",
        fontFamily: "Poppins",
    },
    detailsActions: {
        marginTop: 24,
    },
    divider: {
        overflow: "hidden",
        width: "100%",
        marginVertical: 24,
        fontFamily: "Poppins",
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: "#8338ec",
        borderColor: "#8338ec",
        marginBottom: 12,
        fontFamily: "Poppins",
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: "600",
        color: "#fff",
        fontFamily: "Poppins",
    },
    btnSecondary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: "transparent",
        borderColor: "#ED7966",
    },
    btnSecondaryText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: "600",
        color: "#ed7966",
        fontFamily: "Poppins",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Poppins",
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        borderWidth: 3,
        borderColor: "#fff",
    },
    avatarWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    dividerInset: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#e5e5e5",
        borderStyle: "dashed",
        marginTop: -2,
    },
});
