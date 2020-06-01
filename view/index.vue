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

                <el-form-item label="状态">
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="form.startTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">至</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="结束时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="form.endTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
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
              <el-table 
                :data="tableData" 
                border 
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!-- 不需要多选的把下面的 el-table-colum 删除掉，把上面的 @selection-change 删除掉-->
                <el-table-column type="selection" width="55" :selectable="selectInit"></el-table-column>
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
                :current-page.sync="pagination.pageNumber"
                :page-size="pagination.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
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

export default {
  inject: ["reload"], // this.reload() 可刷新页面
  data() {
    return {
      form: {
        data: "",
        status: '',
        startTime: '',
        endTime: '',
      },
      statusOptions: [ // 状态map
        {
          status: '',
          label: '全部'
        },
        {
          status: '0',
          label: '待推送'
        },
        {
          status: '5',
          label: '推送中'
        }
      ],
      pagination: { // 分页相关
        pageNumber: 1, // 请求数据页数
        pageSize: 20, // 请求数据条数
        total: 0, // 总数
      },
      selection: '', // 多选数据
      tableData: null, // table显示数据
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`页数:${val}`);
    },
    handleSearch() {
      console.log(`搜索`);
    },
    handleReset() {
      console.log(`重置`);
    },
    handleEdit(row) {
      const { id } = row;
      this.$router.push({ name: "detail", params: { id } });
    },
    handleAdd() {
      this.$router.push({ name: "detail", params: { id: 0 } });
    },
    handleDelete(row) {
      const { id } = row
      this.tableData = this.tableData.filter(i => i.id != id)
    },
    handleSelectionChange(selectItem) {
      this.selection = selectItem;
    },
    // 处理是否可选
    selectInit(row, index) {
      return true;
    },
    initList() {
      console.log('初始化列表')
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
      this.total = this.tableData.length
    }
  },
  created() {
    this.initList()
  },
};
</script>
