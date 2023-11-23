import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { applyLetterSpacing } from '@method/format'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'

interface Props {
    show: boolean;
    otpAuth: {
        link: string,
        secret: string,
        otpAuth: string;
    };
    setShowModalQR: Function;
    onOpenModalInputTurn2FA: Function;
}

const ModalQRCode = ({
    show,
    otpAuth,
    setShowModalQR,
    onOpenModalInputTurn2FA,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Modality
            show={show}
        >
            <Box
                absolute
                bottom={0}
                alignCenter
                padding={20}
                width={'100%'}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                backgroundColor={theme.bg}
            >
                <Txt size={15} bold marginBottom={20} color={theme.black}>
                    {t('Two-Factor Authentication (2FA)')}
                </Txt>
                <QRCode
                    size={200}
                    color={theme.black}
                    value={otpAuth.otpAuth}
                    backgroundColor={theme.bg}
                />
                <Txt bold color={theme.black} marginVertical={20} size={16} center>
                    {applyLetterSpacing(otpAuth.secret)}
                </Txt>
                <Txt marginBottom={20} center color={colors.grayBlue}>
                    {t('Scan this QR code in the authenticator app or manually enter the code above into the app')}
                </Txt>
                <Box row height={40} justifyEnd width={'100%'} marginBottom={20}>
                    <Btn
                        radius={5}
                        paddingHorizontal={25}
                        backgroundColor={theme.gray2}
                        onPress={() => setShowModalQR(false)}
                    >
                        <Txt color={theme.black}>{t('Cancel')}</Txt>
                    </Btn>
                    <Btn
                        radius={5}
                        marginLeft={10}
                        paddingHorizontal={25}
                        backgroundColor={colors.yellow}
                        onPress={() => onOpenModalInputTurn2FA()}
                    >
                        <Txt fontFamily={fonts.AS}>{t('Next')}</Txt>
                    </Btn>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalQRCode