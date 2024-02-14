
import TrackPlayer, { Event } from 'react-native-track-player';

export const PlaybackService = async function() {
    await TrackPlayer.setupPlayer()
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

};