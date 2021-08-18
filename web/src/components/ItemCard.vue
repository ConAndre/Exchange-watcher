<template>
  <div>
    <MDBCard style="width: 18rem">
      <MDBCardImg top :src="iconLarge" :alt="`Picture of ${name}`" />
      <MDBCardBody>
        <MDBCardTitle>
          <img width="32" height="32" class="mr-3" :src="icon" /> {{ name }}</MDBCardTitle
        >
        <MDBCardText>
          {{ description }}
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem><b>Price</b>: {{ currentPrice }}</MDBListGroupItem>
        <MDBListGroupItem style="border: none"
          ><span class="text-center d-block trends">Trends</span></MDBListGroupItem
        >
        <MDBListGroupItem
          ><b>0 Days</b>:
          <span :style="trendColor(todayPrice)">{{ todayPrice }}</span></MDBListGroupItem
        >
        <MDBListGroupItem
          ><b>30 Days</b>:
          <span :style="trendColor(change30)">{{ change30 }}</span></MDBListGroupItem
        >
        <MDBListGroupItem
          ><b>90 Days</b>:
          <span :style="trendColor(change90)">{{ change90 }}</span></MDBListGroupItem
        >
        <MDBListGroupItem
          ><b>180 Days</b>:
          <span :style="trendColor(change180)">{{ change180 }}</span></MDBListGroupItem
        >
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href="#">Card link</MDBCardLink>
        <MDBCardLink href="#">Another link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script>
const loader = require('@/assets/spinner.svg');
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImg,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-vue-ui-kit';
export default {
  name: 'itemCard',
  props: {
    item: { type: Object, default: () => {} },
  },
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImg,
    MDBListGroup,
    MDBListGroupItem,
  },
  computed: {
    hasItem() {
      return !!Object.values(this.item).length;
    },
    name() {
      return this.item.name || 'Loading...';
    },
    description() {
      return this.item.description || 'Loading...';
    },
    iconLarge() {
      return this.item.icon_large || loader;
    },
    icon() {
      return this.item.icon || loader;
    },
    currentPrice() {
      return this.item.current && this.item.current.price ? this.item.current.price : 'N/A';
    },
    todayPrice() {
      return this.item.today && this.item.today.price ? this.item.today.price : 'N/A';
    },
    change30() {
      return this.item.day30 && this.item.day30.change ? this.item.day30.change : 'N/A';
    },
    change90() {
      return this.item.day90 && this.item.day90.change ? this.item.day90.change : 'N/A';
    },
    change180() {
      return this.item.day180 && this.item.day180.change ? this.item.day180.change : 'N/A';
    },
  },
  methods: {
    trendColor(i) {
      i = String(i);
      const style = 'color: ';
      const color = i.indexOf('-') === -1 ? 'green' : 'red';
      return style + color;
    },
  },
};
</script>

<style>
</style>