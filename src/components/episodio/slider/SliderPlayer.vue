<template>
  <div class="slider">
    <div class="slider__bar" ref="bar">
      <div class="slider__handle" ref="handle" :style="handleStyle"/>
      <div class="slider__fill" :style="fillStyle"/>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";

export default {
  name: "SliderPlayer",
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    value: Number,
    disabled: Boolean
  },
  data: () => ({
    isDragging: false,
    handleWidth: 0,
    barWidth: 0
  }),
  methods: {
    calcDimensions() {
      const { bar, handle } = this.$refs;
      this.handleWidth = handle.offsetWidth;
      this.barWidth = bar.offsetWidth;
      console.log(this.handleWidth, this.barWidth);
    },
    onWindowResize(){
      this.calcDimensions();
    }
  },
  mounted() {
    this.onWindowResize = throttle(this.onWindowResize, 200);
    this.calcDimensions();

    window.addEventListener('resize', this.onWindowResize);
  },
  computed: {
    delta(){
      return this.value / this.max;
    },
    fillStyle(){
      return {
        transformOrigin: 'left center',
        transform: `scaleX(${this.delta})`
      }
    },
    handleStyle(){
      const { barWidth, delta, handleWidth } = this;

      return {
        transform: `translateX(${barWidth * delta - handleWidth * .5}px)`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.slider {
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;

  &__bar {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #ccc;
  }

  &__handle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
    left: 0;
    top: calc(50% - 8px);
    z-index: 2;
  }

  &__fill {
    height: 100%;
    width: 100%;
    background-color: deeppink;
  }
}
</style>