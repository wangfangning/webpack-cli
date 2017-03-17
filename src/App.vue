<template>
<div class="app">
    <h1>wode</h1>
    <div class="tab border-1px">
        <div class="tab_item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab_item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab_item">
            <router-link to="/seller">商家</router-link>
        </div>
          <!-- <router-view></router-view> -->
    </div>

</div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="scss">
.app {
    .tab {
        display: flex;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        .tab_item {
            flex: 1;
            & > a {
                display: block;
            }
            a.active {
                color: red;
            }
        }
    }

}
</style>
