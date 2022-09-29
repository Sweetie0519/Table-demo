<template>
  <div>
    <h1>App根组件</h1>
    <hr>
    <!-- 使用表格组件 -->
    <MyTable :data="goodslist">
      <template #header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>

      <!-- 表格每行的单元格 -->
      <!-- row  当前行      index  当前行的索引 -->
      <template #body="{row,index}">
        <td>{{index+1}}</td>
        <td>{{row.goods_name}}</td>
        <td>￥{{row.goods_price}}</td>
        <td>
          <input type="text" class="form-control form-control-sm form-ipt" v-if="row.inputVisible" v-focus v-model.trim="row.inputValue" @blur="onInputConfirm(row)" @keyup.enter="onInputConfirm(row)" @keyup.esc="row.inputValue=''">
          <button type="button" class="btn btn-primary btn-sm" v-else @click="row.inputVisible=true">Tag</button>
          <!-- 循环渲染标签信息 -->
          <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{item}}</span>
        </td>
        <td>
          
          <button type="button" class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
        </td>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from './components/my-table/MyTable.vue';
export default {
  name: 'MyApp',
  data() { 
    return {
      // 商品列表数据
      goodslist:[],
    }
  },
  methods: {
    // 初始化商品列表的数据
    // 调用axios发请求，返回的值是promise，则使用asyns  await
    async getGoodsList() { 
      // 发起Ajax请求
      const { data: res } = await this.$http.get('/api/goods')
      // console.log(res);
      // 请求失败
      if (res.status !== 0) return console.log('获取商品失败！');
      // 请求成功
      this.goodslist = res.data
    },
    onRemove(id) { 
      // 根据id删除商品信息
      this.goodslist=this.goodslist.filter(x=>x.id!==id)
    },
    onInputConfirm(row) { 
      const val = row.inputValue
      row.inputValue = ''
      row.inputVisible = false
      // console.log(val);
      // 如果val值为空
      // tags数组是否已经添加过了,已经添加过的不需要在添加
      if (!val || row.tags.indexOf(val) !== -1) return 
      row.tags.push(val)
    }
  },
  directives: {
    focus(el) {
      el.focus()
     }
  },
  created(){
    this.getGoodsList()
  },
  components: {
    MyTable,
  }
}
</script>
<style lang="less" scoped>
  .form-ipt{
    width: 80px;
    display: inline;
  }
</style>
