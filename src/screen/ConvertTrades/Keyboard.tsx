import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    setShowModalPreview: Function;
    handleSetTextInput: (text: any) => void;
}

const Keyboard = ({
    handleSetTextInput,
    setShowModalPreview,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const keyboards = [
        { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' },
        { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' },
        { value: '9' },
        { value: '.', img: require('@images/trade/comma.png'), size: 10 },
        { value: '0' },
        { value: 'delete', img: require('@images/trade/delete.png'), size: 20 },
    ]

    return (
        <Box marginTop={20}>
            <Box wrap row justifyCenter>
                {keyboards.map((keyboard) =>
                    <Btn
                        height={45}
                        width={'33%'}
                        key={keyboard.value}
                        onPress={() => handleSetTextInput(keyboard)}
                    >
                        {keyboard?.img ?
                            <Icon
                                resizeMode='contain'
                                size={keyboard.size}
                                source={keyboard.img}
                                tintColor={theme.black}
                            /> :
                            <Txt color={theme.black} fontFamily={fonts.M31} size={25}>
                                {keyboard.value}
                            </Txt>
                        }
                    </Btn>
                )}
            </Box>

            <Box paddingHorizontal={15} marginTop={10}>
                <Btn
                    radius={5}
                    height={45}
                    backgroundColor={colors.yellow}
                    onPress={() => setShowModalPreview(true)}
                >
                    <Txt color={colors.black} fontFamily={fonts.SGM}>
                        {t('Preview Conversion')}
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default Keyboard