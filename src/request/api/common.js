/*
*
* 公共方法的
* */


const commonApi = {

  // 导出的方法
 /* export2Excel(tHeader,filterVal,tableData,name) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel');
        const data = commenApi.formatJson(filterVal, tableData);
        export_json_to_excel(tHeader, data, name);  //导出Excel 文件名
      })
    },*/
  formatJson (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  },
  formatTime(value){
        let date = new Date(value);   //转成标准时间，
        //才能 getFullYear()、getMonth() 、getDate()
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();   d = d < 10 ? ('0' + d) : d;
      /*  let h = date.getHours();   h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();  m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();   s = s < 10 ? ('0' + s) : s;*/
        return y + '-' + MM + '-' + d/* + ' ' + h + ':' + m + ':' + s*/;
    },

  // 获取周几
  getWeek () {
    var dateArray = commenApi.nowTime.split("-")
    var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
    var week = "星期" + "日一二三四五六".charAt(date.getDay())
    this.nowWeek = week // 赋值本地数据
    alert(week)
  }

}
export default commonApi
