<template>
  <div class="parent">
    <div id="Prizes" class="child">
      <el-form ref="form" :model="form" label-position="top" label-width="100px">
        <el-form-item label="奖品: ">
          {{form.prize_name}} X {{form.prize_number}}
        </el-form-item>
        <el-form-item label="发起人: ">
          <span>{{form.initiator}}</span>
        </el-form-item>
          <el-button type="primary" @click="participate" v-if="already_paticipant">立即参与</el-button>
          <el-button type="success" disabled v-if="!already_paticipant">已参加</el-button>
          <el-table :data="participants" style="width: 100%" height="250">
            <el-table-column label="已参与" align="center" prop="address"></el-table-column>
          </el-table>
          <el-button type="primary" @click="draw" v-if="is_initiator">现在开奖</el-button>
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
        prize_name: "123",
        prize_number: 1,
        initiator:
          "0xa00a2d0d10ce8a2ea47a76fbb935405df2a12b0e2bc932f188f84b5f16da9c2c"
      },
      already_paticipant: true,
      participants: [],
      is_initiator: false,
    };
  },
  beforeCreate: function() {
    setInterval(() => {
      var accounts = getAccounts();
      if (accounts[0] == this.form.initiator) {
        this.is_initiator = true;
      }
    }, 1000);
    // setInterval(() => {
    //   var contractInc = getContractInc();
    //   var accounts = getAccounts();
    //   contractInc.participants.call({from:accounts[0]}).then((res)=>{
    //     console.log(res)
    //   })
    // },2000);
  },
  methods: {
    participate() {
      var contractInc = getContractInc();
      var accounts = getAccounts();
      contractInc.participate({ from: accounts[0] }).then(
        res => {
          console.log("txhash", res);
          var txhash = res;
          newBlockFilter(aionweb3, 2, 60000).then(
            res => {
              var result = aionweb3.eth.getTransactionReceipt(txhash);
              this.already_paticipant = false;
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
    },
    draw(){
      var contractInc = getContractInc();
      var accounts = getAccounts();
      contractInc.draw({ from: accounts[0] }).then(
        res => {
          console.log("txhash", res);
          var txhash = res;
          newBlockFilter(aionweb3, 2, 60000).then(
            res => {
              var result = aionweb3.eth.getTransactionReceipt(txhash);
              this.already_paticipant = false;
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
    }
  }
};
</script>
