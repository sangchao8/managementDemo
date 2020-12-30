<template>
  <!--搜索树-->
  <div class="treebox">
    <el-input class="inpt" style="margin: 1.5vh 0" placeholder="请输入名称进行搜索"
              @change="seachtext"
              v-model="filterText">
    </el-input>
    <!--搜索的树-->
    <div v-if="seachT">
      <el-tree
              class="filter-tree"
              :data="menuList"
              node-key="id"
              :props="defaultProps2"
              @node-click="handleNodeClick"
              ref="tree">
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span :title='node.label'>{{ node.label }}</span>
          <el-popover
                  width="140"
                  trigger="hover"
                  placement="right"
                  :value="node.id === visibleNodeId"
          >
            <div>
              <div>
                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('edit', node.data)"
                >
                  <i class="el-icon-edit-outline"></i>
                  <span style="margin-left: 5px;"
                  >修改组织</span
                  >
                </div>

                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('delete', node.data)"
                >
                  <i class="el-icon-delete"></i>
                  <span style="margin-left: 5px;"
                  >删除组织</span
                  >
                </div>

                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('add', node.data)"
                >
                  <i class="el-icon-circle-plus-outline"></i>
                  <span style="margin-left: 5px;"
                  >添加子组织</span
                  >
                </div>
              </div>
            </div>
            <span
                    class="moreIcon"
                    slot="reference"
                    @click="showTreeMenu(node)"
            >
                              <i style="margin-left: 1vw" class="el-icon-edit"></i>
                            </span>
          </el-popover>
        </div>
      </el-tree>
    </div>
    <!--懒加载的树-->
   <!-- <div v-else>
      <el-tree
              class="filter-tree"
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :load="loadNode"
              ref="tree"
              lazy>
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span :title='node.label'>{{ node.label }}</span>
          <el-popover
                  width="140"
                  trigger="hover"
                  placement="right"
                  :value="node.id === visibleNodeId"
          >
            <div>
              <div>
                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('edit', node.data)"
                >
                  <i class="el-icon-edit-outline"></i>
                  <span style="margin-left: 5px;"
                  >修改组织</span
                  >
                </div>

                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('delete', node.data)"
                >
                  <i class="el-icon-delete"></i>
                  <span style="margin-left: 5px;"
                  >删除组织</span
                  >
                </div>

                <div
                        class="rightMenuLi"
                        @click="treeMenuFnc('add', node.data)"
                >
                  <i class="el-icon-circle-plus-outline"></i>
                  <span style="margin-left: 5px;"
                  >添加子组织</span
                  >
                </div>
              </div>
            </div>
            <span
                    class="moreIcon"
                    slot="reference"
                    @click="showTreeMenu(node)"
            >
                              <i style="margin-left: 1vw" class="el-icon-edit"></i>
                            </span>
          </el-popover>
        </div>
      </el-tree>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      /*
      * tree列表数据*/
      menuList: [
              /*搜索加载*/
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }

          /*    懒加载数据*/
        /*{
          address: "测试测试测试",
          createBy: "admin",
          createTime: "2020-11-25 14:20:59",
          delFlag: 0,
          fax: "123456",
          id: "1331482998071234560",
          isParent: true,
          logicCode: "",
          mainHeader: [],
          parentId: "0",
          parentTitle: "一级部门",
          remark: "测试测试测试测试",
          serviceScope: "",
          sortOrder: "",
          status: 0,
          telPhone: "025-784512",
          title: "机场一级组织",
          updateBy: "admin",
          updateTime: "2020-11-25 15:29:25",
          viceHeader: []
        }*/
      ],
      filterText: '',
      seachT:true,
      defaultProps: {
        //懒加载
        label: 'title',
        children: 'children',
        isLeaf: 'leaf'
      },
      defaultProps2: {
        children: 'children',
        label: 'label'
      },
      visibleNodeId: '',
    }

  },
  methods: {
    //搜索
    seachtext() {
      let that = this
      if (this.filterText == '') {
        this.seachT = false
        //树刷新
        that.node_had.childNodes = [];
        that.loadNode(that.node_had, that.resolve_had);

      } else {
        this.seachT = true
        let params = this.filterText
        that.loading = true
       /* this.$api.departmentApi.seachDepartment(params).then(res => {
          if (res.data.success) {
            that.menuList = []
            that.menuList = (res.data.result)
          }
          that.loading = false
        });*/

      }
    },
    // 搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    //tree节点点击事件
    handleNodeClick(data,Node,dom){
     /* this.formXx=data
      const formXxQx= data
      this.formXxQx=formXxQx
      //  console.log(this.formXxQx)
      this.deprentShow=true
      //改变编辑状态
      this.sbmintshow=false
      this.disabled= true*/
    },
    /*
    * tree树的懒加载*/
    // 异步树叶子节点懒加载逻辑
    async loadNode(node, resolve) {
      // 一级节点处理
      if (node.level === 0) {
        this.node_had = node;//这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
        this.resolve_had = resolve;//同上，把node.level == 0的resolve也存起来
        await this.requestTree(resolve);
        /*  return resolve(/!*[{ title: 'region' },{ title: 'region2' }]*!/this.resData);*/
      }
      // 其余节点处理
      if (node.level >= 1) {
        this.getIndex(node, resolve);
        if (node.level > 1) return resolve([]);
      }
    },

    // 首次加载一级节点数据函数
    async requestTree(resolve) {
      await this.requestData(0);
      resolve(this.resData);
    },

    // 异步加载叶子节点数据函数
    async getIndex(node, resolve) {
      const nodeId = node.data.id;
      await this.requestData(nodeId);
      resolve(this.resData);
    },
    // 获取该节点下的字节点
    async requestData(val) {
      const res = await this.$api.departmentApi.getDepartment(val)  //请求节点的数据接口
      const resDatas = res.data.result;
      if(resDatas){
        resDatas.forEach((item,index)=>{
          if (item.isParent) {
            item.leaf = false; // 不为叶子节点
          } else {
            item.leaf = true; // 为叶子节点
          }
        })
        this.resData = resDatas;
        if (val === this.showNodeId) {
          // 这一步为了懒加载中等节点渲染完毕后点击到我们需要的节点上去
          // this.$refs.tree.setCurrentKey(this.showNodeId);
        }
      }

    },

    /*
     * 组织增删改方法*/
    treeMenuFnc(cz, data) {}
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .treebox{
    margin: 1vh;
  }
  .filter-tree{
    height:70vh;
    overflow: auto;
  }
  .filter-tree::-webkit-scrollbar-thumb{ /*-webkit-scrollbar-thumb */
    background-color:rgba(61,88,187,0.6);
    border-radius:3px;
  }
  .filter-tree::-webkit-scrollbar{
    width:0.3vw;
  }
</style>
