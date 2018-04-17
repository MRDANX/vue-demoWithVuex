<template lang="html">
  <div class="content-wrap">
    <div class="purchase-detail">
      <h2>数据统计</h2>
      <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      <ul class="detail-info">

        <li>
          <span>产品类型：</span>
          <selection @receiveData="receiveData"
          :multiple="false"
          :options="['红色版','绿色版','紫色版']"
          dataName="productType"></selection>
        </li>
        <li>
          <span>适用地区：</span>
          <dropdown-selection @receiveData="receiveData"
          :selections="['北京','上海','广州','天津','武汉','重庆']"
          dataName="district">
          </dropdown-selection>
        </li>
        <li>
          <span>有效时间：</span>
          <span  style="margin-left: 20px;">半年</span>
        </li>
        <li>
          <span>总价：</span>
          <span style="margin-left: 20px;">{{totalPrice}} 元</span>
        </li>
        <li>
          <button type="button" class="purchase">立即购买</button>
        </li>
      </ul>
    </div>
    <div class="production-state">
      <h2>产品说明</h2>
      <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      <table>
        <tr>
          <td>安全安保</td>
          <td>办公文教</td>
          <td>彩票</td>
          <td>车辆物流</td>
          <td>成人用品</td>
          <td>出版传媒</td>
          <td>电脑硬件</td>
        </tr>
        <tr>
          <td>电子电工</td>
          <td>房地产建筑装修</td>
          <td>分类平台</td>
          <td>服装鞋帽</td>
          <td>箱包饰品</td>
          <td>化工原料制品</td>
          <td>机械设备</td>
        </tr>
        <tr>
          <td>家庭日用品</td>
          <td>家用电器</td>
          <td>教育培训</td>
          <td>节能环保</td>
          <td>金融服务</td>
          <td>礼品</td>
          <td>旅游住宿</td>
        </tr>
        <tr>
          <td>美容化妆</td>
          <td>母婴护理</td>
          <td>农林牧渔</td>
          <td>软件</td>
          <td>商务服务</td>
          <td>生活服务</td>
          <td>食品保健品</td>
        </tr>
        <tr>
          <td>手机数码</td>
          <td>通讯服务设备</td>
          <td>网络服务</td>
          <td>医疗服务</td>
          <td>游戏</td>
          <td>运动休闲娱乐</td>
          <td>招商加盟</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import DropdownSelection from '@/components/DropdownSelection'
import Selection from '@/components/Selection'
export default {
  name: 'DetailStatistics',
  data() {
    return {
      productType: '红色版',
      district: '北京',
      priceMap: {
        "红色版": {
          "北京": 100,
          "上海": 90,
          "广州": 80,
          "天津": 70,
          "武汉": 60,
          "重庆": 50
        },
        "绿色版": {
          "北京": 200,
          "上海": 180,
          "广州": 160,
          "天津": 140,
          "武汉": 120,
          "重庆": 100
        },
        "紫色版": {
          "北京": 300,
          "上海": 270,
          "广州": 240,
          "天津": 210,
          "武汉": 180,
          "重庆": 150
        }
      }
    }
  },
  components: {
    DropdownSelection,
    Selection
  },
  methods: {
    receiveData(data, from) {
      switch (from) {
        case 'productType':
          this.productType = data;
          break;
        case 'district':
          this.district = data;
          break;
        default:
      }
    }
  },
  computed: {
    totalPrice() {
      return this.priceMap[this.productType][this.district];
    }
  }
}
</script>

<style lang="less" scope>
button.purchase {
    width: 100px;
    height: 35px;
    outline: none;
    border: none;
    background-color: #4fc08d;
    color: white;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
    margin-left: 100px;
    cursor: pointer;
    &:hover{
      box-shadow: inset 0 0 10px white;
    }
    &:active{
      box-shadow: 0 0 5px #4fc08d;
    }
}
</style>
