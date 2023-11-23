// import Box from '@commom/Box';
// import Btn from '@commom/Btn';
// import Icon from '@commom/Icon';
// import { useAppDispatch } from '@hooks/index';
// import { setStep } from '@slice/kycSlice';
// import contants from '@util/contants';
// import { height, width } from '@util/responsive';
// import React, { useRef, useState } from 'react';
// import { ActivityIndicator, StyleSheet } from 'react-native';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import ShowSelfie from './ShowSelfie';

// export const HEIGHT_RECT = width * 52 / 100
// export const MARGIN_TOP = height * 20 / 100

// const BackIDCard = () => {
//     const dispatch = useAppDispatch()

//     const devices = useCameraDevices()
//     const device = devices.back
//     const [path, setPath] = useState<any>('')
//     const camera = useRef<any>(null)

//     const handleTakePicture = async () => {
//         const photo = await camera.current.takePhoto()
//         setPath(photo.path)

//         // ImageCropPicker.openPicker({
//         //     width: width,
//         //     height: height,
//         //     cropping: false,
//         //     multiple: false,
//         // }).then(image => {
//         //     setPath(image.path)
//         // }).catch(err => console.log(err))
//     }

//     if (device == null) return (
//         <Box flex={1} alignCenter justifyCenter>
//             <ActivityIndicator />
//         </Box>
//     )

//     return (
//         <>
//             {path === '' ?
//                 <Box flex={1}>
//                     <Camera
//                         ref={camera}
//                         style={StyleSheet.absoluteFill}
//                         device={device}
//                         isActive={true}
//                         photo={true}
//                     />
//                     <Box absolute width={width} height={height}>
//                         <Btn
//                             zIndex={1}
//                             onPress={() => dispatch(setStep(contants.DOCUMENT_VERIFICATION))}
//                         >
//                             <Icon
//                                 size={20}
//                                 margin={20}
//                                 tintColor={'white'}
//                                 alignSelf={'flex-end'}
//                                 source={require('@images/future/close.png')}
//                             />
//                         </Btn>
//                         <Box width={width} absolute bottom={120} alignCenter>
//                             <Btn
//                                 width={70}
//                                 radius={50}
//                                 height={70}
//                                 alignCenter
//                                 justifyCenter
//                                 backgroundColor={'white'}
//                                 onPress={handleTakePicture}
//                             >
//                                 <Box
//                                     width={55}
//                                     height={55}
//                                     radius={50}
//                                     backgroundColor={'#cfd7da'}
//                                 />
//                             </Btn>
//                         </Box>
//                     </Box>
//                 </Box> :
//                 <ShowSelfie
//                     path={path}
//                     setPath={setPath}
//                 />
//             }
//         </>
//     )
// }

// export default BackIDCard

import { View, Text } from 'react-native'
import React from 'react'

const Selfie = () => {
  return (
    <View>
      <Text>Selfie</Text>
    </View>
  )
}

export default Selfie