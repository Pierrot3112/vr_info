import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');


const COLORS = {
    primary: "#F2F2F7",
    secondary: "#007AFF",
    tertiary: "#1c1c1e",

    bgBlue: "#015599",
    darkBlue: "#03038b",

    gray: "#83829A",
    gray2: "#C1C0C8",

    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF3B30",
    green: "#34C759",
    lightWhite: "#FAFAFC",
};


const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxLarge: 44,
    height,
    width
};

export { COLORS, SIZES };