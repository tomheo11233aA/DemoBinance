import { StyleSheet } from "react-native";
import { theme } from ".";

export const styled = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    redButton: {
        height: 40,
        borderRadius: 5,
        backgroundColor: theme.colors.textRed,
        marginVertical: 20
    },
    redButton2: {
        height: 35,
        width: 170,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.textRed,
    },
    comingSoonButton: {
        backgroundColor: theme.colors.textRed,
        paddingVertical: 10,
        width: 160,
        borderRadius: 10,
    },
    inputOne: {
        borderColor: theme.colors.grayBorderInput,
        borderWidth: 1,
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 45,
    },
    btnCancel: {
        height: 35,
        width: 90,
        borderRadius: 5,
        borderColor: theme.colors.gray3,
        borderWidth: 1,
    },
    box1: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    itemHistory: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: theme.colors.gray3,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    gameCardHome: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    }
})