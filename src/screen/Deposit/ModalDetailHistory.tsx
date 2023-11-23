import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import Clipboard from '@react-native-clipboard/clipboard'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

const ModalDetailHistory = ({ show, setShow, histoyDetail }: any) => {
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            setShow={setShow}
            animation={'slide'}
        >
            <Box
                width={'95%'}
                backgroundColor={colors.white}
                marginTop={-200}
            >
                <Box
                    row
                    alignCenter
                    padding={15}
                    justifySpaceBetween
                    borderBottomWidth={1}
                    borderColor={colors.gray2}
                >
                    <Txt size={15} bold>{t('Deposit information')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box paddingHorizontal={10}>
                    <View style={styles.container}>
                        <Txt>{t('Status')}</Txt>
                        <Box
                            alignCenter
                            justifyCenter
                            padding={3}
                            radius={5}
                            backgroundColor={colors.yellow}
                        >
                            <Txt color={colors.white}>{t('Success')}</Txt>
                        </Box>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Time')}</Txt>
                        <Txt>{t(histoyDetail?.created_at)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Network')}</Txt>
                        <Txt>{t(converNetwork(histoyDetail?.coin_key))}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount')}</Txt>
                        <Txt bold color={colors.greenCan}>+${t(histoyDetail?.amount)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>TxID</Txt>
                        <Box
                            row
                            alignCenter
                            width={'80%'}
                            paddingHorizontal={15}
                        >
                            <Txt right marginRight={10}>{histoyDetail?.address}</Txt>
                            <Btn onPress={() => Clipboard.setString(histoyDetail?.address)}>
                                <Img
                                    source={require('@images/profile/copy.png')}
                                    width={20}
                                    height={20}
                                />
                            </Btn>
                        </Box>
                    </View>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalDetailHistory

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})