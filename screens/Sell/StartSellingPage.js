import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Button, Image, Text, View } from "native-base";
import { useFonts } from "expo-font";
import { SellPage } from "../../assets";

export default function StartSellingPage() {
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
                <View justifyContent={"center"} alignItems={"center"} flex={1}>
                    <Image
                        width={250}
                        height={250}
                        source={SellPage}
                        alt="Alternate Text"
                    />
                    <Button
                        width={250}
                        backgroundColor="#ED7966"
                        onPress={() => navigation.navigate("ISBNPage")}
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize={14}
                            color="#ffffff"
                        >
                            Start Selling Now!
                        </Text>
                    </Button>
                </View>
            </View>
        </NativeBaseProvider>
    );
}
