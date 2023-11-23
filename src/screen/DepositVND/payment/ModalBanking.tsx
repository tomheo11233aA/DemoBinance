import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { banksFundingSelector } from '@selector/fundingSelector'
import { setBankChoosed } from '@slice/fundingSlice'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Pressable } from 'react-native'
import { IBank } from 'src/model/fundingModel'

const ModalBanking = ({ show, setShow }: any) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const banks = useAppSelector(banksFundingSelector)

    return (
        <Modality
            show={show}
            animation={'slide'}
            setShow={() => setShow(false)}
        >
            <Pressable
                style={{
                    bottom: 0,
                    padding: 20,
                    width: '100%',
                    height: '50%',
                    position: 'absolute',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: theme.bg,
                }}
            >
                <Scroll showsVerticalScrollIndicator={false}>
                    {banks.map((bank: IBank) =>
                        <Btn
                            row
                            key={bank.id}
                            marginVertical={10}
                            justifyCenter={false}
                            onPress={() => {
                                setShow(false)
                                dispatch(setBankChoosed(bank))
                            }}
                        >
                            <Icon
                                size={40}
                                source={bank?.image}
                            />
                            <Txt
                                marginLeft={10}
                                color={theme.black}
                                fontFamily={fonts.AS}
                                size={16}
                            >
                                {bank?.name_banking}
                            </Txt>
                        </Btn>
                    )}
                </Scroll>
            </Pressable>
        </Modality>
    )
}

export default ModalBanking