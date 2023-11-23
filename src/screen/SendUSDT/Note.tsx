import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Input from "@commom/Input";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { useState } from "react";

export default ({ theme, t }: any) => {
    const [text, setText] = useState('')

    return (
        <Box>
            <Box row marginTop={35}>
                <Txt
                    color={colors.grayBlue2}
                    size={12}
                    marginBottom={7}
                    fontFamily={fonts.RM}
                >
                    {t('Note: (optional)')}
                </Txt>
            </Box>
            <Box
                row
                radius={5}
                alignCenter
                height={40}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Input
                        height={40}
                        value={text}
                        font={fonts.RM}
                        paddingRight={10}
                        color={theme.black}
                        onChangeText={setText}
                        keyboardType={'decimal-pad'}
                        hint={t('Add a note for the recipient')}
                    />
                </Box>
                <Box>
                    <Txt color={colors.grayBlue2} fontFamily={fonts.RM} size={13}>
                        {text.length}/50
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}
