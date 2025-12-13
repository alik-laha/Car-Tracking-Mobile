import React from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from "react-native";

const TripsScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Trip Screen</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default TripsScreen;