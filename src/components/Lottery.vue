<template>
  <div class="parent">
    <div id="Prizes" class="child">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position="top" >
        <el-form-item label="奖品名称: " prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量: " prop="number">
          <el-input-number v-model="form.number" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="奖品描述: " prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initiate('form')">发起抽奖</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style>
.parent {
  display: flex;
}
.child {
  margin: auto;
  display: table-cell;
  vertical-align: middle;
}
</style>

<script>
import {getContractInc, getAccounts, newBlockFilter} from '../../static/js/app'

export default {
  data() {
    return {
      form: {
        name: "",
        number: 1,
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入奖品名称", trigger: "blur" }],
        number: [
          { required: true, message: "请输入奖品数量", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入奖品描述", trigger: "blur" },
          { min: 0, max: 100, message: "长度100 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    handleChange(value) {
      console.log("current", aionweb3.currentProvider);
    },
    initiate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var name = this.form.name;
          var number = this.form.number;
          var desc = this.form.desc;
          var contractInc = getContractInc();
          var accounts = getAccounts();
          contractInc
            .initiate(name, number, desc, { from: accounts[0] })
            .then(
              res => {
                console.log("txhash", res);
                var txhash = res;
                newBlockFilter(aionweb3, 2, 60000).then(
                  res => {
                    var result = aionweb3.eth.getTransactionReceipt(txhash);
                    if (result.status == "0x1") {
                      this.$router.push({ name: "Draw" });
                    } else {
                      alert("发起失败");
                    }
                  },
                  err => {
                    alert(err);
                  }
                );
              },
              err => {
                alert(err);
              }
            );

          console.log(name, number, desc);
        }
      });
    }
  }
};
</script>