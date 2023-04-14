const ios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

window.userBasicInfo = {};
window.JSSDK = {
  callUnityBridge(method, args) {
    const params = args
      ? Object.keys(args).map(
          (item) =>
            `${item}=${encodeURIComponent(
              typeof args[item] === "object" && item !== null
                ? JSON.stringify(args[item])
                : args[item]
            )}`
        )
      : undefined;
    const uri = params
      ? `uniwebview://${method}?${params.join("&")}`
      : `uniwebview://${method}`;
    // console.log(uri);
    const messagingIframe = document.createElement("iframe");
    messagingIframe.style.display = "none";
    messagingIframe.src = uri;
    document.documentElement.appendChild(messagingIframe);
    setTimeout(function () {
      document.documentElement.removeChild(messagingIframe);
    }, 0);
  },
  receiveMessage(callbackId, value) {
    if (window[callbackId]) {
      window[callbackId](value);
    }
  },
};

// exit
export function exit() {
  window.JSSDK.callUnityBridge("close");
}

// loading
export function showLoading(flag) {
  window.JSSDK.callUnityBridge("loading", {
    ishide: !flag,
  });
}

// 用户相关信息
export function getUserInfo(callbackId) {
  window.JSSDK.callUnityBridge("getUserInfo", {
    callbackId,
  });
}

// toast
export function showToast(text) {
  window.JSSDK.callUnityBridge("toast", {
    text,
  });
  // window.alert(text)
}

// 显示广告
export function showAds(info) {
  window.JSSDK.callUnityBridge("showRewardAd", info);
}

export function record(path, dic = "") {
  window.JSSDK.callUnityBridge("event_record", {
    path,
    dic,
  });
}

// 更新账户coin
export function updateAccount(info) {
  window.JSSDK.callUnityBridge("updateAccount", info);
}

// // 存储数据
// export function setWebData({key, value}) {
//   window.JSSDK.callUnityBridge('setWebData', {
//     key,
//     value
//   });
// }

// // 获取数据
// export function getWebData({callbackId, key}) {
//   window.JSSDK.callUnityBridge('getWebData', {
//     callbackId,
//     key,
//   });
// }

// // 监听页面进入到前后台

// export function listenPageVisibility() {
//   window.JSSDK.callUnityBridge('listenPageVisibility');
// }

export function setUserInfo(info) {
  const { auth_token, uid, version, baseUrl } = info;
  window.userBasicInfo = {
    ...info,
    auth_token: auth_token.split("=")[1],
    uid: uid,
    version: Number(version || 0),
    baseUrl: baseUrl,
  };
}

// 获取AB实验
export function getABTest(key) {
  window.JSSDK.callUnityBridge("getABTest", {
    key,
  });
}
