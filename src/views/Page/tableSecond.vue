<template>
  <div style="background-color: #fff;position: relative">
    <div class="top-col">
      <!--表单-->
      <!--注意 <el-form> :inline="true" -->
      <el-form class="fillerForm" ref="fillerForm"  :inline="true" :model="filler" label-width="6vw">
        <el-form-item label="搜索内容">
          <el-input size="small" clearable class="input" style="width: 10vw" placeholder="请输入卡口编号" v-model="filler.keyword">
          </el-input>
        </el-form-item>
        <el-form-item label="数据状态">
          <el-select clearable size="small" style="width: 10vw" v-model="filler.dataStatus" placeholder="请选择状态">
            <el-option label="异常" value="2"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  size="small" label="违法时间" >
          <el-date-picker
                  style="width:25vw"
                  clearable
                  v-model="filler.time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:5vw" >
          <el-button  size="small" type="primary" @click="onSubmit">查询</el-button>
          <el-button size="small"  @click="reserve">重置</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <!--导出-->
      <el-button
              style="margin:1vh 0"
              type="primary"
              icon="el-icon-tickets"
              size="mini"
              @click="exportFunc"
      >导出</el-button
      >
      <!--注意 序号 slot-scope -->
      <div class="table-col">
        <el-table
                class="tableid"
                :data="tableData"
                header-row-class-name="table-header"
                :header-cell-style="{padding:'1vh 0',background:'#F5F7FA',fontSize:'0.8vw',borderBottom:'1px solid #E1E3E6'}"
                :cell-style="{padding:'2vh 0'}"
                max-height="69vh"
                height="69vh"
        >
          <!--注意 动态序号 :index="computeTableIndex"-->
          <el-table-column
                  align="center"
                  label="序号"
                  type="index"
                  min-width="110"
          >
          </el-table-column><!--   :index="computeTableIndex"-->
          <el-table-column
                  prop="kkid"
                  :show-overflow-tooltip="true"
                  label="卡口编号">
          </el-table-column>
          <el-table-column
                  prop="kkmc"
                  :show-overflow-tooltip="true"
                  label="卡口名称">
          </el-table-column>
       <!--   <el-table-column
                  prop="lkxxcc"
                  :show-overflow-tooltip="true"
                  label="路口名称">
          </el-table-column>-->
    <!--      <el-table-column
                  prop="fxbhName"
                  :show-overflow-tooltip="true"
                  label="方向">
          </el-table-column>-->
          <el-table-column
                  prop="todayIllegalcar"
                  :show-overflow-tooltip="true"
                  label="违法车辆">
          </el-table-column>
          <el-table-column
                  prop="time"
                  :show-overflow-tooltip="true"
                  label="统计时间">
          </el-table-column>
          <el-table-column
                  prop="dataStatus"
                  :show-overflow-tooltip="true"
                  label="数据状态">
            <template slot-scope="{row}" >
              <div>
                <span :class="[{'green': row.dataStatus == '1'}, {'red': row.dataStatus == '2'}]"></span>
                <span>
              {{format(row.dataStatus)}}
            </span>
                <span v-if="row.dataStatus=='2'" :class="[{'up': row.drift == 'up'}, {'down': row.drift == 'down'}]">
                <i :class="row.drift == 'up'?'el-icon-top':'el-icon-bottom'"></i>
              </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="action"
                  label="操作"
                  align="center"
          >
            <template slot-scope="{$index, row}">
              <span class="actions" @click="handleXx($index, row)">查看详情</span>
              <span class="actions" @click="edithandle($index, row)">编辑</span>
              <a class="actions" :href="row.smsPic" target="_blank">预览照片</a> <!--smsPic照片地址-->
              <a class="actions" @click="downP($index, row)">下载照片</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              :page-size="10"
              background
              :current-page.sync="filler.pageNo"
              layout="total, prev, pager, next, jumper"
              :total="filler.tol"
      >
      </el-pagination>

    </div>
    <el-dialog :title="title" :close-on-click-modal='closeModal' :visible.sync="dialogFormVisible" width="50%">
      <p>文件上传</p>
      <!--上传文件-->
      <div style="display: flex;">
        <div style="width:7vw;text-indent: 1vw;color: #A8B7CC;text-align: right;padding-right: 10px">附件上传：</div>
        <el-upload
                ref="upload"
                class="upload-demo"
                drag
                :headers="headers"
                action="/xboot/upload/v4/file"
                :on-success="handleSuccess"
                :limit=1
                method:="post"

                accept='.doc,.docx,.pdf,.jpg'
                :file-list="file.fj">
          <div class="el-upload__text"><em>添加附件</em></div>
        </el-upload>
      </div>
      <div class="uploadtip atag"> 支持1个文件上传，扩展名：doc .docx .pdf .jpg文件，且不超过500kb</div>

    </el-dialog>
