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
    logo: ViewStyle;
    forgotPassword: TextStyle;
    loginTitle: ViewStyle;
    textLog1:TextStyle;
    textLog2:TextStyle;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
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

    logo: {
        height: SIZES.width/7.5,
        width: 50,
        marginTop: 0,
        marginBottom: 30,
        position: 'absolute',
        right: '-75%',
        objectFit: "cover",
        opacity: 0.85,
        borderRadius: 50
    },

    headContent: {
        backgroundColor: COLORS.bgBlue,
        height: '100%'
    },

    image: {
        width: 150,
        height: 150,
    },

    title: {
        position: 'absolute',
        top:  SIZES.height/3,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.medium * 3.5,
        paddingVertical: SIZES.medium,
        borderRadius: SIZES.large,zIndex: 1000
    },

    titleText: {
        fontSize: SIZES.medium * 1.5,
        fontWeight: 'bold'
    },

    form: {
        height: SIZES.height/2,
        width: SIZES.width,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },


    formLogin: {
        height: SIZES.height / 4,
        width: SIZES.width,
        paddingBottom: 20,
        gap: 30,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: 'relative',
        paddingTop: 110,
    },

    loginTitle: {
        marginTop: 20,
        position: 'absolute',
        left: 20
    },

    inputText: {
        width: '90%',
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderBottomColor: COLORS.bgBlue,
        borderRadius: 10,
    },

    inputPassword: {
        display: 'flex',
        flexDirection: "row", 
        alignItems: 'center',
        width: '90%',
        padding: 7,
        fontSize: 16,
        borderWidth: 1,
        borderBottomColor: COLORS.bgBlue,
        borderRadius: 10,
        justifyContent: 'space-between'
    },


    input: {
        padding: 10,
        fontSize: 16,
    },
    icon: {
        color: COLORS.bgBlue
    },  

    forgotPassword:{
        marginTop: -10,  
        marginRight:0,  
        color: COLORS.bgBlue,
        position: 'absolute',
        right: -160
    },

    btnSubmit: {
        width: SIZES.width - 30,
        backgroundColor: COLORS.bgBlue,
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
    },

    textLog1:{
        fontSize:16
    },

    textLog2:{
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Faster One',
        fontStyle: 'normal',
        color: COLORS.bgBlue
    }
})
export default styles;