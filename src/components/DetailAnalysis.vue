<template lang="html">
  <div class="content-wrap">
    <div class="purchase-detail">
      <h2>流量分析</h2>
      <p>流量分析是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      <ul class="detail-info">
        <li>
          <span>购买数量：</span>
          <counter @receiveData="receiveData"></counter>
        </li>
        <li>
          <span>产品类型：</span>
          <dropdown-selection @receiveData="receiveData"
          :selections="['入门版','中级版','高级版']"
          dataName="productType">
          </dropdown-selection>
        </li>
        <li>
          <span>有效时间：</span>
          <selection @receiveData="receiveData"
          :multiple="false"
          dataName="validTime"
          :options="['半年','一年','三年']"></selection>
        </li>
        <li>
          <span>产品版本：</span>
          <selection @receiveData="receiveData"
          dataName="productVersion"
          :options="['客户版','代理商版','专家版']"></selection>
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
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
    <ul>
      <li><h3>用户行为指标</h3></li>
      <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
      <li>用户在网站的停留时间；</li>
      <li>用户来源网站（也叫“引导网站”）；</li>
      <li>用户所使用的搜索引擎及其关键词；</li>
      <li>在不同时段的用户访问量情况等。</li>
    </ul>
    <ul>
      <li><h3>浏览网站方式</h3></li>
      <li>用户上网设备类型</li>
      <li>用户浏览器的名称和版本</li>
      <li>访问者电脑分辨率显示模式</li>
      <li>用户所使用的操作系统名称和版本</li>
      <li>用户所在地理区域分布状况等</li>
    </ul>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter'
import DropdownSelection from '@/components/DropdownSelection'
import Selection from '@/components/Selection'
export default {
  name: 'DetailAnalysis',
  components: {
    Counter,
    DropdownSelection,
    Selection
  },
  data() {
    return {
      purchaseNum: 1,
      business: '入门版',
      versions: ['客户版'],
      validTime: 1,
      priceMap: {
        "入门版": {
          "客户版": 10,
          "代理商版": 100,
          "专家版": 1000
        },
        "中级版": {
          "客户版": 20,
          "代理商版": 200,
          "专家版": 2000
        },
        "高级版": {
          "客户版": 30,
          "代理商版": 300,
          "专家版": 3000
        }
      }
    }
  },
  methods: {
    receiveData(data, from) {
      switch (from) {
        case 'counter':
          this.purchaseNum = data;
          break;
        case 'productType':
          this.business = data;
          break;
        case 'productVersion':
          this.versions = data;
          break;
        case 'validTime':
          switch (data[0]) {
            case '半年':
              this.validTime = 1;
              break;
            case '一年':
              this.validTime = 1.5;
              break;
            case '三年':
              this.validTime = 5.5;
            default:
          }
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
      return this.purchaseNum *this.validTime* basePrice;
    }
  }
}
</script>

<style lang="less" scoped>
.production-state {
    ul {
        margin-top: 20px;
        li {
            margin: 5px 0;
            font-size: 14px;
        }
    }
}

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
    &:hover {
        box-shadow: inset 0 0 10px white;
    }
    &:active {
        box-shadow: 0 0 5px #4fc08d;
    }
}
</style>
