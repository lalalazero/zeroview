<script lang="jsx">
  export  default {
    data(){
      return {
        n: 12,
        items: [1,2,3,4,5]
      }
    },
    name: 'JsxTest',
    render(createElement, hack) {
      return (
        <div class="xxx">
          { this.n > 10 ? <span>big</span> : <span>small</span>}
          <ul>
            {
              this.items.map(i => <li>{ i }</li>)
            }
          </ul>
        </div>
      )
    }
  }
</script>
<style scoped lang="scss">
  .xxx {
    color: red;
  }
</style>
