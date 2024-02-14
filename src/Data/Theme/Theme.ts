import { DefaultTheme } from "react-native-paper";

   
export const darkTheme = {
    ...DefaultTheme,
    roundness: 2,
    dark:true,
    colors: {
      ...DefaultTheme.colors,
      background: "#000000",
      primary: "#211951",
      secondary: "#FAFAFA",
      
    },
  };
   
export const lightTheme = {
    ...DefaultTheme,
    roundness: 2,
    dark:false,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
      primary: "#211951",
      secondary: "#000000",
      
    },
  };