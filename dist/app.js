const comicImage = document.getElementById('comic-img');
const numberSelector = document.getElementById('number-selector');
const submitButton = document.getElementById('submit-button');
const comicTitle = document.getElementById('title');
const comicAlt = document.getElementById('alt');
const comicNum = document.getElementById('comic-number');
const comicPublish = document.getElementById('published');

function getComicData() {
    let apiUrl = "https://xkcd.com/info.0.json";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    if (numberSelector.value) {
        try {
            numberSelectorValue(numberSelector.value);
        } catch (err) {
            alert(err.msg);
        }
        apiUrl = `https://xkcd.com/${numberSelector.value}/info.0.json`;

    }


    fetch(`${proxyurl}${apiUrl}`)
        .then(response => response.json())
        .then(contents => {
            handleData(contents);
        })
        .catch((contents) => console.log("Can’t access " + apiUrl + " response. Blocked by browser?"));
};

function handleData(data) {
    let comicData = data;
    console.log(comicData.img);
    comicImage.src = comicData.img;

    comicTitle.innerHTML = comicData.title;
    console.log(comicData.title);
    comicAlt.innerHTML = comicData.alt;
    console.log(comicData.alt);
    comicNum.innerHTML = comicData.num;
    console.log(comicData.num);
    console.log(comicData);
    //comicPublish.innerHTML = 'hello';
}

function numberSelectorValue(val) {
    if (val > 2192) {
        throw {
            name: "Too big",
            msg: "Sorry there is no more comics",
        }
    }
}


submitButton.addEventListener('click', () => getComicData());

getComicData();