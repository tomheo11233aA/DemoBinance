import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { IPortfolios } from './Portfolio'

interface Props {
    t: any;
    theme: any;
    portfolio: IPortfolios;
}

const ItemPortfolio = ({ portfolio, theme, t }: Props) => {
    return (
        <Box row alignCenter justifySpaceBetween marginBottom={20} height={40}>
            <Box row alignCenter width={'50%'}>
                <Icon
                    source={portfolio.icon}
                    size={18}
                    marginRight={15}
                    resizeMode={'contain'}
                />
                <Txt fontFamily={fonts.AS} color={colors.grayBlue} size={15} numberOfLines={1}>
                    {t(portfolio.title)}
                </Txt>
            </Box>

            <Box>
                {portfolio.active ?
                    <Btn>
                        <Txt color={colors.yellowBold} fontFamily={fonts.AS}>
                            {t('Activate')}
                        </Txt>
                    </Btn>
                    :
                    portfolio.comingsoon ?
                        <Box>
                            <Txt color={colors.green2} fontFamily={fonts.AS}>
                                {t('Coming Soon')}
                            </Txt>
                        </Box>
                        :
                        <Box alignEnd>
                            <Txt fontFamily={'Myfont24-Regular'} size={18} color={theme.black}>
                                {portfolio.value1}
                                <Txt fontFamily={fonts.RM} color={theme.black}>{' BTC'}</Txt>
                            </Txt>
                            {portfolio.value2 &&
                                <Txt fontFamily={'Myfont23-Regular'} color={colors.grayBlue} size={14}>
                                    {portfolio.value2}
                                    <Txt size={12} fontFamily={fonts.IBMPR} color={colors.grayBlue}>{' $'}</Txt>
                                </Txt>
                            }
                        </Box>
                }
            </Box>
        </Box>
    )
}

export default ItemPortfolio