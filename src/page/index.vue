<template>
  <div :class="['wrap', vipType === 2 ? 'is-vip' : '']">
    <vueElemenntLoading
      :active="loading"
      spinner="ring"
      color="rgb(86,82,82)"
      :text="$t('loading')"
    />
    <div class="header">
      <div class="back" @click="back"></div>
    </div>
    <div class="main">
      <div class="title" v-if="vipType === 2">
        <span class="icon-vip"></span>{{ $t("title") }}
      </div>
      <div class="title" v-else>{{ $t("title") }}</div>
      <div class="section section1">
        <div class="section-title is-required">{{ $t("email") }}</div>
        <input type="text" class="input email" v-model.trim="email" />
      </div>
      <div class="section section1">
        <div class="section-title is-required">{{ $t("feedback") }}</div>
        <textarea
          type="text"
          class="input"
          v-model.trim="text"
        ></textarea>
      </div>
      <div class="section-title">{{ $t("image") }}</div>
      <div class="section section2">
        <div
          :class="[
            'section-upload',
            fileList.length >= 5 ? 'upload-disabled' : '',
          ]"
          @click="upload"
        >
          <span class="inner-upload">
            <input
              type="file"
              id="file-input"
              accept="image/*,video/*"
              style="display: none"
              multiple
              @change="setUploadImage"
            />
            <div class="upload-text"></div>
          </span>
        </div>
        <div class="empty-disabled"></div>
      </div>
      <div
        @click="submit"
        :class="[
          'btn-submit',
          text.length >= 5 && email.length > 0 ? '' : 'is-disabled',
        ]"
      >
        {{ $t("submit") }}
      </div>
    </div>
    <div class="main btn">
      <!-- <div
        @click="submit"
        :class="[
          'btn-submit',
          text.length >= 5 && email.length > 0 ? '' : 'is-disabled',
        ]"
      >
        {{ $t("submit") }}
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  padding-top: 0.2rem;
  width: 100%;
  min-height: 100%;
  &.is-vip {
    background-color: #ffd984;
    .header {
      // font-size: 0.24rem;
      color: #98540e;
      margin-bottom: 0.2rem;
    }
    .back {
      background-image: url(../img/back3.png);
    }
    .section-title {
      color: #98540e;
    }
    .input {
      border-color: #ffd984;
    }
  }
}
.title {
  margin-bottom: 20px;
  height: 0.32rem;
  line-height: 0.32rem;
  letter-spacing: 1px;
  text-align: center;
  font-size: 0.2rem;
  font-weight: 100;
  color: rgb(51, 51, 51);
  font-family: "SFProRounded-Bold";
}
.icon-vip {
  display: inline-block;
  vertical-align: middle;
  width: 0.47rem;
  height: 0.41rem;
  background-image: url(../img/icon-vip.png);
  background-size: 100% 100%;
  margin-right: 0.05rem;
}
.main {
  width: 3.4rem;
  // background-color: #f5f5f5;
  // border: 0;
  // border-radius: 4px;
  // box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
  //   0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  margin: 0 auto;
  padding: 12% 0.12rem;
}
.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  padding: 0 0.12rem;
}
.section1 {
  margin-bottom: 0.2rem;
}
.section-title {
  font-family: "SFProRounded-Semibold";
  font-size: 0.13rem;
  color: rgb(51, 51, 51);
  margin-bottom: 0.06rem;
  line-height: 1;
}
.input {
  width: 3.16rem;
  height: 0.4rem;
  display: block;
  background-color: rgb(243, 243, 243);
  border: 1px solid rgb(231, 230, 230);
  border-radius: 8px;
  -webkit-appearance: none;
  padding: 0.1rem;
  font-size: 0.12rem;
}
input:focus,
textarea:focus {
  border: 1px solid rgb(116, 193, 10);
  // caret-color: rgb(116, 193, 10);
}
textarea {
  height: 2rem !important;
  padding: 0.1rem;
}
.is-required::after {
  content: "*";
  color: rgb(237, 74, 74);
  margin-left: 0px;
}
.section-upload {
  // display: inline-block;
  width: 0.95rem;
  height: 0.95rem;
  background-color: #eeeeee;
  text-align: center;
  vertical-align: top;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}
