import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import BuyInto from './BuyInto'
import ItemHistory from './ItemHistory'
import SellInto from './SellInto'
import { useTheme } from '@hooks/index'

const History = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const historys = [
        { id: 0, name: 'Order Book' },
        { id: 1, name: 'Trades' },
        { id: 2, name: 'Trading Data' },
        { id: 3, name: 'Info' },
    ]

    return (
        <View>
            <View style={[styles.content, { borderColor: theme.line2 }]}>
                {historys.map(history =>
                    <ItemHistory
                        theme={theme}
                        key={history.id}
                        history={history}
                        t={t}
                    />
                )}
            </View>

            <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                <BuyInto />
                <SellInto />
            </View>
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 5,
        borderBottomWidth: 1,
    },
    line: {
        backgroundColor: colors.yellow,
        width: 30,
        height: 4,
        marginLeft: 45,
        marginTop: 5,
    }
})