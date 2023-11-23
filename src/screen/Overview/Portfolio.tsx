import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { fonts } from '@theme/fonts'
import React from 'react'
import { ImageSourcePropType } from 'react-native/types'
import HideWallet from './HideWallet'
import ItemPortfolio from './ItemPortfolio'
import { useTheme } from '@hooks/index'

export interface IPortfolios {
    title: string;
    value1?: string;
    value2?: string;
    active?: boolean;
    comingsoon?: boolean;
    icon: ImageSourcePropType;
}

interface Props {
    t: any;
    BALANCE: number;
    COIN_PRICE: number;
}

const Portfolio = ({ COIN_PRICE, BALANCE, t }: Props) => {
    const theme = useTheme()

    const portfolios: IPortfolios[] = [
        {
            title: 'USDⓢ-M Futures',
            value1: `${numberCommasDot(COIN_PRICE.toFixed(8))}`,
            value2: `≈ ${numberCommasDot(BALANCE.toFixed(2))}`,
            icon: require('@images/wallet/page-dolar.png')
        },
        {
            title: 'Spot',
            value1: `0.00000000`,
            value2: `≈ 0.00000000`,
            icon: require('@images/wallet/two-coin.png')
        },
        {
            title: 'Funding',
            value1: `0.00000000`,
            value2: `≈ 0.00000000`,
            icon: require('@images/wallet/coin.png')
        },
        {
            title: 'COINⓢ-M Futures',
            value1: `0.00000000`,
            value2: `≈ 0.00000000`,
            icon: require('@images/wallet/page-coin.png')
        },
        {
            title: 'Cross Margin',
            value1: '0.00',
            icon: require('@images/wallet/develop.png')
        },
        {
            title: 'Isolated Margin',
            value1: '0.00',
            icon: require('@images/wallet/develop-coin.png')
        },
        {
            title: 'Earn',
            value1: '0.00',
            icon: require('@images/wallet/pig.png')
        },
        {
            title: 'Options',
            active: true,
            icon: require('@images/wallet/page-e.png')
        },
        {
            title: 'Rebalancing Bot',
            active: true,
            icon: require('@images/wallet/two-coin.png')
        },
        {
            title: 'Defi Wallet',
            active: true,
            icon: require('@images/wallet/vi.png')
        },
    ]

    return (
        <Box paddingHorizontal={20}>
            <Txt marginTop={15} fontFamily={fonts.AS} size={18} marginBottom={10} color={theme.black}>
                {t('Portfolio')}
            </Txt>
            <HideWallet t={t} />
            {portfolios.map((portfolio: IPortfolios, index: number) =>
                <ItemPortfolio
                    t={t}
                    key={index}
                    theme={theme}
                    portfolio={portfolio}
                />
            )}
        </Box>
    )
}

export default Portfolio