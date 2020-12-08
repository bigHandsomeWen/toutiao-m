<template>
  <div class="userProfileContainer">
    <!-- 头部导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <!-- 点击头像的 file 输入框 -->
    <input type="file" hidden ref="fileRef" @change="onChange" />

    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.fileRef.click()">
      <van-image class="avator" fit="cover" round :src="userProfile.photo" />
    </van-cell>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="showNamePopup = true"
    />

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender ? '女' : '男'"
      @click="showSexPopup = true"
    />

    <!-- 生日 -->
    <van-cell title="生日" is-link @click="showBirthdayPopup = true">
      <span slot="default" :class="userProfile.birthday ? '' : 'active'">{{
        userProfile.birthday ? userProfile.birthday : "待完善"
      }}</span>
    </van-cell>

    <!-- 昵称的弹出层 -->
    <van-popup
      v-if="showNamePopup"
      v-model="showNamePopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-name @cancelpopup="cancelpopup" :userProfile="userProfile" />
    </van-popup>

    <!--性别的弹出层 -->
    <van-popup
      v-if="showSexPopup"
      v-model="showSexPopup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <updata-sex v-model="userProfile.gender" @close="showSexPopup = false" />
    </van-popup>

    <!--生日的弹出层 -->
    <van-popup
      v-if="showBirthdayPopup"
      v-model="showBirthdayPopup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <updata-birthday
        v-model="userProfile.birthday"
        @close="showBirthdayPopup = false"
      />
    </van-popup>

    <!--头像的弹出层 -->
    <van-popup
      v-if="showAvatorPopup"
      v-model="showAvatorPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-avator
        :img="img"
        @close="showAvatorPopup = false"
        @updataPhoto="userProfile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
// 加载获取个人资料的接口方法
import { getUserProfile } from '@/api/user'
// 加载昵称的组件
import updataName from './components/updata-name'
// 加载性别的组件
import updataSex from './components/updata-sex'
// 加载生日的组件
import updataBirthday from './components/updata-birthday'
// 加载头像的组件
import updataAvator from './components/updata-avator'

export default {
  name: 'UserProfileIndex',
  components: {
    updataName,
    updataSex,
    updataBirthday,
    updataAvator
  },
  data () {
    return {
      userProfile: {},
      // 控制昵称弹出层的开关
      showNamePopup: false,
      // 控制性别弹出层的开关
      showSexPopup: false,
      // 控制生日弹出层的开关
      showBirthdayPopup: false,
      // 控制头像弹出层的开关
      showAvatorPopup: false,
      // 头像 img
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    // 获取个人资料
    async loadUserProfile () {
      try {
        // 调接口
        const { data: res } = await getUserProfile()
        // console.log(res)
        this.userProfile = res.data
      } catch (error) {
        this.$toast.fail('获取个人资料失败')
      }
    },
    cancelpopup () {
      // 关闭昵称弹层
      this.showNamePopup = false
      // 重新渲染页面
      this.loadUserProfile()
    },
    // 监听 file 的 change 事件
    onChange () {
      // 获取上传的图片
      const file = this.$refs.fileRef.files[0]
      this.img = URL.createObjectURL(file)
      // 打开弹出层
      this.showAvatorPopup = true
      this.$refs.fileRef.value = ''
    }
  }
}
</script>
<style lang='less' scoped>
.userProfileContainer {
  .avator {
    width: 45px;
    height: 45px;
  }
  .active {
    color: #3296fa;
  }
}
</style>
