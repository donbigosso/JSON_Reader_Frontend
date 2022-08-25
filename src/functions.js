import axios from "axios";
export function verifyIfObject(object) {
  if (typeof object === "object") {
    return true;
  } else {
    return false;
  }
}

export const checkObjectDepth = (object) => {
  let depth = 0;
  if (verifyIfObject(object)) {
    depth = 1;
    if (verifyIfObject(object[0])) {
      depth = 2;
    }
  }
  return depth;
};

export function checkIfObjectsByKeys(object) {
  const keys = Object.keys(object);
  const keyLength = keys.length;
  let objectArray = [];
  for (let i = 0; i < keyLength; i++) {
    const keyValue = keys[i];
    objectArray[i] = verifyIfObject(object[keyValue]);
  }

  return objectArray;
}

export const analyseDeeperLevValues = (object) => {
  const keys = Object.keys(object);
  const length = keys.length;
  const ifObjectsArr = checkIfObjectsByKeys(object);
  let secondLevArray = [];
  for (let i = 0; i < length; i++) {
    const value = ifObjectsArr[i];
    if (value) {
      secondLevArray[i] = checkIfObjectsByKeys(object[keys[i]]);
    } else secondLevArray[i] = false;
  }
  return secondLevArray;
};

export const drawListItemsAccordingToDepth = (objectArray) => {
  const drawList = (value, key) => {
    if (value) {
      return <li key={key}>object</li>;
    } else {
      return <li key={key}>flat</li>;
    }
  };

  const newArray = objectArray.map(drawList);
  return newArray;
};

export const displayLabelName = (label, labelCaptions) => {
  let labelCaptionKeys = Object.keys(labelCaptions);
  let labelToDisplay = label;
  labelCaptionKeys.forEach((element) => {
    if (element === label) {
      labelToDisplay = labelCaptions[element];
    }
  });
  return labelToDisplay;
};

export const checkPlaceholder = (element) => {
  if (typeof element === "boolean") {
    if (element) {
      return "true";
    } else {
      return "false";
    }
  } else {
    return element;
  }
};

export const checkInputType = (value) => {
  return typeof value === "string"
    ? "text"
    : typeof value === "number"
    ? "number"
    : typeof value === "boolean"
    ? "boolean"
    : "text";
};

export const writeDataToFile = (data, apiUrl, filename) => {
  const dataForPosting = {
    task: "write_to_file",
    filename: filename,
    data: data,
  };
  axios
    .post(apiUrl, dataForPosting)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const butVisib = (editMode, currentItem, itemCount, buttType) => {
  if (!editMode) {
    if (buttType === "previous") {
      if (currentItem > 0) {
        return false;
      } else {
        return true;
      }
    } else if (buttType === "next") {
      if (currentItem < itemCount - 1) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
};

export const setCookie = (cookieName, cvalue, exDays) => {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cookieName + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
};

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
