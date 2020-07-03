<template>
    <div class="container">
        <div class="shop-title">搜索商品</div>
        <div class="search-group">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input v-model="query"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="goods-list">
            <template>
                <el-table
                    :data="goodsList"
                    border
                    @selection-change="rowClick"
                    :fit="true"
                    style="width: 100%">
                    <el-table-column
                    type="selection">
                    </el-table-column>
                        <el-table-column
                        prop="name"
                        label="商品名称">
                        </el-table-column>
                        <el-table-column
                        prop="size"
                        label="规格">
                        </el-table-column>
                        <el-table-column
                        prop="barcode"
                        label="主条码">
                        </el-table-column>
                        <el-table-column
                        prop="produce_date"
                        label="生产日期">
                        </el-table-column>
                        <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="LookGooods(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="UpdateGoods(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="DeleteGoods(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                </el-table>
            </template>
            <div class="pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="page_size"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <div class="btn-group">
                <el-button type="danger" class="danger-delete">批量删除</el-button>
                <el-button type="primary" class="add-btn">增加商品</el-button>
            </div>
        </div>
    </div>
</template>

<script style="text/ecmascript-6">
    import {Form,FormItem,Button,Input,Table,TableColumn,Pagination} from "element-ui"

    export default {
        name: "SearchGoods",
        data(){
            return{
                query:"",
                currentPage:1,
                total:0,
                page_size:0,
                goodsList:[]
            }
        },
        components:{
            [Form.name]:Form,
            [Button.name]:Button,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Table.name]:Table,
            [TableColumn.name]:TableColumn,
            [Pagination.name]:Pagination
        },
        methods:{
            DeleteGoods(row){
                console.log(row)
                this.$messageBox.DeleteGoods().then(() => {
                    this.$http.DeleteGoods(row.id).then(res => {
                        res
                        this.$message.success();
                        window.location.reload();
                    }).catch(err => {
                        err
                        this.$message.info("删除失败")
                    })
                }).catch(() => {
                    this.$message.info("删除失败")
                })
            },
            LookGooods(row){
                this.$router.push("/detail/"+row.id);
            },
            UpdateGoods(row){
                this.$router.push({name:"addGoods",query:{"goods_id":row.id}})
            },
            onSubmit(){
                this.$load.show();
                this.searchGoods(this.query);
            },
            rowClick(selection){
                // console.log(selection);
                selection
            },
            handleCurrentChange(page){
                this.currentPage = page;
                console.log(this.currentPage)
            },
            searchGoods(q){
                this.$http.searchGoods(q).then(res => {
                    this.goodsList = res.data.data;
                    this.total = res.data.total;
                    this.page_size = res.data.page_size;
                    this.$load.hide();
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .shop-title{
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        font-weight: 800;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
    .search-group{
        // padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
    .title{
        font-weight: 800;
        font-size: 30px;
        color:#000;
        padding: 20px;
    }
    .btn-group{
        display: flex;
        margin-top: 30px;
        justify-content: space-around;
        align-items: center;
    }
    .pagination{
        text-align: center;
        margin:20px 0;
    }
</style>