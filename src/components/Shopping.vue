<template>
  <div class="container">
    <el-container class="shop-container">
        <el-header class="header">
            <div class="shop-title">商品管理平台</div>
            <div class="shop-content">欢迎来到商品管理平台</div>
        </el-header>
        <el-container class="aside-container">
            <el-aside width="200px" class="aside">
                <el-row>
                    <el-col :span="24">
                        <el-menu
                        default-active="/"
                        class="aside-menu"
                        background-color="#545c64"
                        text-color="#fff"
                        :router="true"
                        active-text-color="#ffd04b">
                            <el-menu-item index="/">
                                <i class="el-icon-menu"></i>
                                <span slot="title">商品列表</span>
                            </el-menu-item>
                            <el-menu-item index="/add">
                                <i class="el-icon-folder-add"></i>
                                <span slot="title">增加商品</span>
                            </el-menu-item>
                            <el-menu-item index="/search">
                                <i class="el-icon-search"></i>
                                <span slot="title">搜索商品</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer">Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
  </div>
</template>

<script>
    import {Container,Header,Aside,Main,Footer,Menu,MenuItem,MenuItemGroup,Submenu,Col,Row} from "element-ui"

    export default {
        name: 'Shopping',
        props: {
            
        },
        components:{
            [Container.name]:Container,
            [Header.name]:Header,
            [Aside.name]:Aside,
            [Main.name]:Main,
            [Footer.name]:Footer,
            [Menu.name]:Menu,
            [MenuItem.name]:MenuItem,
            [MenuItemGroup.name]:MenuItemGroup,
            [Submenu.name]:Submenu,
            [Col.name]:Col,
            [Row.name]:Row
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .shop-container{
        height: 100vh;
    }
    .aside-menu{
        height:92vh;
    }
    // .aside-container{
    //     height: 100vh;
    // }
    .header{
        background-color: #008d4c;
        display:flex;

        .shop-title{
            background-color: #006400;
            width:200px;
            height: 60px;
            color: #fff;
            font-size: 20px;
            font-weight: 200;
            text-align: center;
            line-height: 60px;
            margin-left: -20px;
        }

        .shop-content{
            display: flex;
            flex:1;
            justify-content: space-around;
            align-items: center;
            font-size: 22px;
            font-weight: 400;
            color:#fff;
        }
    }
    .aside{
        background-color: gray;
    }
    .main{
        background-color: #fff;
    }
    .footer{
        background: #ccc;
    }
</style>
