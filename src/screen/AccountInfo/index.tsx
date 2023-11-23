import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { profileUserSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Profile } from 'src/model/userModel'
import Avatar from './Avatar'
import Header from './Header'
import Item from './Item'

const AccountInfo = () => {
    const dispatch = useAppDispatch()
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const { t } = useTranslation()

    const handleLogout = async () => {
        await AsyncStorage.removeItem(contants.TOKEN)
        dispatch(userSlice.actions.signOut())
        navigate(screen.LOGIN)
    }

    return (
        <Box flex={1}>
            <KeyBoardSafe>
                <Box paddingHorizontal={20}>
                    <Header />
                    <Avatar {...{ profile }} />

                    <Item
                        title2={t('Unverified')}
                        title={t('Verifications')}
                        icon={require('@images/profile/lock2.png')}
                    />
                    <Item
                        title={t('Regular')}
                        color={colors.yellowBold}
                        icon={require('@images/profile/diamond.png')}
                        title2={t('Use BNB to get discount')}
                    />
                    <Item
                        title={'UID'}
                        sizeIcon2={18}
                        title2={`39328749${profile.id}`}
                        icon={require('@images/profile/user.png')}
                        icon2={require('@images/wallet/copy.png')}
                    />
                    <Item
                        sizeIcon2={23}
                        title2={profile.email}
                        title={t('Registration Info')}
                        icon={require('@images/profile/user2.png')}
                        icon2={require('@images/wallet/eye-open.png')}
                    />
                </Box>
            </KeyBoardSafe>

            <Box
                paddingHorizontal={15}
                backgroundColor={colors.white}
            >
                <Btn
                    radius={5}
                    height={45}
                    marginBottom={10}
                    onPress={handleLogout}
                    backgroundColor={colors.gray3}
                >
                    <Txt fontFamily={fonts.SGM} size={20}>Logout</Txt>
                </Btn>
            </Box>
        </Box>

    )
}

export default AccountInfo