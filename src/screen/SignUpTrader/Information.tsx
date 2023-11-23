import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Information = ({ theme, t }: any) => {
    const data = [
        {
            title: "01 Share Copiers' Profits",
            content: 'Enjoy a profit share of up to 20%.',
            image: require('@images/home/card2.png'),
        },
        {
            title: '02 Monthly Salary & Fund Management Fees',
            content: 'Top traders enjoy monthly salaries in addition to asset management remuneration as incentives.',
            image: require('@images/home/pig.png'),
        },
        {
            title: '03 Exposure to Millions of Users',
            content: 'Get promoted as a new trader across all channels and in AMA sessions, as well as access to community resources.',
            image: require('@images/future/referral.png'),
        },
        {
            title: '04 Special Badge',
            content: 'Receive an identifier exclusive to traders.',
            image: require('@images/profile/hc.png'),
        },
    ]

    return (
        <Box paddingHorizontal={15} paddingVertical={35}>
            <Txt color={theme.black} size={17} fontFamily={fonts.AS}>
                {t('What are Traders')}
            </Txt>

            <Txt color={theme.black} marginTop={15} fontFamily={fonts.IBMPR} size={13}>
                {t('Binance Traders are professionals serving millions of investors in hundreds of regions worldwide by sharing their trades and allowing investors to copy them. Successful applicants will gain the following rights and benefits.')}
            </Txt>

            <Txt
                size={15}
                color={theme.black}
                marginVertical={25}
                fontFamily={fonts.AS}
            >
                {`* ${t('What You Can Get')}`}
            </Txt>

            {data.map((item) =>
                <Box
                    row
                    radius={5}
                    paddingVertical={15}
                    paddingHorizontal={10}
                    marginTop={7}
                    key={item.title}
                    backgroundColor={theme.gray2}
                >
                    <Icon
                        size={25}
                        marginTop={5}
                        source={item.image}
                        resizeMode={'contain'}
                    />
                    <Box marginLeft={10} flex={1}>
                        <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                            {t(item.title)}
                        </Txt>
                        <Txt
                            size={12}
                            marginTop={7}
                            color={colors.grayBlue}
                            fontFamily={fonts.IBMPR}
                        >
                            {t(item.content)}
                        </Txt>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Information