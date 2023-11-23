import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { navigate } from "@navigation/navigationRef"
import Modality from "@reuse/Modality"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { screen } from "@util/screens"
import { useTranslation } from "react-i18next"
import { ICoins } from "src/model/futuresModel"

interface Props {
    isShow: boolean,
    setShow: Function,
    coin: ICoins;
}

export default ({ isShow, setShow, coin }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const data = [
        {
            icon: require('@images/wallet/send.png'),
            title: 'Send via crypto network',
            note: 'Send to a known crypto address over the crypto network',
            onPress: () => {
                navigate(screen.SEND_USDT, { coin })
                setShow(false)
            }
        },
        // {
        //     icon: require('@images/wallet/hand-coin2.png'),
        //     title: 'Send by email/phone number/ID',
        //     note: 'To Binance users. Easy fast, free',
        //     onPress: () => { },
        // },
    ]

    return (
        <Modality
            show={isShow}
            animation={'slide'}
        >
            <Box width={'100%'} height={'100%'}>

                <Btn flex={1} onPress={() => setShow(false)} />

                <Box
                    backgroundColor={theme.bg}
                    width={'100%'}
                    absolute
                    bottom={0}
                    padding={15}
                    paddingBottom={70}
                    borderTopLeftRadius={15}
                    borderTopRightRadius={15}
                >
                    <Box
                        alignCenter
                        justifySpaceBetween
                        row
                        marginBottom={30}
                    >
                        <Box />
                        <Txt fontFamily={fonts.AS} size={12} color={theme.black}>
                            {t('Withdraw')}
                        </Txt>
                        <Btn onPress={() => setShow(false)}>
                            <Icon
                                source={require('@images/future/close.png')}
                                size={10}
                            />
                        </Btn>
                    </Box>

                    {data.map((item) =>
                        <Btn
                            onPress={item.onPress}
                            key={item.title}
                            row
                            marginBottom={20}
                            alignCenter={false}
                            justifyCenter={false}
                        >
                            <Box
                                backgroundColor={theme.gray3}
                                alignSelf={'flex-start'}
                                padding={7}
                                alignCenter
                                justifyCenter
                                marginRight={10}
                                radius={50}
                            >
                                <Icon
                                    source={item.icon}
                                    size={17}
                                />
                            </Box>

                            <Box>
                                <Txt fontFamily={fonts.AS} size={13} color={theme.black}>
                                    {t(item.title)}
                                </Txt>
                                <Txt size={10} color={colors.grayBlue2} fontFamily={fonts.RM}>
                                    {t(item.note)}
                                </Txt>
                            </Box>
                        </Btn>
                    )}
                </Box>
            </Box>
        </Modality>
    )
}