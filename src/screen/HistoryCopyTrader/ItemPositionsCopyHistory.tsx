import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { capitalizeFirst, converPostirionsClose, numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Profile } from 'src/model/userModel'

interface Props {
    t: any;
    item: any;
    theme: any;
    profile: Profile;
}

const ItemPositionsCopyHistory = ({
    t,
    item,
    theme,
    profile,
}: Props) => {
    const color = item?.side === 'Buy' ? colors.green2 : colors.red3

    item = converPostirionsClose(item, profile.balance)

    return (
        <Box
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
            alignCenter={false}
        >
            <Box row justifySpaceBetween>
                <Box row alignCenter>
                    <Box
                        radius={2}
                        width={15}
                        height={15}
                        alignCenter
                        justifyCenter
                        marginRight={10}
                        backgroundColor={color}
                    >
                        <Txt color={colors.white} size={10} fontFamily={fonts.SGM}>
                            {capitalizeFirst(item?.side?.charAt(0))}
                        </Txt>
                    </Box>
                    <Txt size={13} fontFamily={fonts.IBMPM} color={theme.black}>
                        {`${item?.symbol} ${t('Perpetual')}`}
                    </Txt>
                </Box>

                <Btn>
                    <Icon
                        size={13}
                        source={require('@images/future/share.png')}
                    />
                </Btn>
            </Box>

            <Icon   
                size={12}
                marginTop={10}
                tintColor={colors.grayBlue}
                source={require('@images/wallet/copy.png')}
            />

            <Box
                row
                alignCenter
                marginTop={2}
                justifySpaceBetween
            >
                <Txt color={color} fontFamily={fonts.IBMPM} size={11}>
                    {`${capitalizeFirst(item?.regime)} / ${t(item?.side)}`}
                </Txt>

                <Box row alignCenter marginTop={10}>
                    <Box width={7} height={7} backgroundColor={colors.red3} radius={50} marginRight={5} />
                    <Txt style={styles.textGray}>
                        {t('Closed')}
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={10}>
                <Box>
                    <Txt style={styles.textGray}>
                        PNL {t('close')}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={3}
                        fontFamily={fonts.M24}
                        color={item?.PNL >= 0 ? colors.green2 : colors.red3}
                    >
                        {numberCommasDot(item?.PNL?.toFixed(2))}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt style={styles.textGray}>
                        {t('Closing volume')}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={3}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        --
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={10}>
                <Box>
                    <Txt style={styles.textGray}>
                        {t('Entry price')}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        {numberCommasDot(item?.entryPrice.toFixed(item?.ROUND))}
                    </Txt>
                </Box>

                <Box>
                    <Txt style={styles.textGray}>
                        {t('Close price')}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        {numberCommasDot(item?.closePrice.toFixed(item?.ROUND))}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt style={styles.textGray}>
                        {t('Maximum volume')}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        --
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={10}>
                <Txt style={styles.textGray}>
                    {t('Opend')}
                </Txt>
                <Txt style={styles.textM24}>
                    {item?.created_at}
                </Txt>
            </Box>

            <Box row justifySpaceBetween marginTop={5}>
                <Txt style={styles.textGray}>
                    {t('Closed')}
                </Txt>
                <Txt style={styles.textM24}>
                    {item?.updated_at}
                </Txt>
            </Box>
        </Box>
    )
}

export default ItemPositionsCopyHistory

const styles = StyleSheet.create({
    textGray: {
        fontSize: 11,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    },
    textM24: {
        fontSize: 11,
        color: colors.grayBlue,
        fontFamily: fonts.M24,
    }
})