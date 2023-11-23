import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import Item from './Item'
import { navigate } from '@navigation/navigationRef'
import { screen } from '@util/screens'
import { converLanguage } from '@method/format'
import { Profile } from 'src/model/userModel'
import { profileUserSelector } from '@selector/userSelector'

const General = ({ t, i18n }: any) => {
    const theme = useTheme()
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    return (
        <Box marginBottom={30}>
            <Box
                borderBottomWidth={1}
                borderColor={theme.line}
                paddingVertical={10}
            >
                <Txt
                    color={colors.grayBlue}
                    fontFamily={fonts.IBMPM}
                >
                    {t('General')}
                </Txt>
            </Box>
            <Item
                theme={theme}
                title={t('Language')}
                value={t(converLanguage(i18n.language))}
                onPress={() => navigate(screen.CHANGE_LANGUAGE)}
            />
            <Item
                theme={theme}
                title={'2FA'}
                value={t(profile.twofa === 1 ? 'Turn on' : 'Turn off')}
                onPress={() => navigate(screen.TWO_FA)}
            />
        </Box>
    )
}

export default General