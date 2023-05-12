import { StyleSheet, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
    VStack,
    HStack,
    Text,
    View,
    NativeBaseProvider,
    Button,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Settings() {
    const navigation = useNavigation();

    const logoutAlert = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Yes",
                onPress: () => {
                    navigation.navigate("Login");
                },
            },
            {
                text: "No",
            },
        ]);
    };
    const deleteAlert = () => {
        Alert.alert(
            "DELETE ACCOUNT",
            "Are you sure you want to DELETE ACCOUNT?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        deleteAccount();
                        navigation.navigate("Register");
                    },
                },
                {
                    text: "No",
                },
            ]
        );
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

    const deleteAccount = async () => {
        try {
            await authAxios.delete(`/auth/deleteaccount/${global.id}`);
        } catch (error) {
            console.log(error.response);
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
    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                <View>
                    <Text style={styles.settingText} fontFamily="Poppins">
                        Settings
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: responsiveHeight(12),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={() => navigation.navigate("LegalAndAbout")}
                    >
                        <HStack space={responsiveWidth(31)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                left={responsiveWidth(0)}
                                color="#ffffff"
                            >
                                Legal And About
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        top={responsiveHeight(3)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={deleteAlert}
                    >
                        <HStack space={responsiveWidth(35)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                left={responsiveWidth(0)}
                                color="#ffffff"
                            >
                                Delete Account
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                    <Button
                        width={responsiveWidth(95)}
                        height={responsiveHeight(8)}
                        top={responsiveHeight(6)}
                        opacity={0.8}
                        rounded={0}
                        backgroundColor="#ED7966"
                        onPress={logoutAlert}
                    >
                        <HStack space={responsiveWidth(62)}>
                            <Text
                                fontFamily="Poppins"
                                fontSize={22}
                                left={responsiveWidth(0)}
                                color="#ffffff"
                            >
                                Logout
                            </Text>
                            <MaterialCommunityIcons
                                name="greater-than"
                                size={20}
                                color="#ffffff"
                                top={4.5}
                            />
                        </HStack>
                    </Button>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    settingText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(8),
    },
});
