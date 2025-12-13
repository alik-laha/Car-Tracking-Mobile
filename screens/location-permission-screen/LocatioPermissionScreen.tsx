import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function LocationPermissionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location Required</Text>

            <Text style={styles.subtitle}>
                We need your location to track the vehicle journey and ensure accurate
                trip data.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openSettings()}
            >
                <Text style={styles.buttonText}>Enable Location</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                Please allow location permission to continue.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: "#CBD5E1",
        textAlign: "center",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    note: {
        marginTop: 16,
        fontSize: 12,
        color: "#94A3B8",
    },
});
