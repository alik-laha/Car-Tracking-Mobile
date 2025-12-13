import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/authContext";

const ProfileScreen = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: logout, // ✅ logout ONLY here
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#0F172A",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 30,
    },
    logoutBtn: {
        backgroundColor: "#EF4444",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
