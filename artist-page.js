//element Definitions Start----------------------------------------------------
let trackDisplayArray = [];
let albumDisplayArray = [];
let songList = [];
let currentSongIndex = 0;
let songDataArr = [];
let likedArr = [];
let isRepeating = false;
let repeatedSong = {};

const sideRecs = document.querySelectorAll(".sideRec");
const playerButtons   = document.querySelector(".playerButtons");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const nextTrackBtn = document.querySelector(".nextTrackBtn");
const backTrackBtn = document.querySelector(".backTrackBtn");
const repeatBtn  = document.querySelector(".repeatBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const progressBarBack = document.querySelector(".progressBarBack");
const progressBarFront = document.querySelector(".progressBarFront");
const playerTimes = document.querySelector(".playerTimes");
const playerArt = document.querySelector(".playerArt");
const elapsedTime = document.querySelector(".elapsedTime");
const remainingTime = document.querySelector(".remainingTime");
const volumeContainer = document.querySelector(".volumeContainer");
const volumeBarFront = document.querySelector(".volumeBarFront");
const faVolumeOff = document.querySelector(".fa-volume-off");
const searchField  = document.querySelector(".searchField");
const searchFieldContainer = document.querySelector(".searchFieldContainer");
const smallSuggestionContainer = document.querySelector(".small-suggestion-container");         
const smallCardsArea = document.querySelector(".smallCardsArea");         
const searchBtn = document.querySelector(".searchBtn");
const header01 = document.querySelectorAll(".section-header")[0];
const header02 = document.querySelectorAll(".section-header")[1];
const header03 = document.querySelectorAll(".section-header")[2];
const userDataContainer = document.querySelector(".userDataContainer");
const userName2 = document.querySelector(".userDataContainer .userName2");
const albumInfoTitle = document.querySelector(".albumInfoTitle");
const albumInfoArtist = document.querySelector(".albumInfoArtist");
const likeBtn = document.querySelector(".likeBtn");
const likeBtnF = document.querySelector(".likeBtnF");
const artistPlayBtn = document.querySelector(".pause-button.d-flex.align-items-center.justify-content-center");
//element Definitions End----------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a5e347aa3emsh83ddf0a8da0766ep13759cjsn26ffa1895f30',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

const fetchsong = (songsurl) => {
    fetch(`${songsurl}`,options)
    .then(response => response.json())
    .then(songs => {

        //console.log(songs.data)
        let popularsong = document.getElementById("popularsongs")

           for (let i = 0; i < songs.data.length; i++) {
            const track = songs.data[i];
            let newRand = Math.floor(Math.random()*100);
            newRand = newRand.toString();
            console.log(newRand)
            //for music player
            songList.push(new Audio(songs.data[i].preview));
            songDataArr.push(songs.data[i]);
           
            //console.log(track)
            popularsong.innerHTML += `
           <div class="row justify-content-between mt-3 artistPageSong" >
           <div>
            <span class="ml-5 text-white">${i+1}</span>
            <img height="40px" width="40px" class="ml-3" src="${track.album.cover_medium}" alt="">
            <span class="ml-3"><strong>${track.title_short}</strong></span>
            </div>
            <div>
            <span class="mr-5">monthly listeners:${" " + newRand + ",000"}</span>
            <span>${convertToMin(track.duration)} min</span>
            </div>
            </div>
            `
           }
    }).then(()=>{
        const artistSongs = document.querySelectorAll(".artistPageSong");
        for (song of artistSongs){
            song.addEventListener("click", switchToTrack);
        }
    })
}



const convertToMin = (num) => {
    const getMinuts = Math.floor(num / 60)  
    const getSeconeds = num % 60
    return getMinuts + ":" + getSeconeds 
 }

const getAlbum = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${urlParams.get('artist-id')}`, options)
    .then(response => response.json())
    .then(artist => {
        let artistname = document.querySelector(".artist-name")
        artistname.innerHTML = artist.name
        //console.log(artist)
        //console.log(artistname)
        let songsurl = artist.tracklist

        let artistimg = document.getElementById('artist-picture')
        //console.log(artistimg)
        artistimg.style.backgroundImage = `url(${artist.picture_xl})`
       
       

       let fans = document.getElementById("fans-number")
       fans.innerHTML = `${artist.nb_fan} monthly listener`


        fetchsong(songsurl)

    })
    .catch(err => console.log(err))}
////Music Player Start--------------------------------------------------------------------------------------------------------------
const playerClick = ()=> {
    playBtn.classList.toggle("d-none");
    pauseBtn.classList.toggle("d-none");
    artistPlayBtn.querySelector(".bi-pause-fill").classList.toggle("d-none");
    artistPlayBtn.querySelector(".bi-play-fill").classList.toggle("d-none");
    if(!playBtn.classList.contains("d-none")){
        pauseSong();
        //console.log('pause');
    }else{
        //console.log('play');        
        playMusic();
    }
}
const addSong = (data) =>{    
    console.log(data.preview);
    songList[currentSongIndex].pause()
    currentSongIndex=songList.length-1;           
    //for(element of data.data){
        const newSong = new Audio(data.preview); 
        songList.push(newSong);
    //}
    if(pauseBtn.classList.contains("d-none")){
    playBtn.classList.toggle("d-none");
    pauseBtn.classList.toggle("d-none");
    artistPlayBtn.querySelector(".bi-pause-fill").classList.toggle("d-none");
    artistPlayBtn.querySelector(".bi-play-fill").classList.toggle("d-none");
}
    addSongInfo(data);

    nextSong();
    changePlayerInfo();
}
const addSongInfo = (data) =>{
    //console.log('addsonginfo input', data)
    songDataArr.push(data)
    //for(element of data.data){songDataArr.push(element)};
    //console.log('addsonginfo dataArr',songDataArr);
}
const switchToTrack = (e) =>{
    if(isRepeating){repeatClick();
        repeatedSong.pause();
        repeatedSong.currentTime = 0;
    }
        songList[currentSongIndex].pause();
        songList[currentSongIndex].currentTime = 0;
        if(e.target.classList.contains("artistPageSong")){
        currentSongIndex = Number(e.target.querySelector(".ml-5.text-white").innerText)-1;
    }else{currentSongIndex = Number(e.target.closest(".artistPageSong").querySelector(".ml-5.text-white").innerText)-1;}
    if(pauseBtn.classList.contains("d-none")){
        playerClick();}else{
        playMusic();};
}
const nextSong = () =>{
    if(isRepeating){repeatClick();
        repeatedSong.pause();
        repeatedSong.currentTime = 0;
    }else{
    songList[currentSongIndex].pause();
    songList[currentSongIndex].currentTime = 0;
    currentSongIndex++;
    if(currentSongIndex > songList.length-1){currentSongIndex = 0;}
}
    playMusic()
    if(pauseBtn.classList.contains("d-none")){
        playBtn.classList.toggle("d-none");
        pauseBtn.classList.toggle("d-none");}
}
const prevSong = () =>{
    if(isRepeating){repeatClick();
        repeatedSong.pause();
        repeatedSong.currentTime = 0;
    }else{
    songList[currentSongIndex].pause();
    songList[currentSongIndex].currentTime = 0;
    currentSongIndex--;
    if(currentSongIndex < 0){currentSongIndex = songList.length-1}
    }
    playMusic()
    if(pauseBtn.classList.contains("d-none")){
        playBtn.classList.toggle("d-none");
        pauseBtn.classList.toggle("d-none");
        artistPlayBtn.querySelector(".bi-pause-fill").classList.toggle("d-none");
    artistPlayBtn.querySelector(".bi-play-fill").classList.toggle("d-none");
    }
}
const pauseSong = () =>{
    songList[currentSongIndex].pause()
}
const like = () =>{
    likeBtn.classList.toggle("d-none");
    likeBtnF.classList.toggle("d-none");
    //console.log("song data array",songDataArr[currentSongIndex])
    //console.log("liked array prepush",likedArr)
    likedArr.push({...songDataArr[currentSongIndex]});
    //console.log("liked array post push",likedArr)
    localStorage.setItem("liked", JSON.stringify(likedArr)) 
    
}
const clearLikes = () =>{
    localStorage.setItem("liked", []);
}
const changeRepeatColor = () =>{
    repeatBtn.classList.toggle("buttonSelected");
}
const repeatClick = () =>{
    changeRepeatColor();
    if(isRepeating){isRepeating = false;}else{
        isRepeating = true;
        repeatedSong = songList[currentSongIndex]
    }
}
const playMusic = () => {
    if(isRepeating){
        repeatedSong.addEventListener('timeupdate', updateProgress);
        repeatedSong.addEventListener('timeupdate', durTime);
        repeatedSong.play();
        changePlayerInfo();
        
    }else{
        songList[currentSongIndex].addEventListener('timeupdate', updateProgress);
        songList[currentSongIndex].addEventListener('timeupdate', durTime);
        songList[currentSongIndex].play();
        changePlayerInfo();
        const artistSongs = document.querySelectorAll(".artistPageSong");
        for(song of artistSongs){song.style.color = "#ffffff";}
        artistSongs[currentSongIndex].style.color = "#1fdf64";
    }  
    volumeSet();
}
const changePlayerInfo = () =>{
    if(isRepeating){repeatClick();
        playerArt.setAttribute('src', songDataArr[currentSongIndex].album.cover);
        albumInfoTitle.innerText = songDataArr[currentSongIndex].album.title;
        albumInfoArtist.innerText = songDataArr[currentSongIndex].artist.name;
    }else{
    playerArt.setAttribute('src', songDataArr[currentSongIndex].album.cover);
    albumInfoTitle.innerText = songDataArr[currentSongIndex].album.title;
    albumInfoArtist.innerText = songDataArr[currentSongIndex].artist.name;
    }
}
const updateProgress = (e) => {   
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBarFront.style.width = `${progressPercent}%`;
    if(progressPercent === 100){
        if(isRepeating){
            repeatedSong.currentTime = 0;
            playMusic();
            repeatClick();
        }else{
            nextSong();
        }
    }      
}

const setProgress = (e) => {
    const widthF = progressBarFront.offsetWidth;
    const widthB = progressBarBack.offsetWidth;
    const clickX = e.offsetX;
    const percentage = (clickX/widthB);    
    const duration = songList[currentSongIndex].duration;  
    songList[currentSongIndex].currentTime = percentage * duration;
  }
  
  const volumeChange = (e) => {
    const widthB = volumeContainer.offsetWidth;
    const clickX = e.offsetX;
    const percentage = (clickX/widthB);    
    volumeBarFront.style.width = (percentage*100)+"%"; 
    songList[currentSongIndex].volume = percentage;
}
const volumeSet = ()=>{
    const widthF = volumeBarFront.offsetWidth;
    const widthB = volumeContainer.offsetWidth;
    const percentage = (widthF/widthB);    
    if(isRepeating){repeatedSong.volume = percentage}else{
        songList[currentSongIndex].volume = percentage;}
}


const durTime = (e) => {
	const {duration,currentTime} = e.srcElement;
	let sec;
	let sec_d;

	
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	elapsedTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
        } 
        
        
        get_sec_d (duration);
        
        // change duration DOM
        remainingTime.innerHTML = min_d +':'+ sec_d;
    }
////Music Player End----------------------------------------------------------------------------------------------------------------
 

const optionsB = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '71976e22femshc59a0991cc2347cp1afa84jsnf21821e7ac7a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const musicOnLoad = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=rick astley`, optionsB)
    .then(response => response.json())
    .then(response => initialMusic(response))
    .catch(err => console.error(err));  
}
const initialMusic = (data) => {
    //for(item of data.data){
        songList.push(new Audio(data.data[0].preview));
        songDataArr.push(data.data[0])
       // console.log(songDataArr,songList);
    //}
    changePlayerInfo();
}



