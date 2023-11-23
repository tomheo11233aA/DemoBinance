import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import { height, width } from '@util/responsive';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Defs, Mask, Rect, Svg } from 'react-native-svg';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageEditor from '@react-native-community/image-editor';
import { useAppDispatch } from '@hooks/index';
import { setStep } from '@slice/kycSlice';
import contants from '@util/contants';
import ShowBackIDCard from './ShowBackIDCard';
import Frame from './Fame';

export const HEIGHT_RECT = width * 52 / 100
export const MARGIN_TOP = height * 20 / 100

const CircleMask = () => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          {/* <Circle r="30%" cx="50%" cy="35%" fill="black" /> */}
          <Rect
            height={HEIGHT_RECT}
            width="90%"
            fill="black"
            x={'5%'}
            y={MARGIN_TOP}
            rx={10}
          />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.5)"
        mask="url(#mask)"
        fill-opacity="0"
      />
    </Svg>
  );
};

const BackIDCard = () => {
  const dispatch = useAppDispatch()

  const devices = useCameraDevices()
  const device = devices.back
  const [path, setPath] = useState<any>('')
  const camera = useRef<any>(null)

  const handleTakePicture = async () => {
    const cropData = {
        offset: { x: width * 5 / 100, y: height * 60 / 100 },
        size: { width: width * 3, height: HEIGHT_RECT * 3 },
        // displaySize: { width: 1, height: 1 },
        // resizeMode: 'contain',
      };

    const photo = await camera.current.takePhoto()
    ImageEditor.cropImage(photo.path, cropData).then(url => {
      setPath(url)
    })

    // ImageCropPicker.openPicker({
    //   width: width,
    //   height: height,
    //   cropping: false,
    //   multiple: false,
    // }).then(image => {
    //   ImageEditor.cropImage(image.path, cropData).then(url => {
    //     setPath(url)
    //   })
    // }).catch(err => console.log(err))
  }

  if (device == null) return (
    <Box flex={1} alignCenter justifyCenter>
      <ActivityIndicator />
    </Box>
  )

  return (
    <>
      {path === '' ?
        <Box flex={1}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <CircleMask />
          <Box absolute width={width} height={height}>
            <Btn
              zIndex={1}
              onPress={() => dispatch(setStep(contants.DOCUMENT_VERIFICATION))}
            >
              <Icon
                size={20}
                margin={20}
                tintColor={'white'}
                alignSelf={'flex-end'}
                source={require('@images/future/close.png')}
              />
            </Btn>
            <Frame />
            <Box width={width} absolute bottom={120} alignCenter>
              <Btn
                width={70}
                radius={50}
                height={70}
                alignCenter
                justifyCenter
                backgroundColor={'white'}
                onPress={handleTakePicture}
              >
                <Box
                  width={55}
                  height={55}
                  radius={50}
                  backgroundColor={'#cfd7da'}
                />
              </Btn>
            </Box>
          </Box>
        </Box> :
        <ShowBackIDCard
          path={path}
          setPath={setPath}
        />
      }
    </>
  )
}

export default BackIDCard