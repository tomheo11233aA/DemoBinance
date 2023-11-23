import Box from "@commom/Box";
import Scroll from "@commom/Scroll";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, t }: any) => {
    const data = ['Favorites List', 'Spot', 'Futures', 'Feed', 'Data']

    return (
        <Scroll
            row
            alignStart
            horizontal
            marginTop={25}
            justifySpaceAround
            paddingHorizontal={15}
            showsHorizontalScrollIndicator={false}
        >
            {data.map((item: string) =>
                <Box key={item} alignCenter marginRight={10}>
                    <Txt
                        color={item === 'Favorites List' ? theme.black : colors.gray5}
                        fontFamily={fonts.AS}
                        size={14}
                    >
                        {t(item)}
                    </Txt>
                    {item === 'Favorites List' &&
                        <Box width={20} height={3} backgroundColor={colors.yellow} marginTop={5} />
                    }
                </Box>
            )}
        </Scroll>
    )
}