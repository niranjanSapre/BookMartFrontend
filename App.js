import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Authentication/Welcome";
import Register from "./screens/Authentication/Register";
import Login from "./screens/Authentication/Login";
import Account from "./screens/Account/Account";
import SellPageBookDetails from "./screens/Sell/SellPageBookDetails";
import UploadPhotos from "./screens/Sell/UploadPhotos";
import Price from "./screens/Sell/Price";
import Tabs from "./navigations/Tabs";
import ReviewPage from "./screens/Sell/ReviewPage";
import ISBNPage from "./screens/Sell/ISBNPage";
import Buy1 from "./screens/Buy/Buy1";
import Settings from "./screens/Account/Settings";
import PostedProduct from "./screens/Account/PostedProduct";
import Chat from "./screens/Chat/Chat";
import ChatUI from "./screens/Chat/ChatUI";
import OrderSummary from "./screens/Buy/OrderSummary";
import MyOrder from "./screens/Account/MyOrder";
import OrderDetails from "./screens/Account/OrderDetails";
import LegalAndAbout from "./screens/Account/LegalAndAbout";
import GenreFilter from "./screens/Buy/GenreFilter";
import Search from "./screens/Home/Search";
import PaymentDetails from "./screens/Buy/PaymentDetails";
import BillingDetails from "./screens/Buy/BillingDetails";
import Receipt from "./screens/Buy/Receipt";
import UserReceipt from "./screens/Buy/UserReceipt";
import PriceModification from "./screens/Account/PriceModification";

const Stack = createNativeStackNavigator();
export default function App() {
    const [loaded] = useFonts({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    });
    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="HomeScreen" component={Tabs} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="PostedProduct" component={PostedProduct} />
                <Stack.Screen name="OrderSummary" component={OrderSummary} />
                <Stack.Screen name="MyOrder" component={MyOrder} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
                <Stack.Screen name="GenreFilter" component={GenreFilter} />
                <Stack.Screen
                    name="ChatUI"
                    component={ChatUI}
                    options={({ route }) => ({
                        title: route.params.userName,
                        headerStyle: {
                            backgroundColor: "#ED7966",
                        },
                        headerTintColor: "#FFFFFF",
                        headerTitleStyle: {
                            fontFamily: "Poppins",
                        },
                    })}
                />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen
                    name="SellPageBookDetails"
                    component={SellPageBookDetails}
                />

                <Stack.Screen name="UploadPhotos" component={UploadPhotos} />
                <Stack.Screen name="Price" component={Price} />
                <Stack.Screen name="ReviewPage" component={ReviewPage} />
                <Stack.Screen name="ISBNPage" component={ISBNPage} />
                <Stack.Screen name="Buy1" component={Buy1} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="LegalAndAbout" component={LegalAndAbout} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen
                    name="PaymentDetails"
                    component={PaymentDetails}
                />
                <Stack.Screen
                    name="BillingDetails"
                    component={BillingDetails}
                />
                <Stack.Screen name="Receipt" component={Receipt} />
                <Stack.Screen name="UserReceipt" component={UserReceipt} />
                <Stack.Screen
                    name="PriceModification"
                    component={PriceModification}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
