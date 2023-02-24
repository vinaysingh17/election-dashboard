export const BASE_URL = "http://localhost:5000";
export const parseIt = (data) => JSON.parse(data);

export const uploadVoterList = (data, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: data,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/voter/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const candidateListUpload = (data, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: data,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/candidate/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const uploadBoothList = (data, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: data,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const uploadBoothResult = (data, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: data,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth-result/upload", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getVoterList = (page = 0, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/voter/get?page=" + page + "&limit=100", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const getVotersByGender = (callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/voter/gender-filter", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const getVoterByGenderBooth = (booth, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "http://localhost:5000/voter/gender-filter-id?booth=" + booth,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const getBoothList = (page = 0, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth/get?page=" + page + "&limit=100", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const getBoothResult = (page = 0, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    BASE_URL + "/booth-result/get?page=" + page + "&limit=100",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const getCandidateList = (page = 0, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/candidate/get?page=" + page + "&limit=100", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const partyWiseVoteGraphData = (callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth-result/party-wise-vote-share", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};
export const partyWiseVoteGraphDataBooth = (booth, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    BASE_URL + "/booth-result/party-wise-vote-share-id?booth=" + booth,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};

export const partyWiseBoothWin = (callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth-result/party-wise-booth-win", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};
export const partyWiseBoothWinBooth = (booth, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    BASE_URL + "/booth-result/party-wise-booth-win-id?booth=" + booth,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};

export const CandidateWinnerDetailPositionWise = (year, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    BASE_URL + "/candidate/candidate-winner-position?year=" + year,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack({ data: data.data, totalVales: data });
      }
    })
    .catch((error) => console.log("error", error));
};

export const getAgeWiseData = (callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/voter/age-group", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};
export const getAgeWiseDataBooth = (booth, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/voter/age-group-id?booth=" + booth, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};
export const GetAssemblyBoothData = (callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/booth-result/assembly-data", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = parseIt(result);
      if (data.success) {
        callBack(data.data);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log("error", error));
};
