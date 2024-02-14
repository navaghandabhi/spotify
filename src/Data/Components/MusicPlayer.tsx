import { Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Track } from 'react-native-track-player'
import Slider from '@react-native-community/slider';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons'
import { darkTheme } from '../Theme/Theme';
import { ThemeContexts } from '../Contexts/ThemeContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicPlayer = ({ track }: { track: Track }) => {
    const theme = useTheme();
    const { colors } = useTheme();
    const { height, width } = Dimensions.get('window');
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContexts);

    function onPlayPause() {
        setIsPlaying((prev) => !prev);
    }
    const changeTheme = async () => {
        try {
            setIsDarkTheme(async function (prev: boolean) {
                const isDarkThemeString = `${!prev}`;
                console.log(isDarkThemeString);
                await AsyncStorage.setItem('isDark', isDarkThemeString);
                return !prev;
            })
        } catch (error) {
            console.log("changeTheme ERROR", error.message);

        }
    }

    return (
        <View style={[styles.musicPlayer, { height: height, }]}>
            <View style={{ alignItems: 'center', }}>
                <Appbar style={{ backgroundColor: colors.background }}>
                    <Appbar.Content title="Now Playing" style={{ alignItems: 'center', }} titleStyle={{ color: colors.secondary }}></Appbar.Content>
                    <TouchableOpacity style={{ padding: 8, marginHorizontal: 16 }} onPress={changeTheme}>
                        <Icon name='sun' color={theme.dark ? 'yellow' : 'black'} size={28}></Icon>
                    </TouchableOpacity>
                </Appbar>
                <Image source={{ uri: track.artwork }} height={height / 3} width={height / 3} style={styles.thumbnail} />
                <Text style={[styles.artistName, { color: colors.secondary }]}>{track.artist}</Text>
                <Text style={[styles.musicTitle, { color: colors.secondary }]}>{track.title}</Text>
            </View>
            <View style={styles.controlsStyle}>
                <View style={[styles.sliderRow, { width: width, }]}>
                    <Text style={[styles.artistName, { color: colors.secondary }]}>00:00</Text>
                    <Slider
                        style={{ width: width - 120, height: 40, marginVertical: 8 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={colors.secondary}
                        maximumTrackTintColor="red"
                        thumbTintColor={colors.primary}
                    />
                    <Text style={[styles.artistName, { color: colors.secondary }]}>00:00</Text>
                </View>
                <View style={[styles.buttonRow, { width: width }]}>
                    <IconButton icon={'arrow-left'}></IconButton>
                    <IconButton icon={isPlaying ? 'control-pause' : 'control-play'} onPress={onPlayPause}></IconButton>
                    <IconButton icon={'arrow-right'}></IconButton>
                </View>
            </View>
        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    musicPlayer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumbnail: {
        marginTop: 16,
        borderRadius: 12,
    },
    controlsStyle: {
        marginBottom: 32,

    },
    sliderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    artistName: {
        marginVertical: 16,
        fontSize: 14
    },
    musicTitle: {
        marginVertical: 8,
        fontSize: 22,
    }
})