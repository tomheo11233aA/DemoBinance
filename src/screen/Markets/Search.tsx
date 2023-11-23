import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Input from "@commom/Input";
import { colors } from "@theme/colors";

export default ({theme}: any) =>
    <Box row paddingHorizontal={15} alignCenter>
        <Box
            backgroundColor={theme.gray2}
            height={30}
            flex={1}
            radius={20}
            justifyCenter
        >
            <Input
                height={40}
                paddingHorizontal={40}
                hint={'BTC'}
                style={{ fontSize: 12 }}
                color={colors.grayBlue}
            />
            <Box width={20} absolute left={10}>
                <Icon
                    source={require('@images/home/search.png')}
                    size={14}
                />
            </Box>
        </Box>
        <Icon
            source={require('@images/login/dots.png')}
            size={14}
            resizeMode={'contain'}
            marginLeft={10}
        />
    </Box>