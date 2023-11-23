import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import TextError from '@reuse/TextError'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'

interface Props {
    title: any;
    value: any;
    messError: any;
    error: boolean;
    onChangeText: Function;
}

const InputKYC = ({
    title,
    value,
    error,
    messError,
    onChangeText,
}: Props) => {
    const theme = useTheme()
    return (
        <Box marginBottom={10}>
            <Txt bold color={colors.grayBlue} fontFamily={fonts.SGM}>
                {title}
            </Txt>
            <Input
                height={40}
                value={value}
                marginTop={5}
                color={theme.black}
                paddingHorizontal={10}
                onChangeText={onChangeText}
                backgroundColor={theme.gray2}
            />
            {error &&
                <TextError text={messError} />
            }
        </Box>
    )
}

export default InputKYC