import { getListCopyingTraderThunk } from '@asyncThunk/copyTradeAsyncThunk';
import { getProfileThunk } from '@asyncThunk/userAsyncThunk';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { useAppDispatch, useTheme } from '@hooks/index';
import LoadingBlack from '@reuse/LoadingBlack';
import Modality from '@reuse/Modality';
import { cancelCopyTrader } from '@service/copyTradeService';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { height, width } from '@util/responsive';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';

interface Props {
    show: boolean;
    idCancel: number;
    setShow: Function;
}

const ModalCancelCopyingTrader = ({ show, setShow, idCancel }: Props) => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const handleCancel = async () => {
        setLoading(true)
        const res = await cancelCopyTrader(idCancel)
        if (res.status) {
            dispatch(getListCopyingTraderThunk({ limit: 1000, page: 1 }))
            dispatch(getProfileThunk())
        } else {
            Alert.alert(t(res.message))
        }
        setLoading(false)
        setShow(false)
    }

    return (
        <Modality
            show={show}
            close={false}
        >
            <Pressable onPress={() => setShow(false)}>
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
                <Box alignCenter marginVertical={10}>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.IBMPM}
                    >
                        {t('Cancel copying trader')}
                    </Txt>
                </Box>

                <Txt fontFamily={fonts.IBMPR} size={12} color={colors.grayBlue}>
                    {t('Are you sure you want to cancel trader copying?')}
                </Txt>

                <Box row alignEnd justifyEnd marginTop={20}>
                    <Btn
                        onPress={() => setShow(false)}
                        height={30}
                        paddingHorizontal={20}
                        backgroundColor={theme.gray2}
                    >
                        <Txt color={theme.black} size={12} fontFamily={fonts.IBMPM}>
                            {t('No')}
                        </Txt>
                    </Btn>
                    <Btn
                        onPress={handleCancel}
                        height={30}
                        marginLeft={10}
                        disabled={loading}
                        paddingHorizontal={20}
                        backgroundColor={colors.yellow}
                    >
                        {loading ?
                            <LoadingBlack size={20} />
                            :
                            <Txt color={colors.black} size={12} fontFamily={fonts.IBMPM}>
                                {t('Yes')}
                            </Txt>
                        }
                    </Btn>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalCancelCopyingTrader