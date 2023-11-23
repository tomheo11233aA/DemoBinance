import { Alert } from "react-native"

export const alertGoBack = (
    yesOnPress: () => {},
    title = 'Go back',
    message = 'Are you sure go back!',
    textYes = 'Yes',
    textCancel = 'Cancel',
    cancelOnPress = () => null
) => {
    Alert.alert(title, message, [
        {
            text: textCancel,
            onPress: cancelOnPress,
        },
        { text: textYes, onPress: yesOnPress }
    ])
}

export const alertConfirm = (
    title: string,
    message: string,
    textYes = 'Yes',
    yesOnPress: () => {},
    textCancel = 'Cancel',
    cancelOnPress = () => null
) => {
    Alert.alert(title, message, [
        {
            text: textCancel,
            onPress: cancelOnPress,
        },
        { text: textYes, onPress: yesOnPress }
    ])
}

export const alertCannotConnect = () => {
    Alert.alert('Không thể kết nối với server, vui lòng thử lại!')
}

export const cannotConnect = () => 'Unable to connect to server, please try again!'

export const delay = (ms: number) => new Promise(
    (resolve: any) => setTimeout(resolve, ms)
)