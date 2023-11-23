import Box from '@commom/Box';
import { useTheme } from '@hooks/index';
import Modality from '@reuse/Modality';
import { height, width } from '@util/responsive';
import React from 'react';
import { Pressable } from 'react-native';
import CloseModalFilter from './CloseModalFilter';
import Side from './Side';
import Status from './Status';
import Time from './Time';

interface Props {
    show: boolean;
    setShow: Function;
}

const RADIUS_CONTENT = 10

const ModalFilter = ({ show = true, setShow }: Props) => {
    const theme = useTheme()

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Pressable onPress={() => setShow(false)}>
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={10}
                paddingBottom={50}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
            >
                <CloseModalFilter setShow={setShow} />
                <Time />
                <Status />
                <Side />
            </Box>
        </Modality>
    )
}

export default ModalFilter