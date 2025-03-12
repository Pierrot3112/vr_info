import { COLORS, SIZES } from "../constants";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Style {
    home: ViewStyle;
    container: ViewStyle;
    text: TextStyle;
}

const styles = StyleSheet.create<Style>({
    home: {
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 10,
    },
});

export default styles;
