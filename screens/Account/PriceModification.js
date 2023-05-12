import { StyleSheet, Modal, Alert, Pressable, } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import {
    NativeBaseProvider,
    Button,
    Text,
    View,
    Stack,
    Input,
    HStack,
    VStack,
    Image,
    Center
} from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useFonts } from "expo-font";
import axios from 'axios';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function PriceModification() {
    const navigation = useNavigation();
    const route = useRoute();
    const [price, setPrice] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");

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

    const changePrice = async (id) => {
        const formData = new FormData();

        formData.append("book_price", price);        

        try {
            const response = await authAxios.patch(`/sell/${id}`, formData);
            bookData.forEach(element => {
                if(element.id === response.id) {
                    element.book_price = price
                }
            });
        } catch (error) {
            console.log(error.response);
        } 
    }

    const send = () => {
        if (price === "") {
            setText("Please enter price");
            setModalVisible(true);
            return;
        }

        if (!Number(price) && Number(price)!==0) {
            setText("Invalid price entered");
            setModalVisible(true);
            return;
        }

        if(Number(price)<=0) {
            setText("Price should not be zero or negative");
            setModalVisible(true);
            return;
        }

        changePrice(route.params.bookId);
        navigation.navigate("PostedProduct");
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
                <Text style={styles.priceText} fontFamily="Poppins">
                    Price Modification
                </Text>

                <View position={'absolute'} top={150}>
                    <VStack space={6} left={5}>
                        <View style={styles.EstTxt}>
                            <HStack space={6}>
                                <Foundation name="book" size={32} color="black" />
                                <Text fontFamily={"Poppins"} numberOfLines={2} width={300}>
                                    Book Name - {route.params.bookName}
                                </Text>
                            </HStack>
                        </View>
                        <View style={styles.EstTxt} >
                            <HStack space={5}>
                                <Ionicons name="pricetags-outline" size={28} color="black" />
                            <Text fontFamily={"Poppins"}>
                                Old Price - {route.params.bookPrice} {"\u20A8"}.
                            </Text>
                            </HStack>
                        </View>
                        <View style={styles.EstTxt} >
                            <HStack space={5}>
                                <Ionicons name="pricetags" size={28} color="black" />
                                <Text fontFamily={"Poppins"}>
                                    Update Price -
                                </Text>
                                <Input
                                    fontFamily="Poppins"
                                    bgColor={"#FAE5DF"}
                                    borderColor={"#FAE5DF"}
                                    variant="rounded"
                                    width={120}
                                    top={-10}
                                    //defaultValue={price}
                                    onChangeText={(name) =>
                                        setPrice(name)
                                    }
                                    keyboardType="numeric"
                                />
                            </HStack>
                        </View>
                            
                    </VStack>
                </View>

                <View style={styles.tooltip}>
                    <View style={styles.container}>
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
                                            setModalVisible(
                                                !modalVisible
                                            )
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

                <View top={350}>
                    <Center>
                    <Image
                        //top={2}
                        //left={250}
                        //position={"absolute"}
                        borderWidth={2}
                        borderColor={"#000000"}
                        height={290}
                        width={190}
                        source={{ uri: route.params.bookCoverPage }}
                        alt="Alternate Text"
                    />
                    </Center>
                </View>

                <Button
                    style={styles.next}
                    backgroundColor="#ED7966"
                    onPress={send}
                >
                    <Text fontFamily="Poppins" fontSize={24} color="#ffffff">
                        Submit
                    </Text>
                </Button>
            </View>
        </NativeBaseProvider>
  )
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
        top: responsiveHeight(8),
    },
    tooltip: {
        top: responsiveHeight(16),
        left: responsiveWidth(-15),
    },
    EstTxt: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: 400,
        lineHeight: 36,
        //top: responsiveHeight(1),
        left: 10
    },
    EstPrice: {
        top: responsiveHeight(-0.8),
        width: responsiveWidth(35),
        fontSize: responsiveFontSize(1.8),
        opacity: 0.7,
        height: responsiveHeight(5),
        left: 20
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
    // animated: {
    //     animation: "up-down 2s ease-in-out infinite alternate-reverse both"
    // },
      
    // @-webkit-keyframes up-down: {
    // 0%{
    //     transform: translateY(10px);
    // }
    // 100%{
    //     transform: translateY(-10px);
    // }
    // }
    
    // @keyframes up-down: {
    // 0%{
    //     transform: translateY(10px);
    // }
    // 100%{
    //     transform: translateY(-10px);
    // }
    // }
});

