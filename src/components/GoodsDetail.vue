<template>
    <div class="container">
        <div class="title">商品详情</div>
        <div class="form-group">
            <el-form :label-position="labelPosition" label-width="80px" :model="goodsForm">
                <el-form-item label="商品名称">
                    <el-input v-model="goodsForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        class="avatar-uploader"
                        :disabled="true"
                        action="http://127.0.0.1:8080/goods/upload"
                        :show-file-list="false">
                        <img v-if="goodsForm.thumbnail" :src="goodsForm.thumbnail" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="goodsForm.size"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" class="produce-date">
                    <el-date-picker
                    v-model="goodsForm.produce_date"
                    type="date"
                    :disabled="true"
                    :editable="false"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品条码">
                    <el-input v-model="goodsForm.barcode"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="生产批次">
                    <el-select v-model="goodsForm.batch" placeholder="请选择生产批次" class="select-batch"  :disabled="true">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="第一批" value="第一批"></el-option>
                        <el-option label="第二批" value="第二批"></el-option>
                        <el-option label="第三批" value="第三批"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生产数量">
                    <el-input v-model="goodsForm.nums"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-form-item>
                        <el-input type="textarea" v-model="goodsForm.note" rows="5"  :disabled="true"></el-input>
                    </el-form-item>
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
            getGoodsDetail(id){
                this.$http.lookGoods(id).then(res => {
                    this.goodsForm = res.data;
                    this.$load.hide();
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted(){
            const goods_id = this.$route.params.goods_id;
            this.$load.show()
            this.getGoodsDetail(goods_id)
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