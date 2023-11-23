import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Modality from '@reuse/Modality'
import { height, width } from '@util/responsive';
import { useTheme } from '@hooks/index';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { useTranslation } from 'react-i18next';

interface Props {
    show: boolean;
    setShow: Function;
}

const ModalExampleHX = ({ show, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const colorText = theme.bg == 'white' ? 'black' : colors.yellow

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Pressable onPress={() => setShow(false)}
            >
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={10}
                paddingBottom={50}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
            >
                <Box alignCenter marginBottom={10}>
                    <Txt color={colors.yellow} fontFamily={fonts.AS} size={16}>
                        HX {t('Unlock')}
                    </Txt>
                </Box>
                <Box>
                    <Box backgroundColor={theme.gray2} padding={10} radius={2}>
                        <Txt color={colorText} fontFamily={fonts.IBMPM}>
                            Size 1$/50 = 0.02HX
                        </Txt>
                    </Box>

                    <Box backgroundColor={theme.gray2} padding={10} radius={2} marginVertical={5}>
                        <Txt color={colorText} fontFamily={fonts.IBMPM}>
                            Size 10$/50 = 0.2HX
                        </Txt>
                    </Box>

                    <Box backgroundColor={theme.gray2} padding={10} radius={2}>
                        <Txt color={colorText} fontFamily={fonts.IBMPM}>
                            Size 100$/50 = 2HX
                        </Txt>
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalExampleHX