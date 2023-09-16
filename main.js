function initialize() {
    const audio = document.createElement("audio");
    audio.src = "./beepSound.mp3";

    const h2DisplayTime = document.querySelector("h2");
    const h3TimeEnded = document.querySelector('h3');
    let seconds;
    let interval;
    const hiddenContainer = document.querySelector(".container");
   
    const customBtn = document.getElementById("custom-time");
    customBtn.addEventListener("click", () => {
        if (hiddenContainer.style.display === "none") { // Showing the hidden div
            if (h2DisplayTime.textContent != "") { // The timer is standing in the way
                clearInterval(interval);
                h2DisplayTime.textContent = "";
                h2DisplayTime.style.boxShadow = "none";
                h3TimeEnded.textContent = "";
            }
            hiddenContainer.style.display = "block";
            customBtn.textContent = "Start";
       
        } else { // Starting the timer
            seconds = Number(document.querySelector('input[name="hours"]').value) * 3600 +  Number(document.querySelector('input[name="minutes"]').value) * 60 + Number(document.querySelector('input[name="seconds"]').value);
            if (seconds < 1 || seconds > 86400) {
                return alert("The custom timer must be between 1 second and 24 hours!");
            }
            customBtn.textContent = "Custom";
            document.querySelector("input").value = "";
            hiddenContainer.style.display = "none";
            clearInterval(interval); // Clearing in case there was another before that
            interval = setInterval(displayRemainingTime, 1000);
        }
    });
    
    const liElements = Array.from(document.getElementsByTagName("li"));
    liElements.forEach(li => {
        li.addEventListener("click", () => {
            seconds = Number(li.textContent) * 60;
            h3TimeEnded.textContent = "";
            hiddenContainer.style.display = "none";
            clearInterval(interval); // Clearing in case there was another before that
            interval = setInterval(displayRemainingTime, 1000);
        })
    });

    function displayRemainingTime() {
        if (seconds < 0) {
            clearInterval(interval);
            h3TimeEnded.textContent = "Time's up!";
            audio.play();
            return;
        }

        let currentSeconds = seconds;
        let currentHours = 0;
        while (currentSeconds >= 3600) {
            currentHours++;
            currentSeconds -= 3600;
        }
        let currentMinutes = 0;
        while (currentSeconds >= 60) {
            currentMinutes++;
            currentSeconds -= 60;
        }

        if ((currentHours != 0 && currentMinutes === 0 && currentSeconds === 0) || (currentHours === 0 && currentMinutes === 0 && (currentSeconds === 30 || currentSeconds === 10 || currentSeconds < 6))) {
            h2DisplayTime.style.color = "#990000";
            h2DisplayTime.style.boxShadow = "0px 2px 5px 6px rgba(153,0,0,1)";
        } else {
            h2DisplayTime.style.color = 'var(--white-color)';
            h2DisplayTime.style.boxShadow = "none";
        }

        if (currentHours > 0) {
            h2DisplayTime.innerText = `${`${currentHours}`.length === 2 ? currentHours : `0${currentHours}`}:${`${currentMinutes}`.length === 2 ? currentMinutes : `0${currentMinutes}`}:${`${currentSeconds}`.length === 2 ? currentSeconds : `0${currentSeconds}`}`
        } else {
            h2DisplayTime.innerText = `${`${currentMinutes}`.length === 2 ? currentMinutes : `0${currentMinutes}`}:${`${currentSeconds}`.length === 2 ? currentSeconds : `0${currentSeconds}`}`;
        }
        seconds--;
      }

    const changeTheme = document.querySelector("#change-theme");
    changeTheme.addEventListener("click", () => {
        if (getComputedStyle(document.querySelector("body")).backgroundImage.includes('url("https://wallpapers.com/images/featured/simple-clean-8g9017acqfddycrl.jpg")')) {
            document.querySelector("body").style.backgroundImage = 'url("https://i.pinimg.com/originals/99/90/56/999056cafa9423cf4166ee5be451611f.jpg")';
            document.documentElement.style.setProperty("--white-color", "#3e3e3e");
            document.documentElement.style.setProperty("--element-background-color", "#efc79f");
            document.documentElement.style.setProperty("--element-hover-background-color", "#f1cda9");
            document.documentElement.style.setProperty("--custom-time-button-hover", "#f2d2b2");
            document.documentElement.style.setProperty("--heading-color", "-webkit-linear-gradient(135deg, #008F7A, #C34A36)");
      
        } else {
            document.querySelector("body").style.backgroundImage = 'url("https://wallpapers.com/images/featured/simple-clean-8g9017acqfddycrl.jpg")';
            document.documentElement.style.setProperty("--white-color", "#f5f5f5");
            document.documentElement.style.setProperty("--element-background-color", "#55c6b1");
            document.documentElement.style.setProperty("--element-hover-background-color", "#449e8e");
            document.documentElement.style.setProperty("--custom-time-button-hover", "#2a7d6d");
            document.documentElement.style.setProperty("--heading-color", "-webkit-linear-gradient(135deg, rgb(225, 73, 13), rgb(13, 201, 0))");
        }
    });
    
}
