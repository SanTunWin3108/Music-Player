const playListContainer = document.querySelector(".playListContainer");
const audioTag = document.querySelector(".audio");
const currentAndTotalTimeTag = document.querySelector(".currentAndTotalTime");
const progressBarTag = document.querySelector(".progressBar");
const currentProgressTag = document.querySelector(".currentProgress");

//Buttons
const previousBtn = document.querySelector(".previousBtn");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const nextBtn = document.querySelector(".nextBtn");

const tracks = [
    {trackId : "track 1.mp3", trackTitle : "Song - 1"},
    {trackId : "track 2.mp3", trackTitle : "Song - 2"},
    {trackId : "track 3.mp3", trackTitle : "Song - 3"},
    {trackId : "track 4.mp3", trackTitle : "Song - 4"},
    {trackId : "track 5.mp3", trackTitle : "Song - 5"}
];

let isPlaying = false;
let currentPlayingIndex = 0;
let trackItemArr = [];
for(let i = 0; i < tracks.length; i++) {
    const trackItem = document.createElement("div");
    trackItem.classList.add("track");
    const trackItemTitle = (i + 1) + ". " + tracks[i].trackTitle;
    trackItem.append(trackItemTitle);
    playListContainer.append(trackItem);
    trackItemArr.push(trackItem);

    trackItem.addEventListener("click", () => {
        for(let item of trackItemArr) {
            item.classList.remove("trackStyle");
        }
        trackItem.classList.add("trackStyle");
        currentPlayingIndex = i;
        playSong();
    })
}

//Play song function
const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
}

//Duration
let duration;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
});

//Current Time
audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    
    const currentAndTotalTimeText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.innerText = currentAndTotalTimeText;

    updateCurrentProgress(currentTime);
})

//Minute and Second text
const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    const minuteText = minutes < 10 ? "0" + minutes : minutes;
    const secondText = seconds < 10 ? "0" + seconds : seconds;
    
    return minuteText + ":" + secondText;
}

//Update Current Progress
const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (progressBarTag.offsetWidth / duration) * currentTime;
    currentProgressTag.style.width =  currentProgressWidth.toString() + "px";
}


//Update play and pause buttons
const updatePlayAndPauseButton = () => {
    if(isPlaying) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    }
    else {
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    }
}

//Buttons
//Play buttons
playBtn.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;

    createTrackStyle();

    if(currentTime === 0) {
        playSong();
    }

    else {
        audioTag.play();
        updatePlayAndPauseButton();
    }
});

//Pause button
pauseBtn.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
})

//Previous button
previousBtn.addEventListener("click", () => {
    if(currentPlayingIndex === 0) {
        return;
    }

    currentPlayingIndex -= 1;
    createTrackStyle();
    playSong();
})

//Next button
nextBtn.addEventListener("click", () => {

    if(currentPlayingIndex === tracks.length - 1) {
        return;
    }

    currentPlayingIndex += 1;
    createTrackStyle();
    playSong();
})

//Track style
const createTrackStyle = () => {
    for(let item of trackItemArr) {
        item.classList.remove("trackStyle");
    }

    trackItemArr[currentPlayingIndex].classList.add("trackStyle");
}
