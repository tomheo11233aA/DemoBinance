import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import Modality from '@reuse/Modality'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { THEME } from './ItemHistory'
import { colors } from '@theme/colors'

const ModalHistoryDetail = ({ show, setShow, history, t }: any) => {
    const status = history?.status === 1 ? THEME.SUCCESS : THEME.CANCEL 

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
                    <Txt size={15} bold>{t('Withdraw information')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box paddingHorizontal={10}>
                    <View style={styles.container}>
                        <Txt>{t('Network')}</Txt>
                        <Txt>{t(converNetwork(history?.network))}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount')}</Txt>
                        <Txt bold>${t(history?.amount)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Network Fee')}</Txt>
                        <Txt bold>${t(history?.feeWidthdraw)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount received')}</Txt>
                        <Txt bold>${t(history?.balanceWidthdraw)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>TxID</Txt>
                        <Txt right marginRight={10}>{history?.hash}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Time')}</Txt>
                        <Txt>{t(history?.created_at)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Status')}</Txt>
                        <Box
                            alignCenter
                            justifyCenter
                            padding={3}
                            radius={5}
                            backgroundColor={status.background}
                        >
                            <Txt color={status.color}>{t(status.text)}</Txt>
                        </Box>
                    </View>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalHistoryDetail

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})