import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import React from 'react'
import { useTranslation } from 'react-i18next'

const RecommendFollow = () => {
    const { t } = useTranslation()
    return (
        <Box
            row
            radius={5}
            alignCenter
            padding={10}
            marginVertical={10}
            justifySpaceBetween
            backgroundColor={'#fcf5d8'}
        >
            <Box row alignCenter>
                <Icon
                    size={15}
                    marginRight={10}
                    tintColor={'#eeb80d'}
                    source={require('@images/trade/star.png')}
                />
                <Txt size={11} color={'#eeb80d'}>
                    {`${t('New tracking suggestions')} >`}
                </Txt>
            </Box>
            <Icon
                size={10}
                source={require('@images/future/close.png')}
            />
        </Box>
    )
}

export default RecommendFollow