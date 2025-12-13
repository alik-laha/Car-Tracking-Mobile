import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "api_key";
const API_SECRET = "api_secret";

export const saveAuth = async (apiKey: string, apiSecret: string) => {
    await AsyncStorage.multiSet([
        [API_KEY, apiKey],
        [API_SECRET, apiSecret],
    ]);
};

export const getAuth = async () => {
    const values = await AsyncStorage.multiGet([API_KEY, API_SECRET]);

    return {
        apiKey: values[0][1],
        apiSecret: values[1][1],
    };
};

export const clearAuth = async () => {
    await AsyncStorage.multiRemove([API_KEY, API_SECRET]);
};

export const isLoggedIn = async (): Promise<boolean> => {
    const { apiKey, apiSecret } = await getAuth();
    return !!apiKey && !!apiSecret;
};
