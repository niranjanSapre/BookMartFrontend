import React, { useLayoutEffect, useState } from "react";
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
    Stack,
    Input,
    HStack,
    ScrollView,
    Select,
    CheckIcon,
    TextArea,
    Button,
    KeyboardAvoidingView,
    Image,
} from "native-base";
import { useFonts } from "expo-font";
import { StyleSheet, Modal, Alert, Pressable } from "react-native";
import { Delivery } from "../../assets";

export default function BillingDetails() {
    const navigation = useNavigation();
    const route = useRoute();

    const [fullName, setFullName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const country = "India";
    const state = "Maharashtra";

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
        if (
            fullName === "" ||
            mobileNo === "" ||
            country === "" ||
            state === "" ||
            city === "" ||
            pincode === "" ||
            address === ""
        ) {
            setMessage("Please provide all details");
            setModalVisible(true);
            return;
        }

        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (!regName.test(fullName)) {
            setMessage("Please enter valid full name");
            setModalVisible(true);
            return;
        }

        const regexMobile = /^[6-9]\d{9}$/;
        if (!regexMobile.test(mobileNo)) {
            setMessage("Please enter valid 10 digit phone number");
            setModalVisible(true);
            return;
        }

        const regexPincode = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
        if (!regexPincode.test(pincode)) {
            setMessage("Please enter valid pincode");
            setModalVisible(true);
            return;
        }

        navigation.navigate("PaymentDetails", {
            bookID: route.params.bookID,
            bookName: route.params.bookName,
            bookPrice: route.params.bookPrice,
            buyerName: fullName,
            buyerMobileNo: mobileNo,
            buyerCountry: country,
            buyerState: state,
            buyerCity: city,
            buyerPincode: pincode,
            buyerAddress: address,
        });
    };

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={130}
                >
                    <Text style={styles.BillingText} fontFamily="Poppins">
                        Billing Details
                    </Text>

                    <View>
                        <Image
                            position={"absolute"}
                            width={300}
                            height={150}
                            left={responsiveWidth(15)}
                            top={responsiveHeight(5)}
                            source={Delivery}
                            alt="Alternate Text"
                        />
                    </View>

                    <Stack space={4} mx={20} top={responsiveHeight(12)}>
                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">Full Name - </Text>
                            </View>
                            <Input
                                width={responsiveWidth(66)}
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="Enter Full Name"
                                onChangeText={(text) => setFullName(text)}
                            />
                        </HStack>

                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">Mobile No -</Text>
                            </View>
                            <Input
                                width={responsiveWidth(66)}
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="Enter Mobile Number"
                                onChangeText={(text) => setMobileNo(text)}
                            />
                        </HStack>
                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">Country -</Text>
                            </View>
                            <Input
                                width={responsiveWidth(70)}
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="Enter Country"
                                value="India"
                                editable={false}
                            />
                        </HStack>
                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">State -</Text>
                            </View>
                            <Input
                                width={responsiveWidth(75)}
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="Enter Country"
                                value="Maharashtra"
                                editable={false}
                            />
                        </HStack>
                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">City -</Text>
                            </View>
                            <View>
                                <Select
                                    width={responsiveWidth(77)}
                                    fontFamily="Poppins"
                                    bgColor={"#FAE5DF"}
                                    borderColor={"#FAE5DF"}
                                    variant="rounded"
                                    selectedValue={city}
                                    minWidth="200"
                                    accessibilityLabel="Choose Service"
                                    placeholder="Select City"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    onValueChange={(itemValue) =>
                                        setCity(itemValue)
                                    }
                                >
                                    <Select.Item
                                        fontFamily="Poppins"
                                        label="Pune"
                                        value="Pune"
                                    />
                                    <Select.Item
                                        fontFamily="Poppins"
                                        label="Nashik"
                                        value="Nashik"
                                    />
                                    <Select.Item
                                        fontFamily="Poppins"
                                        label="Mumbai"
                                        value="Mumbai"
                                    />
                                    <Select.Item
                                        fontFamily="Poppins"
                                        label="Nagpur"
                                        value="Nagpur"
                                    />
                                    <Select.Item
                                        fontFamily="Poppins"
                                        label="Solapur"
                                        value="Solapur"
                                    />
                                </Select>
                            </View>
                        </HStack>
                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <View style={styles.FullNameTxt}>
                                <Text fontFamily="Poppins">Pin Code - </Text>
                            </View>
                            <Input
                                width={responsiveWidth(66)}
                                fontFamily="Poppins"
                                bgColor={"#FAE5DF"}
                                borderColor={"#FAE5DF"}
                                variant="rounded"
                                placeholder="ZIP Code"
                                onChangeText={(text) => setPincode(text)}
                            />
                        </HStack>

                        <HStack space={2} top={24} left={responsiveWidth(-15)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={responsiveFontSize(1.8)}
                            >
                                Address -
                            </Text>
                        </HStack>
                        <HStack>
                            <View
                                top={responsiveHeight(10)}
                                right={responsiveWidth(16)}
                                width={350}
                                h={20}
                            >
                                <ScrollView>
                                    <TextArea
                                        backgroundColor={"#FAE5DF"}
                                        fontFamily="Poppins"
                                        fontSize={14}
                                        editable={true}
                                        onChangeText={(text) =>
                                            setAddress(text)
                                        }
                                    ></TextArea>
                                </ScrollView>
                            </View>
                        </HStack>
                    </Stack>
                </KeyboardAvoidingView>
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
                    width={responsiveWidth(90)}
                    height={68}
                    top={responsiveHeight(28)}
                    marginRight={20}
                    marginLeft={responsiveWidth(5)}
                    backgroundColor="#ED7966"
                    onPress={send}
                >
                    <Text fontFamily="Poppins" fontSize={24} color="#ffffff">
                        Proceed to Pay
                    </Text>
                </Button>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    FullNameTxt: {
        fontSize: responsiveFontSize(1.5),
        top: responsiveHeight(1.5),
    },
    BillingText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(5),
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
