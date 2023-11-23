import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { Profile } from 'src/model/userModel'

interface Props {
    t: any;
    profile: Profile;
}

const QRReferral = ({ t, profile }: Props) => {
    return (
        <Box row marginTop={10} width={'100%'} alignCenter>
            <Box
                padding={3}
                alignCenter
                justifyCenter
                backgroundColor={'white'}
            >
                <QRCode
                    size={40}
                    color='black'
                    backgroundColor='white'
                    value={`${contants.HOSTING}/register?ref=${profile.referral}`}
                />
            </Box>

            <Box marginLeft={10} flex={1}>
                <Txt color={colors.gray5} size={9}>{t('Referral code')}</Txt>
                <Txt
                    color={colors.white}
                    fontFamily={fonts.M24}
                    size={23}
                    numberOfLines={10}
                    marginVertical={2}
                    marginTop={-3}
                >
                    {profile.referral}
                </Txt>
                <Txt color={colors.yellow} size={9}>
                    {t('Download the Binance App')}
                </Txt>
            </Box>
        </Box>
    )
}

export default QRReferral