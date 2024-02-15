import { ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import TrackPlayer, { Track, useProgress } from 'react-native-track-player'
import Slider from '@react-native-community/slider';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons'
import { darkTheme } from '../Theme/Theme';
import { ThemeContexts } from '../Contexts/ThemeContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPlayList, setUpPlayer } from '../Services/PlayBackService';
import { myMusicList } from '../Constants/myMusicList';

const MusicPlayer = ({ track }: { track: Track }) => {
    const theme = useTheme();
    const { colors } = useTheme();
    const { height, width } = Dimensions.get('window');
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [trackData, setTrack] = useState<Track>()
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>();
    const { setIsDarkTheme } = useContext(ThemeContexts);

    const songListener = useProgress();

    function onPlayPause() {
        setIsPlaying((prev) => {
            if (!prev) {
                TrackPlayer.play()
            } else {
                TrackPlayer.pause()
            }
            return !prev;
        });
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

    async function getTrackData() {
        const track = await TrackPlayer.getActiveTrack()
        setTrack(track);
    }

    async function onNextTack() {
        await TrackPlayer.skipToNext();
        await getTrackData();
    }

    async function onPreviousTrack() {
        try {
            await TrackPlayer.skipToPrevious();
            await getTrackData();
        } catch (error) {
            console.log("ERROR", error.message);

        }

    }

    function onChangeDuration(value: number) {
        TrackPlayer.seekTo(value);
    }
    async function setup() {
        let isSetUp = await setUpPlayer();
        if (isSetUp) {
            await addPlayList();
            await getTrackData();
        }
        setIsPlayerReady(isSetUp);
    }

    useEffect(() => {
        setup();
    }, [isPlayerReady])

    console.log("songListener.position ", songListener.position);

    const position = `${Math.floor(songListener.position / 60).toString().padStart(2, "0")}:${songListener.position == 0 ? "00" : songListener.position % 60 == 0 ? "" : `${Math.floor(Number(songListener.position % 60)).toString().padStart(2, "0")}`}`;
    const duration = `${Math.floor(songListener.duration / 60).toString().padStart(2, "0")}:${songListener.duration % 60 == 0 ? "" : `${Math.floor(Number(songListener.duration % 60)).toString().padStart(2, "0")}`}`;
    if (!isPlayerReady) {
        return (
            <SafeAreaView style={{ alignContent: 'center', flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator ></ActivityIndicator>
            </SafeAreaView>
        )
    } else {
        return (
            <View style={[styles.musicPlayer, { height: height, }]}>
                <View style={{ alignItems: 'center', }}>
                    <Appbar style={{ backgroundColor: colors.background }}>
                        <Appbar.Content title="Now Playing" style={{ alignItems: 'center', }} titleStyle={{ color: colors.secondary }}></Appbar.Content>
                        <TouchableOpacity style={{ padding: 8, marginHorizontal: 16 }} onPress={changeTheme}>
                            <Icon name='sun' color={theme.dark ? 'yellow' : 'black'} size={28}></Icon>
                        </TouchableOpacity>
                    </Appbar>

                    <View style={{ width: height / 3 }}>
                        <FlatList
                            horizontal={true}
                            pagingEnabled={true}
                            data={myMusicList}
                            scrollEnabled={false}
                            keyExtractor={(track) => track.id}
                            renderItem={
                                ({ item, index }) => {
                                    return (
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={{ uri: trackData.artwork }} height={height / 3} width={height / 3} style={styles.thumbnail} />
                                            <Text style={[styles.artistName, { color: colors.secondary }]}>{trackData?.artist}</Text>
                                            <Text style={[styles.musicTitle, { color: colors.secondary }]}>{trackData?.title}</Text>
                                        </View>
                                    )
                                }
                            }
                        />
                    </View>

                </View>
                <View style={styles.controlsStyle}>
                    <View style={[styles.sliderRow, { width: width, }]}>
                        <Text style={[styles.artistName, { color: colors.secondary }]}>{position}</Text>
                        <Slider
                            style={{
                                width: width - 120,
                                height: 40,
                                marginVertical: 8
                            }}
                            value={songListener.position}
                            minimumValue={0}
                            maximumValue={songListener.duration}
                            minimumTrackTintColor={colors.secondary}
                            maximumTrackTintColor="red"
                            thumbTintColor={colors.primary}
                            onValueChange={onChangeDuration}
                        />
                        <Text style={[styles.artistName, { color: colors.secondary }]}>{duration}</Text>
                    </View>
                    <View style={[styles.buttonRow, { width: width }]}>
                        <IconButton icon={'arrow-left'} onPress={onPreviousTrack}></IconButton>
                        <IconButton icon={isPlaying ? 'control-pause' : 'control-play'} onPress={onPlayPause}></IconButton>
                        <IconButton icon={'arrow-right'} onPress={onNextTack}></IconButton>
                    </View>
                </View>
            </View>
        )
    }
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