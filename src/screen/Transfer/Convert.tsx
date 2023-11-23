import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Img from "@commom/Img"
import Input from "@commom/Input"
import Txt from "@commom/Txt"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"

export default ({ theme, t }: any) => {
    return (
        <Box>
            <Box
                row
                radius={5}
                alignCenter
                marginTop={20}
                justifySpaceBetween
                paddingVertical={14}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1} row alignCenter>
                    <Box height={60} justifySpaceBetween alignCenter>
                        <Icon
                            source={require('@images/wallet/two-coin.png')}
                            size={12}
                            resizeMode={'contain'}
                            tintColor={'#8e97a0'}
                        />
                        <Icon
                            source={require('@images/future/down_arrow.png')}
                            tintColor={'#bbbcbe'}
                            size={9}
                            resizeMode={'contain'}
                        />
                        <Icon
                            source={require('@images/wallet/page-dolar.png')}
                            size={12}
                            resizeMode={'contain'}
                            tintColor={'#8e97a0'}
                        />
                    </Box>

                    <Box height={62} justifySpaceBetween marginHorizontal={10}>
                        <Txt color={colors.grayBlue} size={12}>{t('From')}</Txt>
                        <Txt color={colors.grayBlue} size={12}>{t('To')}</Txt>
                    </Box>

                    <Box height={62} justifySpaceBetween>
                        <Txt fontFamily={fonts.SGM} size={12} color={theme.black}>
                            Spot Wallet
                        </Txt>
                        <Txt fontFamily={fonts.SGM} size={12} color={theme.black}>
                            USDⓢ-M Futures
                        </Txt>
                    </Box>

                    <Box height={45} justifySpaceBetween marginLeft={5}>
                        <Icon
                            size={5}
                            resizeMode={'contain'}
                            tintColor={colors.gray7}
                            source={require('@images/wallet/right_arrow.png')}
                        />

                        <Icon
                            size={5}
                            resizeMode={'contain'}
                            tintColor={colors.gray7}
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

            <Btn
                row
                radius={3}
                height={40}
                alignCenter
                marginTop={25}
                justifySpaceBetween
                paddingHorizontal={20}
                backgroundColor={theme.gray2}
            >
                <Box row alignCenter>
                    <Icon
                        size={16}
                        marginRight={10}
                        source={require('@images/future/usdt.png')}
                    />
                    <Txt fontFamily={fonts.SGM} size={13} color={theme.black}>
                        USDT
                    </Txt>
                </Box>
                <Icon
                    size={10}
                    resizeMode={'contain'}
                    tintColor={colors.gray7}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Btn>

            <Txt
                size={12}
                marginTop={25}
                marginBottom={7}
                fontFamily={fonts.RM}
                color={colors.grayBlue2}
            >
                {t('Amount')}
            </Txt>
            <Box
                row
                radius={5}
                height={40}
                alignCenter
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Input
                        fontSize={16}
                        font={fonts.M24}
                        paddingRight={10}
                        color={theme.black}
                        hint={'Minimum 0.00000001'}
                        keyboardType={'decimal-pad'}
                    />
                </Box>
                <Box row alignCenter>
                    <Txt color={colors.grayBlue2} fontFamily={fonts.RM} size={15}>
                        {'USDT  '}
                    </Txt>
                    <Txt color={'#cb9d36'} fontFamily={fonts.RM} size={15}>
                        {t('MAX')}
                    </Txt>
                </Box>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={8}>
                <Box row alignCenter>
                    <Txt color={colors.grayBlue2} size={11}>
                        {`${t('Available')}:  `}
                    </Txt>
                    <Icon
                        size={12}
                        source={require('@images/future/info.png')}
                    />
                </Box>

                <Box row alignCenter>
                    <Txt fontFamily={fonts.M23} size={13} color={theme.black}>
                        0
                        <Txt size={10} color={theme.black}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={8}>
                <Txt color={colors.grayBlue2} size={11}>
                    {`${t('In Order')}:  `}
                </Txt>

                <Box row alignCenter>
                    <Txt fontFamily={fonts.M23} size={13} color={theme.black}>
                        0
                        <Txt size={10} color={theme.black}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}