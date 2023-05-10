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
    Image,
    Box,
    Text,
    Circle,
    View,
    Stack,
    Input,
    HStack,
    KeyboardAvoidingView,
} from "native-base";
import { useFonts } from "expo-font";
import { bml, Mail, Password, Loginimg } from "../../assets";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "../global";

export default function Login() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");

    const nextPage = (token, username, id, email) => {
        global.token = token;
        global.username = username;
        global.id = id;
        global.email = email;
        setUsername("");
        setPassword("");
        navigation.navigate("HomeScreen");
    };

    const userLogin = async () => {
        if (username === "" || password === "") {
            setText("Please Fill All Details");
            setModalVisible(true);
            return;
        }

        const apiUrl = global.apiUrl;
        let result = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        result = await result.json();
        if (result.status === "unauthorized") {
            setText("Invalid Credentials");
            setModalVisible(true);
            return;
        }
        nextPage(
            result.token,
            result.user.username,
            result.user.id,
            result.user.email
        );
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
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={144}
                >
                    <View>
                        <Circle style={styles.Circle1} />
                        <Circle style={styles.Circle2} />
                        <Circle style={styles.Circle3} />
                    </View>
                    <View>
                        <Image
                            position={"absolute"}
                            width={60}
                            height={70}
                            left={responsiveWidth(40)}
                            top={8}
                            source={bml}
                            alt="Alternate Text"
                        />
                    </View>
                    <View>
                        <Box>
                            <Text style={styles.LoginText}>Welcome Back!</Text>
                            <Center>
                                <Image
                                    width={220}
                                    height={230}
                                    top={responsiveHeight(25)}
                                    source={Loginimg}
                                    alt="Alternate Text"
                                />
                            </Center>
                        </Box>
                        <View top={responsiveHeight(25)}>
                            <Stack space={2} w="70%" maxW="300px" mx={20}>
                                <HStack>
                                    <MaterialCommunityIcons
                                        name="account"
                                        size={28}
                                        color="black"
                                        position={"absolute"}
                                        left={"-20%"}
                                        top={"17%"}
                                        source={Mail}
                                        alt="Alternate Text"
                                    />
                                    <View style={styles.InputEmail}>
                                        <Input
                                            placeholder="Enter your username"
                                            fontSize={responsiveFontSize(1.8)}
                                            height={responsiveHeight(5.5)}
                                            variant="rounded"
                                            fontFamily={"Poppins"}
                                            bgColor={"#FAE5DF"}
                                            borderColor={"#FAE5DF"}
                                            onChangeText={(text) =>
                                                setUsername(text)
                                            }
                                            value={username}
                                        />
                                    </View>
                                </HStack>
                                <HStack>
                                    <MaterialIcons
                                        name="lock"
                                        size={28}
                                        color="black"
                                        position={"absolute"}
                                        left={"-20%"}
                                        top={"17%"}
                                        source={Password}
                                        alt="Alternate Text"
                                    />
                                    <View style={styles.InputEmail}>
                                        <Input
                                            width={"100%"}
                                            fontSize={responsiveFontSize(1.8)}
                                            fontFamily="Poppins"
                                            bgColor={"#FAE5DF"}
                                            borderColor={"#FAE5DF"}
                                            height={responsiveHeight(5.5)}
                                            variant="rounded"
                                            placeholder="Enter password"
                                            onChangeText={(text) =>
                                                setPassword(text)
                                            }
                                            secureTextEntry
                                            value={password}
                                        />
                                    </View>
                                </HStack>
                            </Stack>
                        </View>
                    </View>
                    <View top={responsiveHeight(26)} left={30}>
                        <HStack space={6}>
                            <Text
                                style={styles.Accounttxt}
                                fontFamily="Poppins"
                            >
                                Don't have a account?
                            </Text>
                            <Button
                                backgroundColor={"#ffffff"}
                                left={responsiveWidth(-38)}
                                top={responsiveHeight(-0.4)}
                                onPress={() => navigation.navigate("Register")}
                            >
                                <Text fontFamily="Poppins" color="#ED7966">
                                    Sign up
                                </Text>
                            </Button>
                        </HStack>
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
                                    Alert.alert("Modal has been closed");
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
                        top={responsiveHeight(30)}
                        marginRight={20}
                        marginLeft={responsiveWidth(5)}
                        backgroundColor="#ED7966"
                        onPress={userLogin}
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize={24}
                            color="#ffffff"
                        >
                            Login
                        </Text>
                    </Button>
                </KeyboardAvoidingView>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    Circle1: {
        position: "absolute",
        width: 331,
        height: 322,
        left: -117,
        top: -111,
        backgroundColor: "#ED7966",
        opacity: 0.7,
    },
    Circle2: {
        position: "absolute",
        width: 169,
        height: 167,
        left: 107,
        top: -54,
        backgroundColor: "#FAE5DF",
        opacity: 0.6,
    },
    Circle3: {
        position: "absolute",
        width: 88,
        height: 85,
        left: -40,
        top: 169,
        backgroundColor: "#F5CAC2",
        opacity: 0.87,
    },
    ForgetPassword: {
        top: responsiveHeight(21),
        textAlign: "right",
        right: responsiveWidth(8),
    },
    LoginText: {
        textAlign: "center",
        fontSize: responsiveFontSize(3),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        marginTop: 30,
        top: responsiveHeight(26),
        fontFamily: "Poppins",
    },
    InputEmail: {
        width: "100%",
        fontSize: responsiveFontSize(1.8),
        height: responsiveHeight(5.5),
    },
    Accounttxt: {
        textAlign: "center",
        fontSize: responsiveFontSize(1.8),
        lineHeight: 36,
        width: responsiveWidth(100),
        left: -20,
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