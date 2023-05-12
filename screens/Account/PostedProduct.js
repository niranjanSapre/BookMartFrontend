import {
    FlatList,
    StyleSheet,
    ActivityIndicator,
    BackHandler,
    Modal,
    Alert,
    Pressable,
} from "react-native";
import React, {
    useLayoutEffect,
    useEffect,
    useState,
    useCallback,
} from "react";
import { useFonts } from "expo-font";
import {
    useFocusEffect,
    useNavigation,
    useIsFocused,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    VStack,
    HStack,
    Spacer,
    Box,
    Image,
    Text,
    View,
    NativeBaseProvider,
    Button,
} from "native-base";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";
import { Product } from "../../assets";

export default function PostedProduct() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [modalVisible, setModalVisible] = useState(false);
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const accessToken = global.token;
    const apiUrl = global.apiUrl;

    const priceModification = (id, status, bookName, bookPrice, bookCoverPage) => {
        if (status === "Posted") {
            navigation.navigate("PriceModification", {
                bookId: id,
                bookName: bookName,
                bookPrice: bookPrice,
                bookCoverPage: bookCoverPage
            });
        } else if (status === "Sold") {
            setModalVisible(true);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setBookData([]);
                navigation.navigate("AccountTab", { screen: "Account" });
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPress
                );
        }, [navigation])
    );

    const authAxios = axios.create({
        baseURL: apiUrl,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const bookDelete = async (id) => {
        try {
            await authAxios.delete(`/sell/${id}`);
            const filteredData = [];
            bookData.forEach((element) => {
                if (element.id !== id) {
                    filteredData.push(element);
                }
            });
            setBookData(filteredData);
        } catch (error) {
            console.log(error.response);
        }
    };

    const userupload = async () => {
        try {
            const response = await authAxios.get(`/sell/userupload`);
            setBookData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteAlert = (id, status) => {
        if (status === "Posted") {
            Alert.alert(
                "DELETE BOOK",
                "Are you sure you want to DELETE BOOK?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            bookDelete(id);
                        },
                    },
                    {
                        text: "No",
                    },
                ]
            );
        } else if (status === "Sold") {
            setModalVisible(true);
        }
    };

    useEffect(
        useCallback(() => {
            setTimeout(() => userupload(), 300);
        }),
        [isFocused]
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    });
    if (!loaded) {
        return null;
    }

    const data = bookData;

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <>
                        <Text style={styles.custText} fontFamily="Poppins">
                            Posted Product
                        </Text>

                        {data.length === 0 ? (
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    width={250}
                                    height={250}
                                    source={Product}
                                    alt="Alternate Text"
                                />
                                <Button
                                    bgColor={"#ED7966"}
                                    width="80%"
                                    marginTop={10}
                                    onPress={() =>
                                        navigation.navigate("ISBNPage")
                                    }
                                >
                                    <Text
                                        fontFamily="Poppins"
                                        color={"#FFFFFF"}
                                    >
                                        Start Posting Now!
                                    </Text>
                                </Button>
                            </View>
                        ) : (
                            <>
                                <ScrollView
                                    top={responsiveHeight(10)}
                                    maxHeight={responsiveHeight(89)}
                                >
                                    <Box>
                                        <FlatList
                                            data={data}
                                            renderItem={({ item }) => (
                                                <Box
                                                    borderBottomWidth="1"
                                                    _dark={{
                                                        borderColor: "muted.50",
                                                    }}
                                                    borderColor="muted.800"
                                                    pl={["0", "4"]}
                                                    pr={["0", "5"]}
                                                    py="2"
                                                >
                                                    <HStack
                                                        space={[2, 3]}
                                                        justifyContent="space-between"
                                                    >
                                                        <Image
                                                            position={
                                                                "relative"
                                                            }
                                                            borderWidth={2}
                                                            borderColor={
                                                                "#000000"
                                                            }
                                                            width={90}
                                                            height={137}
                                                            left={1.5}
                                                            source={{
                                                                uri: item.book_cover_page,
                                                            }}
                                                            alt="Alternate Text"
                                                        />
                                                        <VStack left={1}>
                                                            <Text
                                                                _dark={{
                                                                    color: "warmGray.50",
                                                                }}
                                                                color="coolGray.800"
                                                                fontFamily={
                                                                    "PoppinsBold"
                                                                }
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                            >
                                                                {item.book_name}
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily={
                                                                    "Poppins"
                                                                }
                                                            >
                                                                Price-{" "}
                                                                {
                                                                    item.book_price
                                                                }{" "}
                                                                {"\u20A8"}.
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily={
                                                                    "Poppins"
                                                                }
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                            >
                                                                Genre-{" "}
                                                                {
                                                                    item.book_genre
                                                                }
                                                            </Text>
                                                            <Text
                                                                color="coolGray.600"
                                                                _dark={{
                                                                    color: "warmGray.200",
                                                                }}
                                                                fontFamily={
                                                                    "Poppins"
                                                                }
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                            >
                                                                Posted on-{" "}
                                                                {
                                                                    item.posted_date
                                                                }
                                                            </Text>
                                                        </VStack>
                                                        <Spacer />
                                                        <VStack
                                                            space={responsiveHeight(
                                                                8
                                                            )}
                                                            top={1}
                                                        >
                                                            <Text
                                                                left={responsiveWidth(
                                                                    15
                                                                )}
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.container
                                                                    }
                                                                >
                                                                    <View>
                                                                        <MaterialCommunityIcons
                                                                            name="delete"
                                                                            size={
                                                                                28
                                                                            }
                                                                            color="black"
                                                                            onPress={() =>
                                                                                deleteAlert(
                                                                                    item.id,
                                                                                    item.status
                                                                                )
                                                                            }
                                                                        />
                                                                    </View>
                                                                </View>

                                                                <View
                                                                    style={
                                                                        styles.container
                                                                    }
                                                                >
                                                                    <View
                                                                        left={
                                                                            -80
                                                                        }
                                                                    >
                                                                        <MaterialCommunityIcons
                                                                            name="tag-arrow-down"
                                                                            size={
                                                                                28
                                                                            }
                                                                            color="black"
                                                                            onPress={() =>
                                                                                priceModification(
                                                                                    item.id,
                                                                                    item.status,
                                                                                    item.book_name,
                                                                                    item.book_price,
                                                                                    item.book_cover_page
                                                                                )
                                                                            }
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </Text>
                                                            <Button
                                                                width={responsiveWidth(
                                                                    24
                                                                )}
                                                                backgroundColor="#ED7966"
                                                                left={-12}
                                                            >
                                                                <Text
                                                                    fontFamily="Poppins"
                                                                    fontSize={
                                                                        15
                                                                    }
                                                                    color="#ffffff"
                                                                >
                                                                    {
                                                                        item.status
                                                                    }
                                                                </Text>
                                                            </Button>
                                                        </VStack>
                                                    </HStack>
                                                </Box>
                                            )}
                                            keyExtractor={(item) => item.id}
                                            extraData={data}
                                        />
                                    </Box>
                                </ScrollView>
                            </>
                        )}
                    </>
                )}
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
                                        Book is sold, you can't do this action.
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
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    custText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: 20,
        top: responsiveHeight(8),
    },
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
