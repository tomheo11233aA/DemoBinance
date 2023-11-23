import { getProfileThunk, getProfileThunkUserID } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import { styles } from '@navigation/Container'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userSlice from '@slice/userSlice'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Hello = ({ navigation }: any) => {
    const { i18n } = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
        const timer = setTimeout(async () => {
            const lng = await AsyncStorage.getItem(contants.LANGUAGE) || 'en'
            i18n.changeLanguage(lng)

            // set theme color
            const theme = await AsyncStorage.getItem(contants.THEME) || 'light'
            dispatch(userSlice.actions.setTheme(theme))

            const token = await AsyncStorage.getItem(contants.TOKEN) || null
            console.log(token)
            if (token) {
                await dispatch(getProfileThunkUserID())
            }
            navigation.replace(screen.HOME)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const applyLetterSpacing = (string: string, count = 3) => {
        return string?.split('')?.join('\u200A'.repeat(count));
    }

    return (
        <Box flex={1} backgroundColor={'#11181e'} alignCenter justifyCenter>
            <Img
                source={require('@images/Logo.png')}
                width={100}
                height={100}
            />
            <Txt color={'#ecb800'} marginTop={20} size={30} bold>{applyLetterSpacing('BINANCE')}</Txt>
        </Box>
    )
}

export default Hello