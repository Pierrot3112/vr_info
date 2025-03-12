import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    container: ViewStyle;
    head: ViewStyle;
    headContent: ViewStyle;
    title: ViewStyle;
    titleText: TextStyle;
    form: ViewStyle;
    formLogin: ViewStyle;
    image: ImageStyle;
    inputText: TextStyle;
    inputPassword: ViewStyle;
    icon: TextStyle;
    btnSubmit: ViewStyle;
    btnSubmitText: TextStyle;
    registerLink: ViewStyle;
    btnQuitModal: ViewStyle;
    modal: ViewStyle;
    headModal: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray2,
        height: SIZES.height,
        position: 'relative'
    },

    head: {
        height: '59%',
        width: SIZES.width,
        marginTop: 0,
        marginBottom: 30,
        position: 'absolute',
        top: 25,
        objectFit: "cover",
        opacity: 0.85,
    },

    headContent: {
        backgroundColor: COLORS.secondary,
        height: '100%'
    },

    image: {
        width: 150,
        height: 150,
    },

    title: {
        position: 'absolute',
        top: '33.5%',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.medium * 3.5,
        paddingVertical: SIZES.medium,
        borderRadius: SIZES.large
    },

    titleText: {
        fontSize: SIZES.medium * 1.5,
        fontWeight: 'bold'
    },

    form: {
        height: SIZES.height / 4,
        width: SIZES.width,
        paddingTop: 50,
        paddingBottom: 20,
        gap: 20,
        alignItems: 'center',
        backgroundColor: COLORS.gray2,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },


    formLogin: {
        height: SIZES.height / 4,
        width: SIZES.width,
        paddingTop: 100,
        paddingBottom: 20,
        gap: 30,
        alignItems: 'center',
        backgroundColor: COLORS.gray2,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },

    inputText: {
        width: '90%',
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.black,
    },

    inputPassword: {
        flexDirection: "row", 
        alignItems: "center", 
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.black,
        width: '90%',
        justifyContent: 'space-between'
    },


    input: {
        padding: 10,
        fontSize: 16,
    },
    icon: {
        color: COLORS.secondary
    },  

    btnSubmit: {
        width: SIZES.width - 30,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: SIZES.small,
        borderRadius:  SIZES.large
    },

    btnSubmitText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.primary
    },

    btnQuitModal: {
        height: SIZES.xlarge, 
        width: SIZES.xlarge, 
        backgroundColor: COLORS.gray2,
        fontSize: SIZES.large,
        fontWeight: 'bold', 
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
    },

    modal: {
        height: SIZES.height - 90,
        width: SIZES.width - 10,
        marginHorizontal: 'auto',
        marginVertical: 'auto',
        position: 'relative',
        top: -2
    },

    headModal: {
        backgroundColor: 'white', 
        paddingHorizontal: 20, 
        borderRadius: 10 ,
        paddingTop: 50,
        paddingBottom: 20
    }
})
export default styles;