.section2 {
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.inner-upload {
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
}
.upload-disabled {
  display: none;
}
.empty-disabled {
  width: 0.95rem;
  opacity: 0;
}
.upload-text {
  width: 0.2rem;
  height: 0.2rem;
  background-image: url(../img/iconAddImage.png);
  background-size: 100% 100%;
  // font-family: "SFProRounded-Semibold";
  // font-size: 0.35rem;
  // font-weight: 200;
  // margin-top: -0.06rem;
}
.vip-text {
  font-size: 0.12rem;
  margin-top: 0.1rem;
  color: #98540e;
}
</style>

<script>
import { mapMutations, mapState } from "vuex";
import { exit, getUserInfo, setUserInfo } from "@/common/interface";
import { emailCheck } from "@/common/utils";
import vueElemenntLoading from "vue-element-loading";
const emojiRegex = require("emoji-regex");
import { ourlang, languageMap, translateText } from "../lang/index";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      nickName: "",
      email: "",
      text: "",
      desc: "",
      emailBody: "",
      tag: "",
      vipType: 1,
      fileUpload: "",
      fileList: [],
      loading: false,
      thisurl: "aa",
    };
  },
  components: {
    vueElemenntLoading,
  },
  beforeCreate() {
    window.getUserInfoCallback = (info) => {
      setUserInfo(info);
      this.$nextTick(function () {
        this.setInfo(info.baseUrl);
        this.vipType = info.vip_type ? Number(info.vip_type) : 1;
      });
    };
    getUserInfo("getUserInfoCallback");
  },
  created() {},
  mounted() {
    window.addEventListener("offline", () => {
      this.$router.replace({
        path: "/result",
        query: {
          type: "error",
          title: this.$t("webnet"),
        },
      });
    });
  },
  watch: {
    fileList: {
      handler: function (val) {},
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["setInfo"]),
    back() {
      exit();
    },
    stripscript(str) {
      const pattern = new RegExp(
        "[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）――|{}【】‘；：”“'。，、？]"
      ); //格式 RegExp("[在中间定义特殊过滤字符]")
      let res = "";
      for (let i = 0; i < str.length; i++) {
        res = res + str.substr(i, 1).replace(pattern, "");
      }
      return res;
    },
    setValueState() {
      let desc = "";
      const regex = emojiRegex();
      const specialChart =
        /[%--~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g;
      desc = this.text.replace(regex, "");
      desc = this.stripscript(desc);
      desc = desc.replace(/\r\n/g, "");
      desc = desc.replace(/\s/g, "");
      // let textLength = desc.length;
      // let state = "a";
      // if (textLength <= 20) {
      //   state = "c";
      // } else if (textLength > 20 && textLength < 80) {
      //   state = "b";
      // }
      // return state;
      // this.desc = desc;
    },
    upload() {
      document.getElementById("file-input").click();
    },
    convertImage(file) {
      var that = this;
      var reader = new FileReader();
      // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.addEventListener(
        "load",
        function () {
          that.createUploadEle(reader.result, file);
        },
        false
      );
      // 调用reader.readAsDataURL()方法，把图片转成base64
      if (file) reader.readAsDataURL(file);
    },
    setUploadImage(e) {
      var upload_data = [].slice.call(e.target.files);
      let promise = [];
      if (upload_data.length + this.fileList.length > 5) {
        this.$message({
          type: "error",
          text: this.$t("imagelimit"),
        });
        upload_data.splice(0, upload_data.length + this.fileList.length - 5);
      }
      upload_data.map((ele) => {
        var size = Math.floor(ele.size / 1024);
        if (size > 30000) {
          this.$message({
            type: "error",
            text: this.$t("imagesizelimit"),
          });
        } else {
          let p = new Promise((res, rej) => {
            this.convertImage(ele);
            res(true);
          });
          promise.push(p);
        }
      });
      Promise.all(promise).then(() => {
        e.target.value = "";
      });
    },
    createUploadEle(result, file) {
      var $type;
      if (file.type.indexOf("image/") != -1) {
        $type = "img";
      } else {
        $type = "video";
      }
      var $span = document.createElement("span");
      var img = document.createElement($type);
      var sid = uuidv4();
      img.setAttribute("class", "section-preload");
      img.src = result;

      var $a = document.createElement("a");
      var $div = document.createElement("div");
      $span.setAttribute("class", "span-preload");
      $a.setAttribute("class", "delete");
      $div.setAttribute("data-index", sid);
      $div.setAttribute("class", "delete-img");
      $a.onclick = (e) => this.removeImage(e);
      $a.appendChild($div);
      $span.appendChild(img);
      $span.appendChild($a);
      document
        .querySelector(".section2")
        .insertBefore($span, document.querySelector(".section-upload"));
      this.fileList.push({ sid: sid, data: file, ele: $span });
    },
    // createUploadEle(result, file) {
    //   var imgUrl;
    //   if (file.type.indexOf("image/") != -1) {
    //     imgUrl = result;
    //     this.addPreloadImage(file, imgUrl);
    //   } else {
    //     var video = document.createElement("video");
    //     video.src = result; // url地址
    //     video.width = 375;
    //     video.height = 812;
    //     video.crossOrigin = "anonymous"; // 解决跨域问题，也就是提示污染资源无法转换视频
    //     video.currentTime = 1; // 第一帧

    //     video.oncanplay = () => {
    //       var canvas = document.createElement("canvas"); // 获取 canvas 对象
    //       canvas.width = video.width; // 获取视频宽度
    //       canvas.height = video.height; // 获取视频高度
    //       const ctx = canvas.getContext("2d"); // 绘制2d
    //       // 利用canvas对象方法绘图
    //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //       // 截取后的视频封面（转换成base64形式）
    //       imgUrl = canvas.toDataURL("image/png");
    //       this.addPreloadImage(file, imgUrl);
    //     };
    //   }
    // },
    // addPreloadImage(file, imgUrl) {
    //   var $span = document.createElement("span");
    //   var sid = uuidv4();
    //   var $img = document.createElement("img");
    //   $img.src = imgUrl;
    //   $img.setAttribute("class", "section-preload");
    //   var $a = document.createElement("a");
    //   var $div = document.createElement("div");
    //   $span.setAttribute("class", "span-preload");
    //   $a.setAttribute("class", "delete");
    //   $div.setAttribute("data-index", sid);
    //   $div.setAttribute("class", "delete-img");
    //   $a.onclick = (e) => this.removeImage(e);
    //   $a.appendChild($div);
    //   $span.appendChild($img);
    //   $span.appendChild($a);
    //   document
    //     .querySelector(".section2")
    //     .insertBefore($span, document.querySelector(".section-upload"));
    //   this.fileList.push({ sid: sid, data: file, ele: $span });
    // },
    removeImage(e) {
      var uid = e.target.getAttribute("data-index");
      this.fileList = this.fileList.filter((ele) => {
        if (ele.sid === uid) {
          document.querySelector(".section2").removeChild(ele.ele);
        }
        return ele.sid !== uid;
      });
    },
    async submit() {
      if (this.text.length == 0) {
        return this.$message({
          type: "error",
          text: this.$t("nofeedback"),
        });
      }
      if (this.email.length == 0) {
        return this.$message({
          type: "error",
          text: this.$t("noemail"),
        });
      }
      if (this.text.length > 0) {
        var strs = new Array();
        strs = this.text.match(/[\u00ff-\uffff]|\S+/g);
        if (strs.length < 5) {
          return this.$message({
            type: "error",
            text: this.$t("wrongfeedback"),
          });
        }
      }
      if (!emailCheck(this.email)) {
        return this.$message({
          type: "error",
          text: this.$t("wrongemail"),
        });
      }
      var formData = new FormData();
      this.fileList.map((ele) => {
        formData.append("images", ele.data);
      });
      formData.append(
        "feedback",
        new Blob(
          [
            JSON.stringify({
              name: this.nickName,
              email: this.email,
              content: this.text,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      this.loading = true;
      const res = await this.$store.dispatch("submitInfo", formData);
      this.loading = false;
      if (res != null && res.code == 0) {
        this.$router.replace({
          path: "/result",
          query: {
            type: "success",
            title: this.$t("success"),
          },
        });
      } else {
        this.$message({
          type: "error",
          text: this.$t("webnet"),
        });
      }
    },
  },
};
</script>
