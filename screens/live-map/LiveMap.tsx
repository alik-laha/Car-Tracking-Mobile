import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import Geolocation from "@react-native-community/geolocation";

MapLibreGL.setAccessToken(null);

export default function LiveMapScreen() {
    const cameraRef = useRef<any>(null);
    const watchId = useRef<number | null>(null);
    const [location, setLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                setLocation([longitude, latitude]);
                moveCamera(longitude, latitude);
            },
            err => console.log(err),
            { enableHighAccuracy: true }
        );

        watchId.current = Geolocation.watchPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                setLocation([longitude, latitude]);
                moveCamera(longitude, latitude);
            },
            err => console.log(err),
            {
                enableHighAccuracy: true,
                distanceFilter: 5,
                interval: 5000,
                fastestInterval: 3000,
            }
        );

        return () => {
            if (watchId.current !== null) {
                Geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    const moveCamera = (lng: number, lat: number) => {
        cameraRef.current?.setCamera({
            centerCoordinate: [lng, lat],
            zoomLevel: 16,
            animationDuration: 500,
        });
    };

    if (!location) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <MapLibreGL.MapView
            style={styles.map}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            logoEnabled={false}
            compassEnabled
        >
            <MapLibreGL.Camera
                ref={cameraRef}
                zoomLevel={16}
                centerCoordinate={location}
            />

            {/* Always-visible current location marker */}
            <MapLibreGL.MarkerView coordinate={location}>
                <View style={styles.markerOuter}>
                    <View style={styles.markerInner} />
                </View>
            </MapLibreGL.MarkerView>
        </MapLibreGL.MapView>

    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    markerOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(37, 99, 235, 0.25)",
        justifyContent: "center",
        alignItems: "center",
    },
    markerInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2563EB",
    },

});
