import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Input from "@commom/Input";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { useState } from "react";

interface Props {
    t: any;
    theme: any;
    toAddress: string;
    setToAddress: Function;
}

export default ({ toAddress, setToAddress, theme, t }: Props) => {
    return (
        <Box>
            <Box row marginTop={25}>
                <Txt
                    color={colors.grayBlue2}
                    size={12}
                    marginBottom={7}
                    fontFamily={fonts.IBMPR}
                >
                    {`${t('Address')} / ${'Invoice'}`}
                </Txt>
                <Icon
                    source={require('@images/future/info.png')}
                    size={11}
                    marginLeft={5}
                    marginTop={1}
                    tintColor={'#bfc2ca'}
                />
            </Box>
            <Box
                backgroundColor={theme.gray2}
                row
                alignCenter
                height={40}
                radius={5}
                paddingHorizontal={10}
            >
                <Box flex={1}>
                    <Input
                        value={toAddress}
                        onChangeText={setToAddress}
                        hint={t('Long press to paste')}
                        paddingRight={10}
                        height={40}
                        font={fonts.IBMPM}
                        color={theme.black}
                    />
                </Box>
                <Icon
                    source={require('@images/wallet/profile-user.png')}
                    size={14}
                />
            </Box>
        </Box>
    )
}
