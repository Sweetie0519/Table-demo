<template>
    <table class="table table-bordered table-striped">
        <!-- 表格的标题区域 -->
        <thead>
            <tr>
                <!-- 具名插槽 -->
                <slot name="header"></slot> 
            </tr>
        </thead>
        <!-- 表格的主体区域 -->
        <tbody>
            <!-- 使用v-for指令，循环渲染表格的数据行 -->
            <tr v-for="(item,index) in data" :key="item.id">
            <!-- 为数据行的td预留的"作用域插槽" -->
            <!-- row  当前行      index  当前行的索引 -->
            <slot name="body" :row="item" :index="index"></slot>
            </tr>
        </tbody>
    </table>
    
</template>
<script>
export default {
    name: 'MyTable',

    props: {
        // 表格的数据源
        data:{ 
            type: Array,
            //必填项 
            required: true,
            default:[],
        }
    }
}
</script>
<style lang="less" scoped> 

</style>