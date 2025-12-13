import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FRAPPE_URL } from "../utils/config";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (username: string, password: string) => {
        console.log("Attempting login...");
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `${FRAPPE_URL}/api/method/car_tracking.api.mobile_login.mobile_login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: String(username),
                        password: String(password),
                    }),
                }
            );

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();

            const { api_key, api_secret } = data.message;

            await AsyncStorage.multiSet([
                ["api_key", api_key],
                ["api_secret", api_secret],
            ]);

            return true;
        } catch (e) {
            setError("Invalid credentials");
            return e;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
