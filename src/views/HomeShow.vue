<template>
     <div class="container">
    <div class="info-box">Whatever is worth doing is worth doing well~🐇</div>
    <div class="rabbit">
      <!-- 兔头 -->
      <div class="rabbit-head">
        <div class="rabbit-face">
          <!-- 兔眼 -->
          <div class="rabbit-eye rabbit-eye-left"></div>
          <div class="rabbit-eye rabbit-eye-right"></div>
          <div class="rabbit-face-lower">
            <!-- 兔鼻子 -->
            <div class="rabbit-nose"></div>
            <!-- 兔嘴巴 -->
            <div class="rabbit-mouth">
              <div class="rabbit-mouth-outer"></div>
              <div class="rabbit-mouth-inner"></div>
            </div>
            <div class="rabbit-mouth-line"></div>
          </div>
          <!-- 兔脸蛋 -->
          <div class="rabbit-blush rabbit-blush-left"></div>
          <div class="rabbit-blush rabbit-blush-right"></div>
        </div>
        <!-- 兔耳朵 -->
        <div class="rabbit-ear rabbit-ear-left-wrap">
          <div class="rabbit-ear-unilateral"></div>
        </div>
        <div class="rabbit-ear rabbit-ear-right-wrap">
          <div class="rabbit-ear-unilateral"></div>
        </div>
      </div>
      <!-- 兔身体 -->
      <div class="rabbit-body">
        <div class="rabbit-tail"></div>
        <div class="rabbit-torso"></div>
        <div class="rabbit-neck"></div>
        <!-- 兔胳膊 -->
        <div class="rabbit-arm rabbit-arm-left"></div>
        <div class="rabbit-arm rabbit-arm-right"></div>
        <!-- 兔腿 -->
        <div class="rabbit-leg rabbit-leg-left">
          <div class="rabbit-leg-foot">
            <div class="rabbit-leg-foot-pad"></div>
          </div>
        </div>
        <div class="rabbit-leg rabbit-leg-right">
          <div class="rabbit-leg-foot">
            <div class="rabbit-leg-foot-pad"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

    onMounted(()=>{
        let script = document.createElement("script")
        script.type = 'text/javascript'
        script.src = 'https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js'
        document.body.appendChild(script)
    })
</script>
<style lang="scss">
@import './index.scss';
</style>