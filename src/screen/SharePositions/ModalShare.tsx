import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { goBack } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React from 'react'
import { Modal } from 'react-native'

interface Props {
    t: any;
    show: boolean;
    setShow: Function;
    onShare: Function;
}

const data = [
    {
        name: 'Facebook',
        icon: require('@images/future/facebook.png'),
        size: 25,
    },
    {
        name: 'Instagram',
        icon: require('@images/future/instagram.png'),
        size: 25,
    },
    {
        name: 'Icon',
        icon: require('@images/future/smile.png'),
        size: 25,
    },
    {
        name: 'Save',
        icon: require('@images/future/download.png'),
        size: 25,
    },
    {
        name: 'More',
        icon: require('@images/login/dots.png'),
        size: 25,
    },
]

const ModalShare = ({ show, setShow, onShare, t }: Props) => {
    return (
        <Modal
            animationType={'slide'}
            visible={show}
            transparent={true}
        >
            <Box
                backgroundColor={colors.white}
                width={width}
                absolute
                bottom={0}
                paddingBottom={40}
                paddingTop={15}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
            >
                <Box row justifySpaceAround>
                    {data.map((item, index) =>
                        <Btn
                            onPress={() => onShare(item.name)}
                            alignCenter
                            key={item.name}
                        >
                            <Box backgroundColor={colors.gray4} padding={10} radius={50}>
                                <Box
                                    backgroundColor={
                                        index !== 4 ? colors.white : colors.gray4
                                    }
                                    radius={50}
                                >
                                    <Icon
                                        source={item.icon}
                                        size={20}
                                        resizeMode={'contain'}
                                    />
                                </Box>
                            </Box>

                            <Txt size={11} color={colors.grayBlue} fontFamily={fonts.IBMPR}>
                                {t(item.name)}
                            </Txt>
                        </Btn>
                    )}
                </Box>

                <Box
                    height={7}
                    width={width}
                    backgroundColor={colors.gray4}
                    marginVertical={15}
                />

                <Btn
                    onPress={() => {
                        setShow(false)
                        goBack()
                    }}
                >
                    <Txt size={14} color={colors.grayBlue} fontFamily={fonts.RM}>
                        {t('Cancel')}
                    </Txt>
                </Btn>
            </Box>
        </Modal>
    )
}

export default ModalShare