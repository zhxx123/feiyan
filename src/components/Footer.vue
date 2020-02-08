<template>
  <div class="footerComponent">
    <div class="companyResume">
      <div class="companyResume-line" />
      <hr>
      <span>
        Copyright &copy; {{ earilyYear }}-{{ year }}
        <a href="javascript:;">myzhxx.com</a>. All rights reserved.
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      earilyYear: new Date().getFullYear() - 2
    }
  }
}
</script>

<style lang = "scss" scoped>
.footerComponent {
  padding-bottom:10px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background: #061721;
  .companyInfo {
    margin: 0 auto 10px;
    padding-bottom:20px;
    display: flex;
    justify-content: space-between;
    width: 1200px;
    border-bottom:1px solid white;
    .production-box {
      padding-top: 34px;
      flex: none;
      width: 654px;
      display: flex;
      justify-content: space-between;
      .production {
        flex: 1;
        text-align: left;
        .pro-header {
          margin-bottom: 22px;
          font-size: 16px;
          color: white;
          line-height: 1;
        }
        .pro-content {
          font-size: 14px;
          color: #81858b;
          line-height: 40px;
          li {
            cursor: pointer;
          }
        }
      }
    }
    .contact-box {
      padding-top: 34px;
      .contact-title {
        margin-bottom: 22px;
        font-size: 16px;
        color: white;
        line-height: 1;
        text-align: right;
      }
      .phone {
        margin-bottom: 47px;
        font-size: 35px;
        color: white;
        text-align: right;
        line-height: 46px;
      }
      .contact-list {
        display: flex;
        justify-content: flex-end;
        .contact-item {
          margin-right: 30px;
          flex: none;
          width: 36px;
          height: 36px;
          &:nth-child(1){
            background:url(../assets/common/qq.png) center center no-repeat;
            background-size:100% auto;
          }
          &:nth-child(2){
            background:url(../assets/common/wb.png) center center no-repeat;
            background-size:100% auto;
          }
          &:nth-child(3){
            background:url(../assets/common/wx.png) center center no-repeat;
            background-size:100% auto;
          }
        }
      }
    }
  }
  .companyResume {
    font-size: 16px;
    color:#81858B;
    text-align: center;
  }
}
</style>
