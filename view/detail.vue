<template>
  <div>
    <div class="has-success">
      <label class="control-label col-lg-4">
        <h4 v-if="isAdd">添加</h4>
        <h4 v-else>编辑</h4>
      </label>
    </div>

    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-body">
              <el-row>
                <el-col :md="24">
                  <el-form
                    :model="form"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="120px"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="name" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button v-if="isAdd" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                      <el-button v-else type="primary" @click="updateForm('ruleForm')">修改</el-button>
                      <el-button @click="handleBack">返回</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from "@/api/{{{api}}}";

const validateName = (rule, value, callback) => {
  if (value == '') {
    return callback(new Error('不能为空'))
  }

  const len = value.replace(/[^\x00-\xff]/g,"01").length
  if (len > 20 || len == 0) {
    callback(new Error("名称不能超过10个汉字"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      name: "detail",
      form: {
        name: '',
      },
      rules: {
        name: [
          { validator: validateName, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    isAdd() {
      return this.$route.params.id == 0;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('update');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
    fillForm() {
      this.form = {
        name: 'sunday'
      };
    }
  },
  created() {
    if (!this.isAdd) {
      this.fillForm();
    }
  }
};
</script>