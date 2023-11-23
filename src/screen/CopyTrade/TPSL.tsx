import Box from '@commom/Box'
import React, { useState } from 'react'
import Ratio from './Ratio'
import Txt from '@commom/Txt';
import Icon from '@commom/Icon';
import { fonts } from '@theme/fonts';
import Btn from '@commom/Btn';

interface Props {
    t: any;
    TP: any;
    SL: any;
    theme: any;
    setSL: any;
    setTP: any;
}

const TPSL = ({
    t,
    TP,
    SL,
    theme,
    setSL,
    setTP,
}: Props) => {
    const [isShowTPSL, setShowTPSL] = useState(false)

    return (
        <Box
            marginTop={20}
            borderTopWidth={1}
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Btn
                row
                justifySpaceBetween
                onPress={() => setShowTPSL(!isShowTPSL)}
            >
                <Txt color={theme.black} fontFamily={fonts.AS}>
                    TP/SL
                </Txt>
                <Box rotateZ={isShowTPSL ? '-90deg' : '90deg'}>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box>
            </Btn>
            {isShowTPSL &&
                <Box>
                    <Ratio
                        value={TP}
                        theme={theme}
                        title={t('TP Ratio')}
                        onChangeText={setTP}
                        percents={[5, 10, 25, 50, 100, 150]}
                        note={t('The TP will be triggered to close the position when the profit ratio exceeds the set value.')}
                    />
                    <Ratio
                        value={SL}
                        theme={theme}
                        title={t('SL Ratio')}
                        onChangeText={setSL}
                        percents={[20, 30, 40, 50, 60, 70]}
                        note={t('The SL will be triggered to close the position when the loss ratio exceeds the set value.')}
                    />
                </Box>
            }
        </Box>
    )
}

export default TPSL