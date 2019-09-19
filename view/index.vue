<template>
  <div>
    <div class="has-success">
      <label class="control-label col-lg-4">
        <h4>模版</h4>
      </label>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-body">
              <el-form :inline="true" :model="form">
                <el-form-item>
                  <el-input v-model="form.data" placeholder="请输入搜索内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="() => handleSearch()">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handleReset">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="handleAdd">新建</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-xs-12">
          <div class="panel panel-default">
            <div class="panel-body">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="page_count"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                class="ui-pagination"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from "@/api/{{{api}}}";

const setLocalStorage = param => window.localStorage.setItem('GM_KEY', JSON.stringify(param))

export default {
  inject: ["reload"],
  data() {
    return {
      form: {
        data: ""
      },
      page_count: 1,
      tableData: null,
      requestData: null,
      pageSize: 20, // 请求数据条数
      total: 0, // 总数
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`页数:${val}`)
    },
    handleSearch() {
      if (this.form.data == '') {
        return 
      }

      this.$alert(
        `${this.form.data}`,
        '搜索',
        { confirmButtonText: '确定' }
      )
    },
    handleEdit(row) {
      const { id } = row;
      const targetParam = this.requestData.filter(item => item.id == id);
      setLocalStorage(targetParam[0]);
      this.$router.push({ name: "detail", params: { id } });
    },
    handleDelete(row) {
      const { id } = row
      this.tableData = this.tableData.filter(i => i.id != id)
    },
    handleAdd() {
      this.$router.push({ name: "detail", params: { id: 0 } });
    },
    handleReset() {
      this.form.data = "";
    },
    dealList(ret) {
      console.log('处理数据')
      this.tableData = [
        {
          id: 1,
          name: "测试1",
          age: 18
        },
        {
          id: 2,
          name: "测试2",
          age: 19
        }
      ]
      this.requestData = this.tableData
      this.total = this.tableData.length
    },
    initList() {
      console.log('初始化列表')
      this.dealList()
    }
  },
  created() {
    this.initList()
  },
};
</script>
