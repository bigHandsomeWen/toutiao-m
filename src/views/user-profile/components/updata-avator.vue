<template>
  <div class="UpdataAvatorContainer">
    <img :src="img" ref="imgRef" />

    <div class="footer">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onChange">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { updataUserPhoto } from '@/api/user'

export default {
  name: 'UpdataAvator',
  data () {
    return {
      imgUrl: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    // cropper 的配置对象
    const image = this.$refs.imgRef
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      background: false,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      movable: true
    })
  },
  methods: {
    // 点击完成触发的事件
    onChange () {
      // 基于服务器的裁剪使用 getData 方法获取裁剪参数
      // console.log(this.cropper.getData())

      this.cropper.getCroppedCanvas().toBlob(async blob => {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: false,
          duration: 0
        })
        try {
          const fd = new FormData()
          fd.append('photo', blob)
          // 调接口
          const { data: res } = await updataUserPhoto(fd)
          this.$emit('updataPhoto', res.data.photo)
          // 关闭弹出层
          this.$emit('close')
          this.$toast.success('修改头像成功')
        } catch (error) {
          this.$toast.fail('修改头像失败')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.UpdataAvatorContainer {
  height: 100%;
  background-color: #000;
  .footer {
    display: flex;
    position: absolute;
    padding: 0 20px 20px;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: space-between;
    color: #fff;
    font-size: 32px;
  }
  img {
    max-width: 100%;
  }
}
</style>
