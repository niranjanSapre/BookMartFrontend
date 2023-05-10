import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Image, Text, View, HStack } from "native-base";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { Message } from "../../assets";

export default function Chat() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    const ConvertDate = (d) => {
        const date = new Date(d);
        const dateArray = date
            .toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })
            .split(":");
        const getAMPM = dateArray[2].split(" ");
        return dateArray[0] + ":" + dateArray[1] + " " + getAMPM[1];
    };

    customSort = (a, b) => {
        const dateA = new Date(a.messageTimestamp);
        const dateB = new Date(b.messageTimestamp);
        if (dateA < dateB) return 1;
        else if (dateA > dateB) return -1;
        return 0;
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

    const getOldChats = async () => {
        try {
            const resultSender = await authAxios.get("/chat/");
            const resultReceiver = await authAxios.get("/chat/receiveonly");
            const mergeChat = [];

            resultReceiver.data.forEach((element) => {
                mergeChat.push(element);
            });

            resultSender.data.forEach((element) => {
                mergeChat.push(element);
            });

            const userNameSender = [];

            if (resultReceiver.data.length !== undefined) {
                resultReceiver.data.forEach((element) => {
                    if (!userNameSender.includes(element.sender.username)) {
                        userNameSender.push(element.sender.username);
                    }
                });
            }

            if (resultSender.data.length !== undefined) {
                resultSender.data.forEach((element) => {
                    if (!userNameSender.includes(element.receiver.username)) {
                        userNameSender.push(element.receiver.username);
                    }
                });
            }

            const userMessageDetails = [];
            let messageCount = 0;
            let latestMessage = "";
            let latestMessageTime = "";

            const message = [];

            userNameSender.forEach((user) => {
                mergeChat.forEach((data) => {
                    if (
                        data.sender.username === user &&
                        data.receiver.username === global.username
                    ) {
                        if (data.message_status === true) {
                            messageCount = 0;
                        } else {
                            messageCount++;
                        }
                        latestMessage = data.message;
                        latestMessageTime = data.timestamp;
                        const msgObj = {
                            id: Math.random() * 100000,
                            userId: data.sender.id,
                            userName: user,
                            messageCount: messageCount,
                            userImg: require("../../assets/images/Avtar.png"),
                            messageText: latestMessage,
                            messageTimestamp: latestMessageTime,
                            messageTime: ConvertDate(latestMessageTime),
                        };
                        message.push(msgObj);
                    } else if (
                        data.sender.username === global.username &&
                        data.receiver.username === user
                    ) {
                        latestMessage = data.message;
                        latestMessageTime = data.timestamp;
                        const msgObj = {
                            id: Math.random() * 100000,
                            userId: data.receiver.id,
                            userName: user,
                            messageCount: 0,
                            userImg: require("../../assets/images/Avtar.png"),
                            messageText: latestMessage,
                            messageTimestamp: latestMessageTime,
                            messageTime: ConvertDate(latestMessageTime),
                        };
                        message.push(msgObj);
                    }
                });
            });

            const sortMessage = message.sort(customSort);
            userNameSender.forEach((user) => {
                sortMessage.forEach((data) => {
                    if (user === data.userName) {
                        if (userMessageDetails.length === 0) {
                            userMessageDetails.push(data);
                        } else if (
                            userMessageDetails.length !== 0 &&
                            !userMessageDetails.find((e) => e.userName === user)
                        ) {
                            userMessageDetails.push(data);
                        }
                    }
                });
            });
            setMessages(userMessageDetails.sort(customSort));
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getOldChats();
    }, [isFocused]);

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

    return (
        <NativeBaseProvider>
            <View style={styles.container} backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderColor: "gray",
                                top: 40,
                            }}
                        >
                            <Text fontFamily="Poppins" style={styles.chatText}>
                                Messages
                            </Text>
                        </View>
                        {messages.length === 0 ? (
                            <View
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1}
                            >
                                <Image
                                    width={300}
                                    height={250}
                                    source={Message}
                                    alt="Alternate Text"
                                />
                                <Text
                                    fontFamily="Poppins"
                                    textAlign={"center"}
                                    fontSize={responsiveFontSize(3)}
                                >
                                    No Recent Chats!
                                </Text>
                            </View>
                        ) : (
                            <View top={10}>
                                <FlatList
                                    data={messages}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            width={"100%"}
                                            onPress={() =>
                                                navigation.navigate("ChatUI", {
                                                    userName: item.userName,
                                                    userImg: item.userImg,
                                                    id: item.userId,
                                                    status: "ChatUI",
                                                })
                                            }
                                        >
                                            <View style={styles.UserInfo}>
                                                <View
                                                    padding-top={15}
                                                    padding-bottom={15}
                                                >
                                                    <Image
                                                        source={item.userImg}
                                                        width={50}
                                                        height={50}
                                                        top={4}
                                                        border-radius={25}
                                                        alt="Alternative text"
                                                    />
                                                </View>
                                                <View
                                                    style={styles.TextSection}
                                                >
                                                    <View
                                                        style={
                                                            styles.UserInfoText
                                                        }
                                                    >
                                                        <HStack space={5}>
                                                            <View>
                                                                <Text
                                                                    style={
                                                                        styles.UserName
                                                                    }
                                                                    numberOfLines={
                                                                        1
                                                                    }
                                                                    fontFamily={
                                                                        "PoppinsBold"
                                                                    }
                                                                >
                                                                    {
                                                                        item.userName
                                                                    }
                                                                </Text>
                                                            </View>
                                                            {item.messageCount !=
                                                            0 ? (
                                                                <View
                                                                    style={
                                                                        styles.Circles
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.CircleText
                                                                        }
                                                                    >
                                                                        {
                                                                            item.messageCount
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            ) : (
                                                                <View></View>
                                                            )}
                                                        </HStack>
                                                    </View>
                                                    <View>
                                                        <HStack space={4}>
                                                            <Text
                                                                style={
                                                                    styles.MessageText
                                                                }
                                                                fontFamily={
                                                                    "Poppins"
                                                                }
                                                                numberOfLines={
                                                                    1
                                                                }
                                                                width={185}
                                                            >
                                                                {
                                                                    item.messageText
                                                                }
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.PostTime
                                                                }
                                                                fontFamily={
                                                                    "Poppins"
                                                                }
                                                                textAlign={
                                                                    "center"
                                                                }
                                                            >
                                                                {
                                                                    item.messageTime
                                                                }
                                                            </Text>
                                                        </HStack>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </>
                )}
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    chatText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 400,
        lineHeight: 36,
        width: responsiveWidth(100),
        left: responsiveWidth(32),
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    TextSection: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 15,
        paddingLeft: 15,
        marginleft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    UserInfoText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    UserName: {
        fontSize: 16,
        width: 200,
    },
    MessageText: {
        fontSize: 14,
        color: "#333333",
    },
    UserInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    PostTime: {
        fontSize: 12,
        color: "#666",
    },
    Circles: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ED7966",
    },
    CircleText: {
        textAlign: "center",
        color: "#FFFFFF",
    },
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
