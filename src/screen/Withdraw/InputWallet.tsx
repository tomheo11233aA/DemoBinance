import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'

const InputWallet = ({ 
    title, 
    value, 
    onChangeText, 
    error, 
    messError,
    editAble = true,
}: any) => {
    return (
        <Box marginBottom={10}>
            <Txt>{title}</Txt>
            <Input
                value={value}
                onChangeText={onChangeText}
                paddingHorizontal={10}
                height={40}
                marginTop={5}
                disabled={editAble}
                backgroundColor={editAble ? colors.gray3 : colors.gray2}
            />
            {error && <TextError text={messError} />}
        </Box>
    )
}

export default InputWallet