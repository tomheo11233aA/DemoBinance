import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import { profileUserSelector } from '@selector/userSelector'
import { getHistoryOpenOrder } from '@service/futureService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Profile } from 'src/model/userModel'

const OpenOrders = () => {
    const [data, setData] = useState<any>([])
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        HandleGetHistoryOpenOrder()
    }, [])

    const HandleGetHistoryOpenOrder = async () => {
        const res = await getHistoryOpenOrder({
            limit: 10,
            page: 1,
        })
        if (res.status) {
            setData(res.data.array)
        }
    }

    return (
        <>
            {data.length === 0 &&
                <NotPosition />
            }
            {data.map((item: any) =>
                <Box
                    marginTop={10}
                    borderTopWidth={1}
                    paddingTop={10}
                    borderColor={colors.gray3}
                >
                    <Box row justifySpaceBetween alignCenter>
                        <Txt size={18} fontFamily={fonts.AS}>{data.symbol} perpetual</Txt>
                        <Txt fontFamily={fonts.OL} color={colors.grayBlue} size={18}>
                            x{data.core}
                        </Txt>
                    </Box>
                    <Txt
                        fontFamily={fonts.AS}
                        color={data.side === 'buy' ? colors.green2 : colors.red2}
                        size={16}
                    >
                        Limit / {data.side}
                    </Txt>
                    <Box paddingLeft={20} marginTop={10} row>
                        <CircularProgress
                            radius={20}
                            valueSuffix='%'
                            activeStrokeWidth={5}
                            inActiveStrokeWidth={5}
                            inActiveStrokeOpacity={0.2}
                            inActiveStrokeColor={colors.gray5}
                            value={(data.amountCoin * 100 / profile.balance)}
                            activeStrokeColor={data.side === 'buy' ? colors.green2 : colors.red2}
                        />
                        <Box marginLeft={15}>
                            <Box row>
                                <Box width={70}>
                                    <Txt color={colors.gray5} fontFamily={fonts.AS}>Amount (USDT)</Txt>
                                </Box>
                                <Txt fontFamily={fonts.SGM}>{data.amountCoin?.toFixed(4)}
                                    <Txt color={colors.gray5}>
                                        {' / '} {profile.balance?.toFixed(2)}
                                    </Txt>
                                </Txt>
                            </Box>

                            <Box row>
                                <Box width={70}>
                                    <Txt color={colors.gray5} fontFamily={fonts.AS}>Price</Txt>
                                </Box>
                                <Txt fontFamily={fonts.SGM}>{data.entryPrice?.toFixed(3)}</Txt>
                            </Box>
                        </Box>
                    </Box>
                    <Box alignEnd>
                        <Btn backgroundColor={colors.gray4} width={60} height={30} radius={3}>
                            <Txt fontFamily={fonts.SGM}>Cancel</Txt>
                        </Btn>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default OpenOrders