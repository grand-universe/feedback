<template>
  <div class="wrap">
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
      <div class="title">{{ $t("title") }}</div>
      <div class="section section-img">
        <div class="result-image" v-if="$route.query.type === 'success'" />
        <div class="result-image error" v-else />
      </div>
      <div class="section-error" v-if="$route.query.type !== 'success'">
        Error
      </div>
      <div class="section section-title">{{ $route.query.title }}</div>
      <div
        class="btn-submit btn"
        v-if="$route.query.type === 'success'"
        @click="back"
      >
        {{ $t("buttonok") }}
      </div>
      <div class="btn-submit btn" v-else @click="reload">
        {{ $t("buttontry") }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  padding-top: 0.2rem;
  width: 100%;
  min-height: 100%;
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
.main {
  width: 3.4rem;
  margin: 0 auto;
  padding: 0.3rem 0.12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.section {
  margin-bottom: 0.1rem;
}
.section-img {
  margin-top: 0.8rem;
}
.result-image {
  left: 50%;
  right: 50%;
  width: 1rem;
  height: 1rem;
  background-image: url(../img/icon_feedback_success.png);
  background-size: 100% 100%;
  &.error {
    background-image: url(../img/icon_error.png);
  }
}
.section-title {
  text-align: center;
  font-family: "SFProRounded-Semibold";
  font-size: 0.13rem;
  line-height: 0.16rem;
  color: rgb(102, 102, 102);
  font-weight: 500;
}
.section-error {
  text-align: center;
  font-family: "SFProRounded-Bold";
  font-size: 0.16rem;
  color: rgb(51, 51, 51);
  margin-bottom: 0.06rem;
}
.btn {
  width: 3.16rem;
  margin-top: 0.5rem;
}
</style>
<script>
import { exit } from "@/common/interface";
import vueElemenntLoading from "vue-element-loading";
export default {
  name: "result",
  data() {
    return {
      loading: false,
      timer: null,
    };
  },
  components: { vueElemenntLoading },
  mounted() {},
  methods: {
    back() {
      exit();
    },
    reload() {
      this.loading = true;
      this.overTime();
      if (navigator.onLine) {
        this.loading = false;
        this.$router.replace({
          path: "/",
        });
        if (this.timer) this.clearTimer();
      }
      window.addEventListener("online", () => {
        this.loading = false;
        this.$router.replace({
          path: "/",
        });
        if (this.timer) this.clearTimer();
      });
    },
    overTime() {
      // 10s
      this.timer = setTimeout(() => {
        this.loading = false;
        this.$message({
          type: "error",
          text: this.$t("webnet"),
        });
      }, 10000);
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
};
</script>
