// utils.js
export function getParams(name, url = window.location.href) {
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, "\\$&");

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
export var userId = getParams("userId") ? getParams("userId") : "";

Number(userId);
export function userPageVisitCapture(source, userId) {
  if (userId === "") {
    return false;
  }
  let isOptInUrl = "https://corvus.howzat.com/v2/source/capture";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var data = JSON.stringify({
    userId: userId,
    source: source,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch(isOptInUrl, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === true) {
        console.log("captured", source);
      } else {
        console.log("not captured");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function accordion_custom(el) {
  el.classList.toggle("active");
}
export let correct_count;

export const setCorrectCount = (userId) => {
  correct_count = `correct_count_${userId}`;
};

export const copyImg =
  "https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_march_24/zenrik_images/Image-610-17116294552361.png?v=1711629455";
export const copiedImg =
  "https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_march_24/zenrik_images/Image-610-17117105764729.png?v=1711710577";

export const stopWatchImg =
  "https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_march_24/zenrik_images/Image-98-17115302636923.png?v=1711530264";
export const remainder = userId % 17;

export const campaign_id = 7;
