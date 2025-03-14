import { COLORS, SIZES } from "../constants";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface Style {
    home: ViewStyle;
    container: ViewStyle;
    text: TextStyle;
    imageContainer: ViewStyle;
    loaderContainer: ViewStyle;
    loaderText: TextStyle;
    logo: ImageStyle;
}

const styles = StyleSheet.create<Style>({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgBlue,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.primary,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, 
    },
    loaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, 
    },
    loaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.gray2,
        marginHorizontal: 5, 
    },
    animatedLoaderText: {
        opacity: 0.5,
        transform: [{ scale: 1.5 }],
    },
});

export default styles;
