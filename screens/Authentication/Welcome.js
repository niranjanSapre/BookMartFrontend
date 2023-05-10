import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import {
    responsiveHeight,
    responsiveWidth,
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
} from "native-base";
import { useFonts } from "expo-font";
import { Welcomeimg } from "../../assets";

export default function Welcome() {
    const navigation = useNavigation();

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
                    <Circle style={styles.Circle1} />
                    <Circle style={styles.Circle2} />
                    <Circle style={styles.Circle3} />
                </View>
                <View>
                    <Center>
                        <Image
                            position={"absolute"}
                            width={220}
                            height={230}
                            left={responsiveWidth(19)}
                            top={responsiveHeight(35)}
                            source={Welcomeimg}
                            alt="Alternate Text"
                        />
                    </Center>

                    <Box>
                        <Text style={styles.WelcomeText}>
                            Start your reading journey now!
                        </Text>
                    </Box>
                </View>

                <Box style={styles.Box1}>
                    <Button
                        style={styles.LoginBtn}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize={24}
                            color="#ffffff"
                        >
                            Get Started
                        </Text>
                    </Button>
                </Box>
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
    WelcomeImage: {
        position: "absolute",
        width: 220,
        height: 230,
        left: responsiveWidth(19),
        top: responsiveHeight(35),
    },
    WelcomeText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        marginTop: 30,
        top: responsiveHeight(64),
        fontFamily: "Poppins",
    },
    Box1: {
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
        marginBottom: 10,
    },
    LoginBtn: {
        width: responsiveWidth(90),
        height: 68,
        marginTop: responsiveHeight(4),
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: "#ED7966",
    },
    LoginText: {
        fontFamily: "Poppins",
        fontSize: 24,
        color: "#ffffff",
    },
});
