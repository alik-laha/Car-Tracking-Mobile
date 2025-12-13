import { Platform } from "react-native";
import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
} from "react-native-permissions";

export async function checkLocationPermission() {
    const permission =
        Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) return true;

    if (result === RESULTS.DENIED) {
        const req = await request(permission);
        return req === RESULTS.GRANTED;
    }

    return false; // BLOCKED or UNAVAILABLE
}
