import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { kycUserSelector, profileUserSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import FormWithdraw from './FormWithdraw'
import { Profile } from 'src/model/userModel'
import { colors } from '@theme/colors'

const WithdrawConfirm = () => {
    const { t } = useTranslation()
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const kyc = useAppSelector(kycUserSelector)

    return (
        <View style={[{ marginTop: 10 }]}>
            {(profile.twofa === 0 || kyc !== contants.KYC_APPROVED) ? (
                <>
                    <Txt bold size={18}>{t('Withdraw')}</Txt>
                    <Box
                        backgroundColor={colors.lightYellow}
                        padding={10}
                        radius={5}
                        marginTop={20}
                        marginBottom={10}
                    >
                        <Txt color={colors.grayBlue}>
                            {t('Please update your identity information and turn on 2FA before being able to transfer. Contact your support for help.')}
                        </Txt>
                    </Box>
                </>

            ) : (
                <FormWithdraw t={t} />
            )}
        </View>
    )
}

export default WithdrawConfirm