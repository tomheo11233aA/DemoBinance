import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt';
import { useAppSelector } from '@hooks/index';
import { topTabP2pSelector } from '@selector/p2pSelector';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Itab {
    title: string;
    value: string;
    width: string;
    icon: ImageSourcePropType;
}

const BACKGROUND = '#fbd336'
const TEXT_COLOR = '#929a8b'

const TabTop = () => {
    const { t } = useTranslation()
    const topTab = useAppSelector(topTabP2pSelector)

    const tabs: Itab[] = [
        {
            title: 'FAST TRANSACTION',
            value: 'fastTransaction',
            width: '37%',
            icon: require('@images/profile/user.png')
        },
        {
            title: 'P2P',
            value: 'p2p',
            width: '26%',
            icon: require('@images/future/referral.png')
        },
        {
            title: 'Block Trade',
            value: 'blockTrade',
            width: '37%',
            icon: require('@images/profile/diamond.png')
        },
    ]

    return (
        <Box row alignCenter marginTop={10}>
            <Box
                row
                flex={1}
                radius={5}
                borderWidth={1}
                borderColor={'#E9BE22'}
                backgroundColor={BACKGROUND}
            >
                {tabs.map((tab: Itab) =>
                    <Tab
                        t={t}
                        tab={tab}
                        key={tab.title}
                        topTab={topTab}
                    />
                )}
            </Box>
            <Icon
                size={12}
                marginLeft={15}
                tintColor={TEXT_COLOR}
                source={require('@images/p2p/menu.png')}
            />
        </Box>
    )
}

interface Props {
    t: any;
    tab: Itab;
    topTab: string;
}

const Tab = ({t, tab, topTab }: Props) => {
    return (
        <LinearGradient
            colors={[
                topTab === tab.value ? '#fae17d' : BACKGROUND,
                topTab === tab.value ? '#fbf0c0' : BACKGROUND,
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0, }}
            style={{
                borderRadius: 5,
                width: tab.width,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon
                size={12}
                source={tab.icon}
                resizeMode={'contain'}
                marginBottom={3}
                tintColor={tab.value !== 'p2p' && '#828e9a'}
            />
            <Txt
                size={9}
                numberOfLines={1}
                color={topTab === tab.value ? 'black' : TEXT_COLOR}
            >
                {t(tab.title)}
            </Txt>
        </LinearGradient>
    )
}

export default TabTop