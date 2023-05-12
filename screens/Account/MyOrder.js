import {
    FlatList,
    StyleSheet,
    BackHandler,
    ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import {
    useNavigation,
    useFocusEffect,
    useIsFocused,
} from "@react-navigation/native";
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
    Center,
} from "native-base";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Order } from "../../assets";
import { ScrollView } from "react-native-virtualized-view";

export default function PostedProduct() {
    const navigation = useNavigation();
    const IsFocused = useIsFocused();
    const [buyDetail, setBuyDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
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

    const userBuy = async () => {
        try {
            const response = await authAxios.get(`/buy/userorder`);
            setBuyDetails(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        setTimeout(() => userBuy(), 300);
    }, [IsFocused]);

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

    const data = buyDetail;

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <>
                        <Text style={styles.orderText} fontFamily="Poppins">
                            My Orders
                        </Text>

                        {data.length === 0 ? (
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Center>
                                    <Image
                                        width={250}
                                        height={250}
                                        source={Order}
                                        alt="Alternate Text"
                                    />
                                </Center>
                                <Button
                                    bgColor={"#ED7966"}
                                    width="80%"
                                    marginTop={10}
                                    onPress={() =>
                                        navigation.navigate("HomeScreenTab", {
                                            screen: "HomeScreen",
                                        })
                                    }
                                >
                                    <Text
                                        fontFamily="Poppins"
                                        color={"#FFFFFF"}
                                    >
                                        Grab the Book you deserve!
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
                                                            source={{
                                                                uri: item.book
                                                                    .book_cover_page,
                                                            }}
                                                            width={90}
                                                            height={137}
                                                            alt="Alternate Text"
                                                            left={1.5}
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
                                                                {
                                                                    item.book
                                                                        .book_name
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
                                                            >
                                                                ISBN-{" "}
                                                                {
                                                                    item.book
                                                                        .book_isbn
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
                                                            >
                                                                Price-{" "}
                                                                {
                                                                    item.book
                                                                        .book_price
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
                                                                Purchase date-{" "}
                                                                {
                                                                    item.purchase_date
                                                                }
                                                            </Text>
                                                        </VStack>
                                                        <Spacer />
                                                        <VStack
                                                            top={responsiveHeight(
                                                                1
                                                            )}
                                                            space={responsiveHeight(
                                                                8
                                                            )}
                                                            
                                                            right={3}
                                                        >
                                                            <Text
                                                                left={responsiveWidth(
                                                                    18
                                                                )}
                                                            >
                                                                <Ionicons
                                                                    name="receipt"
                                                                    size={25}
                                                                    onPress={() =>
                                                                        navigation.navigate(
                                                                            "UserReceipt",
                                                                            {
                                                                                book: item
                                                                                    .book
                                                                                    .id,
                                                                                buyername:
                                                                                    item.buyer_name,
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                            </Text>
                                                            <Button
                                                                width={responsiveWidth(
                                                                    28
                                                                )}
                                                                left={-12}
                                                                backgroundColor="#ED7966"
                                                                onPress={() =>
                                                                    navigation.navigate(
                                                                        "OrderDetails",
                                                                        {
                                                                            book_name:
                                                                                item
                                                                                    .book
                                                                                    .book_name,
                                                                            book_isbn:
                                                                                item
                                                                                    .book
                                                                                    .book_isbn,
                                                                            book_genre:
                                                                                item
                                                                                    .book
                                                                                    .book_genre,
                                                                            purchase_date:
                                                                                item.purchase_date,
                                                                            seller: item
                                                                                .book
                                                                                .user
                                                                                .username,
                                                                            price: item
                                                                                .book
                                                                                .book_price,
                                                                            status: item.delivery_status,
                                                                            buyername:
                                                                                item.buyer_name,
                                                                            buyeraddress:
                                                                                item.buyer_address,
                                                                            buyermobile:
                                                                                item.buyer_mobile_no,
                                                                            book_image:
                                                                                item
                                                                                    .book
                                                                                    .book_cover_page,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    fontFamily="Poppins"
                                                                    fontSize={
                                                                        15
                                                                    }
                                                                    color="#ffffff"
                                                                >
                                                                    Status
                                                                </Text>
                                                            </Button>
                                                        </VStack>
                                                    </HStack>
                                                </Box>
                                            )}
                                            keyExtractor={(item) => item.id}
                                        />
                                    </Box>
                                </ScrollView>
                            </>
                        )}
                    </>
                )}
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    orderText: {
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
});
