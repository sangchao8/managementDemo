<template>
    <div class="Login">
        <div class="lgbox">
            <div class="img"></div>
            <div class="til">违停信息管理平台</div>
            <el-form ref="form" :model="form">
                <el-form-item prop="number">
                    <el-input type="text" v-model="form.userName" placeholder="请输入账号" size="small">
                        <i class="el-icon-user-solid" slot="prepend" size="20"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" size="small">
                        <i class="el-icon-lock" slot="prepend" size="20"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class='loginbtn' type="primary" :loading="loading" long @click="Submit('form')">登 录</el-button>
                </el-form-item>
                <el-form-item>
                <!--    <el-checkbox v-model="form.checked">记住密码</el-checkbox>-->
                </el-form-item>
            </el-form>

        </div>
    </div>
    
</template>

<script>
   import Cookie from 'cookie.js';
   import loginApi from "../request/api/login";
    export default {
        name: "Login",
        data () {
            return {
                form:{
                    userName:'',
                    password:'',
                    checked:true
                },

                loading:false,
            }
        },
        methods: {
            Submit(name) {
                if (this.form.username === '') {
                    this.$message({
                        message: '请填写账号！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.form.password === '') {
                    this.$message({
                        message: '请填写正确的密码！',
                        type: 'warning'
                    })
                    return false
                }
                this.loading = true
                let params={
                    userName: this.form.userName,
                    password: this.form.password
                }
                this.$api.LoginApi.login(params).then(res => {
                    if(res.data.success){
                        this.$router.push('/page')
                        /*   this.afterLogin(res);
                        sessionStorage.setItem('token',res.data.result)
                         Cookie.set("accessToken", accessToken, {
                            domain: 1,
                            expires: 7})
                         */
                    }else{
                        this.$message({
                            message: '用户名或密码不正确！',
                            type: 'warning'
                        })
                        this.loading = false
                        return false
                    }
                })
            },
            /* afterLogin(res) {
                let accessToken = res.result;
                this.setStore("accessToken", accessToken);
                getOtherSet().then(res => {
                    if (res.result) {
                        let domain = res.result.ssoDomain;
                        Cookies.set("accessToken", accessToken, {
                            domain: domain,
                            expires: 7
                        });
                    }
                });

        },*/
        }
    }
</script>

<style  scoped>
    .Login{
        height: 100vh;
        width: 100%;
        background: url("../assets/img/login/bg.png") center no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lgbox{
        width: 16vw;
        height:45vh;
        background: #fff;
        padding: 2.5vh 2vw ;
        border-radius: 1vh;
        box-shadow: 0px 0px 9px #000000bd;
    }
    .img{
        width: 3.5vw;
        height: 3.5vw;
        background: url("../assets/img/login/logo.png") center no-repeat;
        background-size: 100%;
        margin: 0 auto;
    }
    .til{
        font-size: 1.4vw;
        font-family: 'MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI';
        font-weight: bolder;
        color: #1470CC;
        line-height: 6vh;
        letter-spacing: 2px;
        text-align: center;
        margin-bottom: 3vh;
    }
    .loginbtn{
        width: 100%;
        padding: 1.2vh 0;
        border-radius: 3px;
    }
    ::v-deep .el-input--small .el-input__inner{
        height: 4.5vh;
        line-height: 4.5vh;
    }
    ::v-deep  .el-form-item{
        margin-bottom: 2.2vh;
    }
    .clear{
        color: #fff;
        display: block;
    }
</style>