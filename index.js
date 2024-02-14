import { AppRegistry, useColorScheme } from 'react-native';
import App from './src/screens/App';
import { name as appName } from './app.json';
import { PlaybackService } from './src/Data/Services/PlayBackService'
import TrackPlayer from 'react-native-track-player';
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/Data/Theme/Theme'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useEffect, useState } from 'react';
import { ThemeContexts } from './src/Data/Contexts/ThemeContexts'
import AsyncStorage from '@react-native-async-storage/async-storage';


function Main() {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const colorScheme = useColorScheme()

    async function getTheme() {
        try {
            const isDark = await AsyncStorage.getItem('isDark');
            setIsDarkTheme(isDark === 'true' ? true : isDark === 'false' ? false : colorScheme == 'light' ? false : true)
            console.log("isDarkTheme", isDarkTheme);
        } catch (error) {
            log("ERROR", error.message)
        }
    }

    useEffect(() => {
        getTheme()
    }, [isDarkTheme])
    return (
        <PaperProvider
            settings={{
                icon: props => <SimpleLineIcons {...props} />,
            }}
            theme={theme}>
            <ThemeContexts.Provider value={{ setIsDarkTheme, isDarkTheme }}>
                <App></App>
            </ThemeContexts.Provider>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);

TrackPlayer.registerPlaybackService(() => PlaybackService);
