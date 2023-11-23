import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { colors } from '@theme/colors'
const HEIGH = 40

const AmountUSDT = ({ amount, setAmount, t, profile, checkForm }: any) => {
    return (
        <Box marginBottom={10} marginTop={10}>
            <Txt>{t('Amount of USDT')}</Txt>
            <Box
                row
                height={HEIGH}
                marginTop={5}
            >
                <Box
                    row
                    flex={1}
                    height={HEIGH}
                    backgroundColor={colors.gray3}
                >
                    <Box flex={1}>
                        <Input
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType={'number-pad'}
                            height={HEIGH}
                            paddingHorizontal={10}
                        />
                    </Box>

                    <Box
                        height={HEIGH}
                        alignCenter
                        justifyCenter
                        backgroundColor={colors.yellow}
                        width={50}
                    >
                        <Txt>USDT</Txt>
                    </Box>
                </Box>

                <Btn
                    onPress={() => setAmount(profile.balance.toFixed(0))}
                    height={HEIGH}
                    alignCenter
                    justifyCenter
                    width={60}
                    borderWidth={1}
                    borderColor={colors.yellow}
                    marginLeft={10}
                >
                    <Txt>{t('MAX')}</Txt>
                </Btn>
            </Box>
            {(checkForm && amount.trim() === '') && <TextError text={t('Amount is empty')} />}
        </Box>
    )
}

export default AmountUSDT