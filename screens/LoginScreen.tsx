import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useAuth } from '../src/context/authContext'
import { FRAPPE_URL } from "../utils/config";
import { useLogin } from "../hooks/UseLogin";

export default function LoginScreen() {
    const { login, loading, error } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loginSuccess } = useAuth();

    const handleLogin = async () => {
        const success = await login(username, password);
        if (success === true) {
            console.log("Login successful");
            loginSuccess();
        }
    };

    const forgotPassword = async () => {
        if (!username) {
            Alert.alert("Error", "Please enter your email or username first");
            return;
        }

        try {
            await fetch(
                `${FRAPPE_URL}/api/method/frappe.core.doctype.user.user.reset_password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: username }),
                }
            );

            Alert.alert(
                "Success",
                "If the email exists, a password reset link has been sent."
            );
        } catch {
            Alert.alert("Error", "Unable to send reset email");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Car Tracker</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Username or Email"
                placeholderTextColor="#9CA3AF"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity onPress={forgotPassword}>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
    },
    subtitle: {
        color: "#94A3B8",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "#020617",
        borderWidth: 1,
        borderColor: "#1E293B",
        borderRadius: 12,
        padding: 14,
        color: "#fff",
        marginBottom: 14,
    },
    forgot: {
        color: "#60A5FA",
        textAlign: "right",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: "#F87171",
        marginBottom: 12,
        textAlign: "center",
    },
});
