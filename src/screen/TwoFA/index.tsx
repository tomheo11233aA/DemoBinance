import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import { profileUserSelector } from '@selector/userSelector'
import { checkUser2fa, generateOTPToken } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Profile } from 'src/model/userModel'
import ModalQRCode from './ModalQRCode'
import ModalInputTurn2FA from './ModalInputTurn2FA'

export const TURN_ON = 'Turn on'
export const TURN_OFF = 'Turn off'
const turns = [TURN_ON, TURN_OFF]

const TwoFA = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [turn2FA, setTurn2FA] = useState('')
  const [otpAuth, setOtpAuth] = useState({
    link: '',
    secret: '',
    otpAuth: '',
  })
  const [loading, setLoading] = useState(false)
  const [isShowModalQR, setShowModalQR] = useState(false)
  const [isShowModalInputTurn2FA, setShowModalInputTurn2FA] = useState(false)

  const profile: Profile = useAppSelector<any>(profileUserSelector)

  useEffect(() => {
    handleCheckuser2fa()
  }, [])

  const handleCheckuser2fa = async () => {
    setLoading(true)
    const res = await checkUser2fa(profile.email)
    if (!res.error) {
      const result = res.status ? TURN_ON : TURN_OFF
      setTurn2FA(result)
    }
    setLoading(false)
  }

  const handleCreateCode = async (turn: string) => {
    if (turn === TURN_ON) {
      const res = await generateOTPToken()
      if (res.status) {
        setOtpAuth(res.data)
        setShowModalQR(true)
      }
    } else {
      setShowModalInputTurn2FA(true)
    }
  }

  const handleOpenModalInputTurn2FA = () => {
    setShowModalQR(false)
    setShowModalInputTurn2FA(true)
  }

  return (
    <KeyBoardSafe paddingHorizontal={15}>
      {!loading ?
        <>
          <Back size={16} />
          <Txt
            size={18}
            marginTop={18}
            marginBottom={20}
            color={theme.black}
            fontFamily={fonts.AS}
          >
            {t('2FA')}
          </Txt>
          <Box>
            {turns.map(item =>
              <Item
                t={t}
                key={item}
                item={item}
                theme={theme}
                turn2FA={turn2FA}
                onCreateCode={handleCreateCode}
              />
            )}
          </Box>
        </> :
        <LoadingYellow />
      }
      <ModalQRCode
        otpAuth={otpAuth}
        show={isShowModalQR}
        setShowModalQR={setShowModalQR}
        onOpenModalInputTurn2FA={handleOpenModalInputTurn2FA}
      />
      <ModalInputTurn2FA
        turn2FA={turn2FA}
        show={isShowModalInputTurn2FA}
        setShow={setShowModalInputTurn2FA}
        handleCheckuser2fa={handleCheckuser2fa}
      />
    </KeyBoardSafe>
  )
}

interface IItem {
  t: any;
  theme: any;
  turn2FA: any;
  item: string;
  onCreateCode: Function;
}

const Item = ({
  t,
  item,
  theme,
  turn2FA,
  onCreateCode,
}: IItem) => {
  return (
    <Btn
      row
      marginVertical={20}
      justifySpaceBetween
      disabled={turn2FA === item}
      onPress={() => onCreateCode(item)}
    >
      <Txt size={12} fontFamily={fonts.SGM} color={theme.black}>
        {t(item)}
      </Txt>
      {turn2FA === item &&
        <Txt size={16} bold color={colors.yellow}>✓</Txt>
      }
    </Btn>
  )
}

export default TwoFA