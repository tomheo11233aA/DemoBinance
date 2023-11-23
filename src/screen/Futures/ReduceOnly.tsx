import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import BoxLine from '@reuse/BoxLine'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import React from 'react'
import { ITriggerTPSL } from 'src/model/futuresModel'

interface Props {
    t: any;
    theme: any;
    triggerTPSL: ITriggerTPSL;
}

const ReduceOnly = ({
    t,
    theme,
    triggerTPSL,
}: Props) => {
    const tpsl = triggerTPSL.tpsl
    const dispatch = useAppDispatch()
    
    return (
        <Box>
            <Btn
                onPress={() => {
                    dispatch(futuresSlice.actions.setTriggerTPSL({
                        ...triggerTPSL,
                        tpsl: tpsl !== 'RO' ? 'RO' : '',
                    }))
                }}
                row
                alignEnd
                marginBottom={10}
                alignSelf={'flex-start'}
            >
                {tpsl === 'RO' ?
                    <Box
                        width={12}
                        height={12}
                        radius={50}
                        alignCenter
                        justifyCenter
                        marginRight={7}
                        borderColor={theme.gray6}
                        backgroundColor={colors.yellow}
                    >
                        <Txt size={10} color={colors.white}>✓</Txt>
                    </Box>
                    :
                    <Box
                        width={12}
                        height={12}
                        backgroundColor={theme.gray3}
                        radius={50}
                        borderWidth={1}
                        borderColor={theme.gray6}
                        marginRight={7}
                    />
                }

                <BoxLine title={t('Reduce Only')} />
            </Btn>
        </Box>
    )
}

export default ReduceOnly