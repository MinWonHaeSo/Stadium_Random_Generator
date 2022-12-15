const axios = require("axios");
const phraseGen = require("korean-random-words");
const generator = new phraseGen({
  delimiter: " ",
  adjSuffix: "체육관",
});

const url = "http://localhost:8080";

async function addData() {
  setTimeout(() => {
    let lat = (Math.random() * (3858 - 3430) + 3430) / 100;
    let lnt = (Math.random() * (12955 - 12613) + 12613) / 100;
    let price = Math.random() * 10000 + 20000;

    console.log(lat, lnt);

    axios({
      method: "POST",
      url: `${url}/stadiums/register`,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inkya2RqOTcyM0BuYXZlci5jb20iLCJpYXQiOjE2NzA5MzQxNTksImV4cCI6MTY3MTUzODk1OX0.aQ4PmxIHOjk3muh26-1h-5lr9hHlUyzK3KL2Q-ChUag",
      },
      data: {
        name: generator.generatePhrase(),
        lat: lat,
        lnt: lnt,
        address: generator.generatePhrase(),
        phone: "010-1234-5678",
        detailAddress: "123-456",
        weekdayPricePerHalfHour: price,
        holidayPricePerHalfHour: price * (Math.random() + 1),
        openTime: "09:00:00",
        closeTime: "18:00:00",

        imgs: [
          {
            publicId: "sample_img_id",
            imgUrl: "https://www.dhsisul.org/facility_img/05_bfimg04.jpg",
          },
        ],
        tags: ["soccer", "bascketball", "badminton"],
        items: [
          {
            name: "라켓",
            price: price * Math.random(),
            cnt: Math.random() * 1 + 10,
          },
        ],
      },
    });
  }, 500);
}

async function main() {
  for (let i = 0; i < 100; i++) {
    // lat 34.30 ~ 38.58
    // lnt 126.13 ~ 129.55
    await addData();
  }
}

main();