<!--svga-->
    <div id="demoCanvas" class="svga" ref="canvas"></div>

  </div>
</template>
<script>
import commonApi from "../../request/api/common";
import SVGA from "svgaplayerweb";//svga引入
export default {
  data() {
    return {
      //过滤
      filler:{
        keyword:'',
        dataStatus:"",
        time: [new Date(new Date().toLocaleDateString()).getTime(),
          new Date(new Date().toLocaleDateString()).getTime() + ((24 * 60 * 60 * 1000) - 1)],
        startTime:'',
        endTime:'',
        pageNo:1,//当前页
        tol: 0, //分页
        pageSize:10
      },
      //表单
      tableData: [
         {
           kkid: 'YDP-001',
           kkmc: '上清寺转盘动态屏',
           lkxxcc: '上清寺转盘',
           fxbhName: '方向',
           todayIllegalcar:'今日过车辆',
           time: '2020-07-14 10:11:12',
           dataStatus: '1',
         },
        {
          kkid: 'YDP-001',
          kkmc: '上清寺转盘动态屏',
          lkxxcc: '上清寺转盘',
          fxbhName: '方向',
          todayIllegalcar:'今日过车辆',
          time: '2020-07-14 10:11:12',
          dataStatus: '1',
        },
        {
          kkid: 'YDP-001',
          kkmc: '上清寺转盘动态屏',
          lkxxcc: '上清寺转盘',
          fxbhName: '方向',
          todayIllegalcar:'今日过车辆',
          time: '2020-07-14 10:11:12',
          dataStatus: '1',
        },
      ],
      title:'',
      closeModal: true,
      dialogFormVisible:false,
      file: {
        fj:"",
        fileId:''
      }
    }

  },
  created(){
    /*增加请求头*/
    let obj = {"accessToken":window.sessionStorage.getItem('token')};
    this.headers = obj;
  },
  mounted() {
    //初始化日期当天
   /* let day=new Date()
    let day2= this.$api.commonApi.formatTime(day)
    this.day=day2
    this.filler.startTime=day2
    this.filler.endTime=day2*/
   /* this.getException()*/
    /*svga调用代码*/
    var player = new SVGA.Player("#demoCanvas");
    var parser = new SVGA.Parser("#demoCanvas");
    parser.load("img/1.svga", function(videoItem) {
      player.setVideoItem(videoItem);
      player.startAnimation();
    });
  },
  methods: {
    //字段字典码
    formatdj (dj) {
      switch (dj) {
        case '0':
          return '正常'
        case '1':
          return '异常'
        case '2':
          return '无数据'
      }
    },
    format (dj) {
      switch (dj) {
        case '1':
          return '正常'
        case '2':
          return '异常'
      }
    },
    formatwl (dj) {
      switch (dj) {
        case '0':
          return '联网'
        case '1':
          return '未联网'
      }
    },
    formatdata (dj) {
      switch (dj) {
        case '0':
          return '正常'
        case '1':
          return '异常'
      }
    },
    //序号叠加的
    computeTableIndex(index){
      return (this.filler.pageNo - 1)*this.filler.pageSize + index + 1 // pageNo 当前页， pageSize每页条数
    },
    //初始查询
    getException(){
     /* let params=this.filler
      this.$api.exceptionApi.getBayonet(params).then(res => {
        if (res.data.success) {
          this.tableData = res.data.result.records
          this.filler.tol=res.data.result.total
        }
      });*/
    },
    //分页
    handleCurrentChange (val) {
    /*  this.filler.pageNo=val
      this.getException()*/
    },
    //查询
    onSubmit(){
      if(this.filler.time){
        this.filler.startTime=this.$api.commonApi.formatTime(this.filler.time[0])
        this.filler.endTime=this.$api.commonApi.formatTime(this.filler.time[1])
      }
     /* this.getException()*//* this.getException()*/
    },
    reserve(){
   /*   this.filler={
       keyword:'',
        dataStatus:"",
        time:'',
        startTime:'',
        endTime:'',
        pageNo:1,//当前页
        tol: 0, //分页
        pageSize:10
      }
      this.getException()*/
    },

    /*
    * 表单操作
    * */
    //详情
    handleXx(index, row){
    /*  //console.log(row)
      let params={
        id:row.id
      }
      this.$api.exceptionApi.getBayonetXq(params).then(res => {
        if (res.data.success) {
          this.detail=res.data.result

        }
      })
      this.xqDialogVisible=true*/
    },
    //编辑
    edithandle(index, row){
      this.dialogFormVisible=true
      this.title='编辑'
    },

    /*
    * 文件上传
    * */
    handleSuccess (response, file, fileList) {
      this.fil.fileId=response.result.file.id
      // 上传成功要处理的事
    },

    /*
    * 图片下载--跨域下载，后台做nagix代理
    * */
    downP($index, row){
      let that = this;
      let hreLocal="";
      hreLocal = row.smsPic;   //图片地址
      that.downloadByBlob(hreLocal,row.smsName)   //smsName图片名
      /*  let a = document.createElement('a')
        /!*let nameold=row.smsPic.split('/')[2]
        let name=nameold.substring(0, nameold.lastIndexOf('.'))
        console.log(name)*!/
        a.download = row.smsName
        // 设置图片地址
        a.href = row.smsPic;
        a.click();*/
    },
    downloadByBlob(url,name) {
      let image = new Image()
      let that=this
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          that.download(url,name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
    download(href, name) {
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },

    /*
    * 导出表单
    * */
    exportFunc () {
      this.$axios({
        url: '/gosits/web/dispatch/billSearch/ExcelDownload',
        method: 'post',
        data: {
          ...this.formData,
          ...this.searchObj,
          defaultQuery: defaultQuery,
          pageNo: 0,
          pageSize: 999999,
          timeOne: this.formData.searchTime[0]
                  ? `${this.formData.searchTime[0]} 00:00:00`
                  : '',
          timeTwo: this.formData.searchTime[1]
                  ? `${this.formData.searchTime[1]} 23:59:59`
                  : ''
        },
        responseType: 'blob'
      }).then(res => {
        if (res) this.dealBlobFile(res)
      })
    },
    dealBlobFile (file) {
      const link = document.createElement('a')
      var blob = new Blob([file], {
        type: 'application/msexcel;charset=utf-8'
      })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      link.download = '故障单列表.xlsx'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .top-col{
    padding: 2vh 1vw;
    .fillerForm{
      display: flex;
      align-items: center;
    }
    .green{
      display: inline-block;
      width: 1vw;
      height: 1vw;
      background-color: #42b983;
      border-radius: 50%;
      vertical-align: middle;
    }
    .red{
      display: inline-block;
      width: 1vw;
      height: 1vw;
      background-color: orangered;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .pagination {
    position: absolute;
    bottom: 2.5vh;
    right: 1vw;
  }
  .actions{
    margin: 0 5px;
    color: #2D64AB;
    cursor: pointer;
  }
  .svga {
    width: 46px;
    height: 72px;
    position: absolute;
    bottom: 0;
  }
</style>
