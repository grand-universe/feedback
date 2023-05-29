export function getQuery(name) {
  let result = null;
  const regex = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const r = window.location.search.substr(1).match(regex);
  if (r != null) {
    result = decodeURI(r[2]);
  }
  return result === null ? "" : decodeURIComponent(result);
}

export function formatMoney(num) {
  return String(num || "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isInteger(num) {
  return num % 1 === 0;
}

export function formatFixedOne(num) {
  return isInteger(num) ? num : Number(num).toFixed(1);
}

export function emailCheck(str) {
  var emailPat = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return emailPat.test(str);
}

// sleep
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 得到一个两数之间的随机整数，包括两个数在内
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

export const storage = {
  //  存储localStorage
  set: (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  // 获取localStorage
  get: (name) => {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  // 删除localStorage
  remove: (name) => {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
};
