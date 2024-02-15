
import TrackPlayer, { Event } from 'react-native-track-player';
import { myMusicList } from '../Constants/myMusicList';

export const PlaybackService = async function () {

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

};

export const setUpPlayer = async () => {
    let setUp = false;
    try {
        await TrackPlayer.getActiveTrack();
        console.log("Player Is Set");
        setUp = true;
    } catch(error) {
        await TrackPlayer.setupPlayer()
        console.log("ERROR ",error.message);
        setUp = true;
    } finally {
        return setUp;
    }
}

export const addPlayList = async () => {
    TrackPlayer.add(myMusicList);
}

