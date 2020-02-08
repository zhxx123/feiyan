<template>
  <div id="app">
    <headerComponent v-show="isShow" />
    <!-- <navComponent v-show="false" /> -->
    <!-- :style="[{minHeight: contentHeight+'px'},'app-content']" -->

    <router-view
      @header="header"
    />
    <footerComponent
      v-show="!isShow"
      :class="(is_relative_bottom) ? 'footer_relative':'footer_bottom'"
    />
  </div>

</template>

<script>
import headerComponent from './components/Header'
// import navComponent from './components/Nav'
import footerComponent from './components/Footer'
// import { ColorPicker } from 'element-ui'
export default {
  name: 'App',
  components: {
    headerComponent, // 头部
    // navComponent, // 内容
    footerComponent // 尾部
  },
  data() {
    return {
      isShow: true,
      is_relative_bottom: false,
      contentHeight: 100,
      head_footer: 370 // hader 70 + footer 300
    }
  },
  watch: {
    $route(to) {
    //   if (to.path === '/login' || to.path === '/register') {
    //     // this.isShow = false
    //   } else {
      this.isShow = true
    //   }
    },
    is_relative_bottom() {
      this.is_relative_bottom = false
    }
  },
  mounted() {
    this.contentHeight = document.body.scrollHeight - this.head_footer
    this.is_relative_bottom = false
    window.onresize = () => {
      return (() => {
        this.set_footer_position()
      })()
    }
  },
  created() {

  },
  methods: {
    header(show) {
      this.isShow = show
    },
    footer(show) {
      this.isShow = show
    },
    ct() {
      return document.compatMode === 'BackCompat' ? document.body.clientHeight : document.documentElement.clientHeight
    },
    set_footer_position() {
      // if(document.body.scrollHeight <= this.ct()){
      //   //  this.is_relative_bottom = false;
      //    this.contentHeight = document.body.scrollHeight - this.head_footer
      // } else {
      //     // this.is_relative_bottom = true;
      // }
      this.contentHeight = document.documentElement.clientHeight - this.head_footer
    //   console.log('is_relative_bottom:', this.contentHeight)
    //   console.log('document.body.scrollHeight:', document.body.scrollHeight)
    //   console.log('document.body.clientHeight:', this.head_footer)
      // console.log('document.documentElement.clientHeight',document.documentElement.clientHeight)
      // console.log('this.ct():',this.ct())
    }
  }
}
</script>
<style lang="scss">
html,body{
  height:100%;
}
html,body,div,ul,ol,li,h1,h2,h3,h4,h5,h6,p{
  margin:0;
  padding:0;
}
</style>
<style>
#app {
  box-sizing: border-box;
  position:relative;
  /* padding-bottom:288px; */
  padding-bottom:324px;
  width: 100%;
  min-height:100%;
  min-width: 350px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#F4F4F4;
}
</style>
