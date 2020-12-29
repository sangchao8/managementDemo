<template>
  <div id="dynamic-component-demo">
    <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
    >
      {{ tab }}
    </button>

    <keep-alive>
      <component v-bind:is="currentTabComponent" class="tab"></component>
    </keep-alive>
  </div>

</template>

<script>
  import tabPosts from "@/components/tabPosts";
  import tabArchive from "@/components/tabArchive";
export default {
  data() {
    return {
      currentTab: "Posts",
      tabs: ["Posts", "Archive"]
    };

  },
  components: {
    //声明组件A,B
    tabPosts,
    tabArchive
  },
  computed: {
    currentTabComponent: function() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-button{
    background-color: #11bddb;
    padding: 1vh 1vw;
    color: #fff;
    font-size: 1vw;
    border-radius: 0.5vh;
    cursor: pointer;
    margin: 0 1px;
    font-weight: bolder;
  }
  .posts-tab{
    display: flex;
  }
  .posts-sidebar{

  }
</style>
