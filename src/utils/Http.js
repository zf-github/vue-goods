import axios from "axios"

class Http{
    constructor(){
        this.http = axios.create({
            baseURL: 'http://127.0.0.1:8080',
            timeout: 1000
        });
    }

    getGoods(page=1){
        const url = "/goods?page=" + page;
        return this.http.get(url);
    }

    addGoods(data){
        const url = "/goods";
        return this.http.post(url,data);
    }

    searchGoods(q){
        const url = "/goods/search?q=" + q;
        return this.http.get(url);
    }

    lookGoods(id){
        const url = "/goods/" + id;
        return this.http.get(url);
    }

    updateGoods(goods_id,data){
        const url = "/goods/" + goods_id
        return this.http.put(url,data)
    }

    DeleteGoods(goods_id){
        const url = "/goods/" + goods_id;
        return this.http.delete(url);
    }

    BatchDelete(data){
        const url = "/goods/delete"
        return this.http.post(url,data)
    }
}

export default new Http();