/*
const loadInitialContent = () =>{        
   musicOnLoad();
   loadSmallTracks("busta");
   loadTracks("queen");
}
*/

const showUser2 = ()=>{
    userName2.innerText = JSON.parse(localStorage.activeUser); 
    
}



// const loadInitialContent = () =>{        
//     musicOnLoad();
//     loadSmallTracks("busta");
//     loadTracks("queen");
// }
// const showUser = ()=>{
//     userName.innerText = JSON.parse(localStorage.activeUser); 
// }

window.onload = () => {

    getAlbum();
    /////Music PlayerVVVVVVVVVVVVVVVVVVVV
    repeatBtn.addEventListener("click", repeatClick);
    playBtn.addEventListener("click", playerClick);
    pauseBtn.addEventListener("click", playerClick);
    searchBtn.addEventListener("click", showHideSearch);
    searchField.addEventListener("keypress", enterSearch);
    for(link of sideRecs){link.addEventListener("click", (e)=>{linkSearch(e)})}
    nextTrackBtn.addEventListener("click", nextSong);
    backTrackBtn.addEventListener("click", prevSong);
    progressBarBack.addEventListener("click", setProgress);
    likeBtn.addEventListener("click", like);
    likeBtnF.addEventListener("click", like);
    volumeContainer.addEventListener("click", volumeChange);
    likedArr = JSON.parse(localStorage.getItem("liked"));
    artistPlayBtn.addEventListener("click", playerClick);

    /////Music Player^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    showUser2();

}


////Search Function Start-----------------------------------------------------------------------------------------------------------
const showHideSearch = () =>{
    searchBtn.classList.toggle("d-none");
    searchBtn.classList.toggle("d-flex");
    searchFieldContainer.classList.toggle("d-none");
    searchFieldContainer.classList.toggle("d-flex");
    if(!searchField.classList.contains("d-none")){
        searchField.focus();
    } 
    
}
const changeHeader = (newText)=>{
    header02.innerText = newText;

}
const enterSearch = (e)=>{
    if(e.key === 'Enter'){
        
        showHideSearch()
        loadTracks(searchField.value)
        changeHeader("Search Results");
        header01.classList.add("d-none");   
        header03.classList.add("d-none");   
        smallCardsArea.classList.add("d-none");   
    }
    }
const linkSearch = (e)=>{
    changeHeader(e.target.innerText);
    loadTracks(e.target.innerText);
}
////Search Function End-----------------------------------------------------------------------------------------------------------


 
