export const PLAY_PAUSE = "PLAY_PAUSE";
export const NEXT_BACK = "NEXT_BACK";
export const REPEAT = "REPEAT";
export const SONG_DATA = "SONG_DATA";
export const  FETCH_MUSIC = " FETCH_MUSIC";

export const setFetched =response=>({
    type: FETCH_MUSIC,
    payload: response
});