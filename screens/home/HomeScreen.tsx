import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Home Screen</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default HomeScreen;