<template>
    <div class="container">
        <div class="title">添加商品</div>
        <div class="form-group">
            <el-form :label-position="labelPosition" label-width="80px" :model="goodsForm">
                <el-form-item label="商品名称">
                    <el-input v-model="goodsForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:8080/goods/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="goodsForm.thumbnail" :src="goodsForm.thumbnail" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="goodsForm.size"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" class="produce-date">
                    <el-date-picker
                    v-model="goodsForm.produce_date"
                    type="date"
                    :editable="false"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品条码">
                    <el-input v-model="goodsForm.barcode"></el-input>
                </el-form-item>
                <el-form-item label="生产批次">
                    <el-select v-model="goodsForm.batch" placeholder="请选择生产批次" class="select-batch">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="第一批" value="第一批"></el-option>
                        <el-option label="第二批" value="第二批"></el-option>
                        <el-option label="第三批" value="第三批"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生产数量">
                    <el-input v-model="goodsForm.nums"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-form-item>
                        <el-input type="textarea" v-model="goodsForm.note" rows="5"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script style="text/ecmascript-6">
    import {Form,FormItem,Input,Upload,DatePicker,Select,Option,Button} from "element-ui"

    export default {
        name: "AddGoods",
        data(){
            return{
                labelPosition: 'right',
                goods_id:"",
                goodsForm:{
                    name:"",
                    thumbnail:"",
                    size:"",
                    produce_date:"",
                    barcode:"",
                    batch:"",
                    nums:"",
                    note:""
                }
            }
        },
        components:{
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Upload.name]:Upload,
            [DatePicker.name]:DatePicker,
            [Select.name]:Select,
            [Option.name]:Option,
            [Button.name]:Button
        },
        methods:{
            handleAvatarSuccess(res){
                this.goodsForm.thumbnail = "http://127.0.0.1:8080"+res.path;
            },
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    alert('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    alert('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onSubmit(){
                var d = new Date(this.goodsForm.produce_date);  
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                this.goodsForm.produce_date = datetime;
                let param = new URLSearchParams(this.goodsForm)

                if(this.goods_id){
                    this.$http.updateGoods(this.goods_id,param).then(res => {
                        res
                        this.$router.push("/")
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    this.$http.addGoods(param).then(res => {
                        res
                        this.$router.push("/")
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        mounted(){
            this.goods_id = this.$route.query.goods_id;
            if(this.goods_id){
                this.$http.lookGoods(this.goods_id).then(res => {
                    const data = res.data
                    this.goodsForm = {
                        name:data.name,
                        thumbnail:data.thumbnail,
                        size:data.size,
                        produce_date:data.produce_date,
                        barcode:data.barcode,
                        batch:data.batch,
                        nums:data.nums,
                        note:data.note
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .title{
        font-size: 30px;
        font-weight: 800;
        margin-bottom: 20px;
        padding-bottom: 10px;
        box-sizing: border-box;
        border-bottom: 1px #ccc solid;
    }
    .form-group{
        width:400px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 55px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .select-batch{
        width:320px;
    }

    
</style>

<style scoped>
    .avatar-uploader >>> .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader >>> .el-upload:hover {
        border-color: #409eff;
    }

    .produce-date >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:320px;
    }
</style>