import Box from '@commom/Box'
import Img from '@commom/Img'
import { useAppSelector } from '@hooks/index'
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import { RouteProp, useRoute } from '@react-navigation/native'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, PermissionsAndroid, Platform, Share } from 'react-native'
import ViewShot from 'react-native-view-shot'
import { RootStackParamList } from 'src/model/commomModel'
import { Profile } from 'src/model/userModel'
import ModalShare from './ModalShare'
import PNLShare from './PNLShare'
import Perpetual from './Perpetual'
import Price from './Price'
import QRReferral from './QRReferral'

const SharePositions = () => {
  const { t } = useTranslation()

  const route = useRoute<RouteProp<RootStackParamList, 'Futures'>>();
  const profile: Profile = useAppSelector<any>(profileUserSelector)

  const { position } = route.params

  const [isShowModalShare, setShowModalShare] = useState<boolean>(true)

  const ref = useRef<any>();

  const handleShare = async (name: string) => {
    if (name === 'Save') {
      if (Platform.OS === 'ios') {
        handleCapture()
      } else {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            handleCapture()
          }
          else {
            Alert.alert(t('You are not allow permission'));
          }
        } catch (error: any) {
          Alert.alert(error)
        }
      }
    } else {
      handleCaptureShare()
    }
  }

  const handleCaptureShare = () => {
    try {
      ref.current.capture().then(async (uri: any) => {
        await Share.share({
          url: uri,
        })
      });

    } catch (error: any) {
      Alert.alert('error', error);
    }
  }

  const handleCapture = () => {
    try {
      ref.current.capture().then(async (uri: any) => {
        const photo: any = 'photo'
        // await Share.share({
        //   url: uri,
        // })
        const image = await CameraRoll.save(uri, photo);
        if (image) {
          Alert.alert(
            '',
            t('Image saved successfully.'),
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false },
          );
        }
      });

    } catch (error: any) {
      Alert.alert('error', error);
    }
  }

  return (
    <Box
      flex={1}
      alignCenter
      justifyCenter
      backgroundColor={colors.black}
    >
      <ViewShot
        ref={ref}
        options={{ fileName: "Your-File-Name", format: "jpg", quality: 1 }}
      >
        <Img
          source={require('@images/future/snapedit.jpg')}
          resizeMode={'contain'}
          width={width}
          height={width * 60 / 100}
        />
        <Box absolute padding={20} paddingLeft={40} width={'100%'}>
          <Perpetual {...{ position, t }} />
          <PNLShare {...{ position }} />
          <Price {...{ position, t }} />
          <QRReferral {...{ profile, t }} />
        </Box>
      </ViewShot>
      <ModalShare
        t={t}
        onShare={handleShare}
        show={isShowModalShare}
        setShow={setShowModalShare}
      />
    </Box>
  )
}

export default SharePositions