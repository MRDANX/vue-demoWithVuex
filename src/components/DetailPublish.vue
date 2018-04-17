<template lang="html">
  <div class="content-wrap">
    <div class="purchase-detail">
      <h2>广告发布</h2>
      <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
      <ul class="detail-info">
        <li>
          <span>购买数量：</span>
          <counter @receiveData="receiveData"></counter>
        </li>
        <li>
          <span>行业：</span>
          <dropdown-selection @receiveData="receiveData"
          :dataName="'business'">
          </dropdown-selection>
        </li>
        <li>
          <span>产品版本：</span>
          <selection @receiveData="receiveData"
          dataName="productVersion"></selection>
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
      <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
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
import Counter from '@/components/Counter'
import DropdownSelection from '@/components/DropdownSelection'
import Selection from '@/components/Selection'
export default {
  name: 'DetailPublish',
  data() {
    return {
      purchaseNum: 1,
      business: '出版业',
      versions: ['初级版'],
      priceMap: {
        "出版业": {
          "初级版": 10,
          "中级版": 100,
          "高级版": 500,
          "专家版": 1000
        },
        "媒体": {
          "初级版": 20,
          "中级版": 200,
          "高级版": 1000,
          "专家版": 2000
        },
        "金融": {
          "初级版": 30,
          "中级版": 300,
          "高级版": 1500,
          "专家版": 3000
        },
        "互联网": {
          "初级版": 40,
          "中级版": 400,
          "高级版": 2000,
          "专家版": 4000
        },
        "游戏": {
          "初级版": 50,
          "中级版": 500,
          "高级版": 2500,
          "专家版": 5000
        }
      }
    }
  },
  components: {
    Counter,
    DropdownSelection,
    Selection
  },
  methods: {
    receiveData(data, from) {
      switch (from) {
        case 'counter':
          this.purchaseNum = data;
          break;
        case 'business':
          this.business = data;
          break;
        case 'productVersion':
          this.versions = data;
          break;
        default:
      }
    }
  },
  computed: {
    totalPrice() {
      let basePrice = 0;
      this.versions.forEach((value, index) => {
        basePrice += (this.priceMap[this.business])[value];
      });
      return this.purchaseNum * basePrice;
    }
  }
}
</script>

<style lang="less" scoped>
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
