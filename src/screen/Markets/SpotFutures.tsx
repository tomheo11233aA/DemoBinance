import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, t }: any) =>
    <Box>
        <Box row alignCenter justifySpaceBetween>
            <Box row alignCenter>
                <Box
                    marginRight={10}
                    paddingHorizontal={15}
                    backgroundColor={theme.gray}
                    paddingVertical={5}
                >
                    <Txt fontFamily={fonts.IBMPM} size={12} color={theme.black}>
                        {t('Spot')}
                    </Txt>
                </Box>
                <Txt fontFamily={fonts.IBMPM} size={12} color={colors.grayBlue2}>
                    {t('Futures')}
                </Txt>
            </Box>
            <Icon
                source={require('@images/market/pen.png')}
                size={12}
            />
        </Box>

        <Box row alignCenter justifySpaceBetween marginTop={20}>
            <Box row alignCenter>
                <Box row alignCenter>
                    <Txt size={11} color={colors.gray5}>{`${t('Name')} / `}</Txt>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/future/updown.png')}
                    />
                </Box>
                <Box row alignCenter>
                    <Txt size={11} color={colors.gray5}>KL</Txt>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/future/updown.png')}
                    />
                </Box>
            </Box>

            <Box row alignCenter>
                <Box row alignCenter marginRight={20}>
                    <Txt size={11} color={colors.gray5}>{t('Last Price')}</Txt>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/future/updown.png')}
                    />
                </Box>

                <Box row alignCenter>
                    <Txt size={11} color={colors.gray5}>24h Chg%</Txt>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/future/updown.png')}
                    />
                </Box>
            </Box>
        </Box>
    </Box>