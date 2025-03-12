import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    global: ViewStyle;
    headerContainer: ViewStyle;
    headerText: TextStyle;
    scrollSegmentContainer: ViewStyle;
    segmentContainer: ViewStyle;
}

const styles = StyleSheet.create({
    global: {
        height: SIZES.height-70,
        backgroundColor: COLORS.darkBlue,
        paddingTop: 20, 
        paddingHorizontal: 15,
    },

    headerContainer: {
        marginTop: 20,
    },

    headerText: {
        color: COLORS.primary,
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    scrollSegmentContainer: {
        marginTop: 40,
    },

    segmentContainer: {
        height: SIZES.height/7,
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})

export default styles;