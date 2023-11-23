import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { ImageSourcePropType } from 'react-native'
import { useSelector } from 'react-redux'

interface Props {
    title: any;
    value: string;
    messError: any;
    error: boolean;
    onPress: Function;
    image: ImageSourcePropType;
}

const InputModal = ({ 
    image,
    title, 
    value, 
    error, 
    onPress, 
    messError, 
}: Props) => {
    const theme = useTheme()
    return (
        <Box marginBottom={10} width={'100%'}>
            <Txt bold color={colors.grayBlue}>{title}</Txt>
            <Btn
                row
                height={40}
                marginTop={5}
                width={'100%'}
                onPress={onPress}
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Txt color={theme.black}>{value}</Txt>
                </Box>
                <Img
                    source={image}
                    width={20}
                    height={20}
                    opacity={0.5}
                    marginLeft={10}
                    tintColor={theme.black}
                />
            </Btn>

            {error &&
                <TextError text={messError} />
            }
        </Box>
    )
}

export default InputModal