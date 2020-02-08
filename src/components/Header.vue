<template>
  <div class="headerComponent">
    <div class="h-tab">
      <span>点击查看></span>
      <span class="h-tab-span" @click="thInfo">唐河</span>
      <span class="h-tab-span" @click="nyInfo">南阳</span>
      <span class="h-tab-span" @click="haInfo">河南</span>
      <span class="h-tab-span" @click="chinaInfo">中国</span>
      <span class="h-tab-span">{{ screenWidth }}</span>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    // LangSelect
  },
  data() {
    return {
      screenWidth: 0
    }
  },
  computed: {
  },
  created() {
    this.windowWeight()
  },
  methods: {
    thInfo() {
      this.$router.push('/tanghe')
    },
    nyInfo() {
      this.$router.push('/nanyang')
    },
    haInfo() {
      this.$router.push('/henan')
    },
    chinaInfo() {
      this.$router.push('/china')
    },
    windowWeight() {
      this.screenWidth = document.body.clientWidth
    }
  }
}
</script>
<style lang = "scss" scoped>
.headerComponent {
  background: #dbe4e9;
  margin:0 auto;
  min-width: 350px;
  max-width: 800px;
}
.h-tab {
    padding-left: 10px;
    height: 30px;
    /* align-items: center; */
    text-align: left;
  }
.h-tab-span{
  cursor: pointer;
  color:rgb(152, 152, 167);
}
.h-tab-span:hover {
  color: rgb(166, 115, 214);
}
</style>
