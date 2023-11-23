import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import ModalTypeNetwork from "./ModalTypeNetwork";
import { useState } from "react";
import contants from "@util/contants";

interface Props {
    t: any,
    coin: any,
    theme: any,
    netWork: string,
    setNetWork: Function,
}

export default ({
    t,
    coin,
    theme,
    netWork,
    setNetWork,
}: Props) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <Box>
            <Box row marginTop={25}>
                <Txt
                    size={12}
                    marginBottom={7}
                    fontFamily={fonts.IBMPR}
                    color={colors.grayBlue2}
                >
                    {t('Network')}
                </Txt>
                <Icon
                    size={11}
                    marginTop={1}
                    marginLeft={5}
                    tintColor={'#bfc2ca'}
                    source={require('@images/future/info.png')}
                />
            </Box>

            <Btn
                onPress={() => coin.currency != contants.HX && setShowModal(!showModal)}
                row
                radius={5}
                disabled={coin.currency == contants.HX}
                alignCenter
                height={40}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Txt fontFamily={fonts.SGM} color={theme.black}>{netWork}</Txt>
                </Box>
                <Box>
                    <Icon
                        size={11}
                        tintColor={'#8e909b'}
                        resizeMode={'contain'}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box>
            </Btn>
            <ModalTypeNetwork 
                show={showModal}
                setShow={setShowModal}
                setNetWork={setNetWork}
            />
        </Box>
    )
}

