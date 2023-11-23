import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Img from "@commom/Img"
import Input from "@commom/Input"
import Txt from "@commom/Txt"
import { useAppSelector } from "@hooks/index"
import { numberCommasDot } from "@method/format"
import BoxLine from "@reuse/BoxLine"
import { profileUserSelector } from "@selector/userSelector"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { Profile } from "src/model/userModel"

export default ({ theme, t }: any) => {
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    return (
        <Box>
            <Box
                row
                radius={5}
                alignCenter
                marginTop={20}
                justifySpaceBetween
                paddingVertical={12}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Btn row alignCenter justifySpaceBetween>
                        <Box row alignCenter>
                            <Txt color={colors.grayBlue} size={12}>{t('From')}</Txt>
                            <Icon
                                source={require('@images/future/usdt.png')}
                                size={17}
                                marginHorizontal={5}
                            />
                            <Txt fontFamily={fonts.RM} color={theme.black}>
                                USDT
                            </Txt>
                        </Box>
                        <Icon
                            source={require('@images/wallet/right_arrow.png')}
                            size={4}
                            tintColor={theme.black}
                        />
                    </Btn>

                    <Icon
                        source={require('@images/future/down_arrow.png')}
                        tintColor={'#bbbcbe'}
                        size={8}
                        resizeMode={'contain'}
                        marginVertical={5}
                    />

                    <Box row alignCenter justifySpaceBetween>
                        <Box row alignCenter>
                            <Txt color={colors.grayBlue} size={12} marginRight={16}>{t('To')}</Txt>
                            <Icon
                                source={require('@images/future/BUSD.png')}
                                size={17}
                                marginHorizontal={5}
                            />
                            <Txt fontFamily={fonts.RM} color={theme.black}>
                                USDT
                            </Txt>
                        </Box>

                        <Icon
                            size={4}
                            tintColor={theme.black}
                            source={require('@images/wallet/right_arrow.png')}
                        />
                    </Box>
                </Box>

                <Box rotateZ={'90deg'} marginLeft={15} marginRight={5}>
                    <Btn>
                        <Img
                            width={18}
                            height={16}
                            tintColor={'#f1b70f'}
                            resizeMode={'stretch'}
                            source={require('@images/future/convert.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Txt
                marginTop={25}
                color={colors.grayBlue2}
                size={12}
                marginBottom={7}
            >
                {t('Convert amount')}
            </Txt>
            <Box
                row
                radius={5}
                alignCenter
                height={40}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Input
                        fontSize={16}
                        hint={'0.00'}
                        font={fonts.M24}
                        paddingRight={10}
                        color={theme.black}
                        keyboardType={'decimal-pad'}
                    />
                </Box>
                <Box row alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.RM} size={15}>
                        {'USDT  '}
                    </Txt>
                    <Txt color={'#cb9d36'} fontFamily={fonts.RM} size={15}>
                        {t('MAX')}
                    </Txt>
                </Box>
            </Box>

            <Txt size={11} color={colors.grayBlue2} marginTop={5}>
                {t('Available')}:
                <Txt size={13} fontFamily={fonts.M23} color={colors.grayBlue2}>
                    {` ${numberCommasDot(profile.balance)} `}
                </Txt>
                <Txt size={11} color={colors.grayBlue2}>USDT</Txt>
            </Txt>

            <Box row alignCenter justifySpaceBetween marginTop={30}>
                <BoxLine
                    size={12}
                    size2={12}
                    color={colors.grayBlue2}
                    title={t('Real time rate')}
                />
                <Box row alignCenter>
                    <Txt color={theme.black}>--</Txt>
                    <Btn>
                        <Icon
                            source={require('@images/wallet/round_back.png')}
                            size={14}
                            resizeMode={'contain'}
                            marginLeft={10}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={8}>
                <Txt color={colors.grayBlue2} size={12}>{t('You will receive')}</Txt>
                <Box row alignCenter>
                    <Txt color={theme.black}>--</Txt>
                </Box>
            </Box>

            <Box padding={8} backgroundColor={theme.gray2} marginTop={20} radius={3}>
                <Txt size={10} fontFamily={fonts.IBMPR} color={'#7b7c84'}>
                    {t('Please note that the liquidation prices of your USDT positions may change if you are using cross margin mode.')}
                </Txt>
            </Box>
        </Box>
    )
}

