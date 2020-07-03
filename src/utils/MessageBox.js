import {MessageBox} from "element-ui"

class spMessage{
    DeleteGoods(){
        this.messageBox = MessageBox.confirm("您确定要删除该商品吗？","提示",{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        return this.messageBox;
    }
}

export default new spMessage();