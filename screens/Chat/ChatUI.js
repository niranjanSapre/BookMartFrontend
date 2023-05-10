import { ActivityIndicator, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import React, { useState, useCallback, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { NativeBaseProvider, View } from "native-base";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

export default function ChatUI() {
    const route = useRoute();
    const isFocused = useIsFocused();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    customSort = (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
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

    const addNewChat = async (msg) => {
        const formData = new FormData();

        formData.append("sender", global.id);
        formData.append("receiver", route.params.id);
        formData.append("message", msg);

        try {
            await authAxios.post("/chat/", formData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getOldChats = async () => {
        try {
            const resultReceiver = await authAxios.get("/chat/receiver");
            const resultSender = await authAxios.get("/chat/");
            const msgArr = [];

            const mergeChat = [];

            resultReceiver.data.forEach((element) => {
                mergeChat.push(element);
            });

            resultSender.data.forEach((element) => {
                mergeChat.push(element);
            });

            mergeChat.forEach((element) => {
                if (
                    element.receiver.id === global.id &&
                    element.sender.id === route.params.id
                ) {
                    const msgObj = {
                        _id: element.id,
                        text: element.message,
                        createdAt: element.timestamp,
                        user: {
                            _id: 2,
                            avatar: require("../../assets/images/Avtar.png"),
                        },
                    };
                    msgArr.push(msgObj);
                } else if (
                    element.receiver.id === route.params.id &&
                    element.sender.id === global.id
                ) {
                    const msgObj = {
                        _id: element.id,
                        text: element.message,
                        createdAt: element.timestamp,
                        user: {
                            _id: 1,
                        },
                    };
                    msgArr.push(msgObj);
                }
            });
            setMessages(msgArr.sort(customSort));
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(
        React.useCallback(() => {
            getOldChats();
        }),
        [isFocused]
    );

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        addNewChat(messages[0].text);
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#ed7966",
                    },
                    left: {
                        backgroundColor: "#FAE5DF",
                    },
                }}
                textStyle={{
                    right: {
                        color: "#ffffff",
                        fontFamily: "Poppins",
                    },
                    left: {
                        color: "#000000",
                        fontFamily: "Poppins",
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        size={32}
                        color={"#ed7966"}
                        style={{ marginBottom: 5, marginRight: 5 }}
                    />
                </View>
            </Send>
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name="angle-double-down" size={22} color={"black"} />
        );
    };

    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NativeBaseProvider>
            <View backgroundColor={"#ffffff"} flex={1}>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#ED7966" />
                    </View>
                ) : (
                    <GiftedChat
                        messages={messages}
                        onSend={(messages) => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        renderBubble={renderBubble}
                        alwaysShowSend
                        renderSend={renderSend}
                        scrollToBottom={true}
                        isTyping
                        keyboardShouldPersistTaps="never"
                        placeholder="Message"
                        scrollToBottomComponent={scrollToBottomComponent}
                    />
                )}
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    loader: {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
