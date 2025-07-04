//url for production
export var url = "";
if (import.meta.env.NODE_ENV === "development") {
  url = "";
} else {
  url = window.location.host.split("/")[1];
  if (url) {
    url = `/${window.location.host.split("/")[1]}`;
  } else url = '/'; /// ADD YOUR CPANEL SUB-URL
}

// Logs out user
export const handleSignout = () => {
  localStorage.removeItem("accessToken");
};

//Function to validate and return errors for a form
export const checkForm = (formData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    if (formData[item] === null || formData[item] === "") {
      errorState[item] = "This field is required";
    }
  });
  return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string) => {
  let extractedString = [];

  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) === string.charAt(i).toUpperCase() && string.charAt(i) !== " ") {
      extractedString.push(string.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

//Function that calculates the from current date
export const setDeadline = (days) => {
  let todayDate = new Date();
  var newDate = new Date(todayDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let final = monthNames[m] + " " + d + ", " + y;
  return final;
};

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate) => {
  let d = rdate.getDate();
  d < 10 && (d = "0" + d);
  let m = rdate.getMonth() + 1;
  m < 10 && (m = "0" + m);
  let y = rdate.getFullYear();
  rdate = y + "-" + m + "-" + d;

  return rdate;
};

// Set deadlines for projects
export const setDeadlineDays = (deadline) => {
  var currentDate = new Date();
  var difference = deadline.getTime() - currentDate.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

//Date formatter function
export const dateFormatterAlt = (date, reverse) => {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  reverse ? (date = m + " - " + d + " - " + y) : (date = y + " - " + d + " - " + m);
  return date;
};

//Date formatter function
export const dateFormatter = (date, reverse, string) => {
  var dateformat = date.split("-");
  //var date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
  reverse
    ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
    : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);

  return date;
};

//todays Date
export const todaysDate = new Date();

//current Time
export const currentTime = () => {
  var hours = todaysDate.getHours();
  var minutes = todaysDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Percentage calculation
export const calcPercentage = (str1, str2) => {
  let result = Number(str2) / Number(str1);
  result = result * 100;
  return Math.floor(result);
};

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + " " + truncate(str.substr(n - 1, str.length), n) : str;
};

// returns upload url
export const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

export const bulkActionOptions = [
  { value: "suspend", label: "Suspend User" },
  { value: "delete", label: "Delete User" },
];

// Converts KB to MB
export const bytesToMegaBytes = (bytes) => {
  let result = bytes / (1024 * 1024);
  return result.toFixed(2);
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Returns Currency based value for invest panel
export const returnCurrency = (currency, data, upperCase) => {
  if (currency === "usd") {
    return { value: data.usd.toFixed(2), label: upperCase ? "USD" : "$" };
  } else if (currency === "eur") {
    return { value: data.euro.toFixed(2), label: upperCase ? "EUR" : "euro" };
  } else if (currency === "btc") {
    return { value: data.BTC.toFixed(6), label: "BTC" };
  } else {
    return { value: data.ETH.toFixed(2), label: "ETH" };
  }
};

// Returns levels
export const returnLevel = (currency, data, upperCase) => {
  if (currency === "usd") {
    return data.usd;
  } else if (currency === "eur") {
    return data.euro;
  } else if (currency === "btc") {
    let amount = data.BTC.map((item) => {
      return item.toFixed(6);
    });
    return amount;
  } else {
    return data.ETH;
  }
};

/* eslint-disable no-unused-expressions */
export const slideUp = (target, duration=500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight; target.style.overflow = 'hidden'; target.style.height = 0;
  target.style.paddingTop = 0; target.style.paddingBottom = 0;
  target.style.marginTop = 0; target.style.marginBottom = 0;
  window.setTimeout( () => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
  }, duration);
}

/* eslint-disable no-unused-expressions */
export const slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  let height = target.offsetHeight; 
  target.style.overflow = 'hidden'; target.style.height = 0; target.style.paddingTop = 0;
  target.style.paddingBottom = 0; target.style.marginTop = 0;
  target.style.marginBottom = 0; target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top'); target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top'); target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
  }, duration);
}

export const slideToggle = (target, duration=500) => {
  if (window.getComputedStyle(target).display === 'none') {
      return slideUp(target, duration);
    } else {
      return slideDown(target, duration);
  }
};

export const getParents = (el, selector, filter) => {
  // If no selector defined will bubble up all the way to *document*
  let parentSelector = (selector === undefined) ? document : document.querySelector(selector);
  var parents = [];
  var pNode = el.parentNode;
  
  while (pNode !== parentSelector) {
      var element = pNode;

      if(filter === undefined){
          parents.push(element); // Push that parentSelector you wanted to stop at
      }else{
          element.classList.contains(filter) && parents.push(element);
      }
      pNode = element.parentNode;
  }
  
  return parents;
}