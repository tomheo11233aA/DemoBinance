import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { useState } from "react"
import { ImageSourcePropType } from "react-native"
import ModalShare from "./ModalShare"
import { useAppDispatch, useTheme } from "@hooks/index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import contants from "@util/contants"
import userSlice from "@slice/userSlice"
import { screen } from "@util/screens"
import { navigate, reset } from "@navigation/navigationRef"

interface Data {
    title: string;
    icon: ImageSourcePropType;
}

const data: Data[] = [
    {
        title: 'Payment Methods',
        icon: require('@images/profile/dolar.png'),
    },
    {
        title: 'Gift Card',
        icon: require('@images/profile/gift4.png'),
    },
    {
        title: 'My Gifts',
        icon: require('@images/profile/gift3.png'),
    },
    {
        title: 'Clear Cache',
        icon: require('@images/profile/clear.png'),
    },
    {
        title: 'Help & Support',
        icon: require('@images/future/book.png'),
    },
    // {
    //     title: 'Share the app',
    //     icon: require('@images/future/share.png'),
    // },
    {
        title: 'Log out',
        icon: require('@images/wallet/logout.png'),
    },
]

export default ({ t }: any) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [isShowModalShare, setShowModalShare] = useState(false)

    const handleItemData = (item: Data) => {
        if (item.title === 'Log out') {
            handleLogout()
        } else {
            navigate(screen.COMMING_SOON)
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem(contants.TOKEN)
        dispatch(userSlice.actions.signOut())
        reset(0, screen.LOGIN)
    }

    return (
        <Box>
            {data.map((item, index) =>
                <Btn
                    row
                    alignCenter
                    marginTop={35}
                    key={item.title}
                    justifySpaceBetween
                    onPress={() => handleItemData(item)}
                >
                    <Box row alignCenter>
                        <Icon
                            size={19}
                            marginRight={10}
                            source={item.icon}
                            tintColor={'#90929E'}
                            resizeMode={'contain'}
                        />
                        <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                            {t(item.title)}
                        </Txt>
                    </Box>
                    <Box row alignCenter>
                        {item.title === 'Clear Cache' &&
                            <Txt
                                size={12}
                                marginRight={10}
                                fontFamily={fonts.RM}
                                color={colors.grayBlue2}
                            >
                                {contants.VERSION}
                            </Txt>
                        }

                        <Icon
                            size={10}
                            resizeMode={'contain'}
                            source={require('@images/wallet/right_arrow.png')}
                        />
                    </Box>
                </Btn>
            )}
            <ModalShare
                isShow={isShowModalShare}
                setShow={setShowModalShare}
            />
        </Box>
    )
}