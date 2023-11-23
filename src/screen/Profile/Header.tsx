import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import { navigate } from "@navigation/navigationRef";
import Back from "@reuse/Back";
import { screen } from "@util/screens";

export default () =>
    <Box row alignCenter justifySpaceBetween marginTop={10}>
        <Back size={14} />
        <Box row alignCenter>
            <Icon
                source={require('@images/profile/cskh.png')}
                size={16}
                resizeMode={'contain'}
            />
            <Btn
                onPress={() => navigate(screen.SETTING)}
            >
                <Icon
                    source={require('@images/profile/settings.png')}
                    size={16}
                    marginLeft={15}
                    resizeMode={'contain'}
                />
            </Btn>
        </Box>
    </Box>