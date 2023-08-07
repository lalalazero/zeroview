<template>
  <div class="z-view-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
let validator = (value) => {
  let keys = Object.keys(value)
  let valid = false
  keys.forEach((key) => {
    if(['offset', 'span'].includes(key)){
      valid = true
    }
  })
  return valid
}
export default {
  name: "zViewCol",
  props: {
    // 默认是 phone 样式
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    ipad: {
      type: Object,
      validator
    },
    narrowPc: {
      type: Object,
      validator
    },
    pc: {
      type: Object,
      validator
    },
    widePc: {
      type: Object,
      validator
    }
  },
  data() {
    return {
      gutter: 0
    };
  },
  methods: {
    createClass(obj, str = ''){
      if(!obj) return []
      let arr = []
      if(obj.span){
        arr.push(`col-${str}${obj.span}`)
      }
      if(obj.offset){
        arr.push(`offset-${str}${obj.offset}`)
      }
      return arr
    }
  },
  computed: {
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px"
      };
    },
    colClass() {
      const { span, offset, ipad, narrowPc, pc, widePc, createClass } = this
      return ([
        [...createClass({span, offset},'')],
        [...createClass(ipad,'ipad-')],
        [...createClass(narrowPc,'narrow-pc-')],
        [...createClass(pc,'pc-')],
        [...createClass(widePc,'wide-pc-')],
      ])
    }
  }
};
</script>
<style lang="scss" scoped>
.z-view-col {
  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: calc($n / 24) * 100%;
    }
  }

  $offset: offset-;
  @for $n from 1 through 24 {
    &.#{$offset}#{$n} {
      margin-left: calc($n / 24) * 100%;
    }
  }

  @media (min-width: 577px){
    $class-prefix: col-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: calc($n / 24) * 100%;
      }
    }

    $offset: offset-ipad-;
    @for $n from 1 through 24 {
      &.#{$offset}#{$n} {
        margin-left: calc($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 769px){
    $class-prefix: col-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: calc($n / 24) * 100%;
      }
    }

    $offset: offset-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$offset}#{$n} {
        margin-left: calc($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 992px){
    $class-prefix: col-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: calc($n / 24) * 100%;
      }
    }

    $offset: offset-pc-;
    @for $n from 1 through 24 {
      &.#{$offset}#{$n} {
        margin-left: calc($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 1200px){
    $class-prefix: col-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: calc($n / 24) * 100%;
      }
    }

    $offset: offset-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$offset}#{$n} {
        margin-left: calc($n / 24) * 100%;
      }
    }
  }

}
</style>
