// GET PLATFORM => IOS / ANDROID 
import { Platform } from 'react-native'

export const prefix = Platform.OS === "ios" ? "ios" : "md"