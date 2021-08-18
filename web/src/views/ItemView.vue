<template>
  <div>
    <div class="row gx-0">
      <div class="col-7">
        <div>hi</div>
      </div>
      <div class="col-3">
        <div v-if="hasItem">
          <MDBCard style="width: 18rem">
            <MDBCardImg top :src="item.icon_large" alt="..." />
            <MDBCardBody>
              <MDBCardTitle> <img class="mr-3" :src="item.icon" /> {{ item.name }}</MDBCardTitle>
              <MDBCardText>
                {{ item.description }}
              </MDBCardText>
            </MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem><b>Price</b>: {{ item.current.price }}</MDBListGroupItem>
              <MDBListGroupItem style="border: none"
                ><span class="text-center d-block trends">Trends</span></MDBListGroupItem
              >
              <MDBListGroupItem
                ><b>0 Days</b>:
                <span :style="trendColor(item.today.price)">{{
                  item.today.price
                }}</span></MDBListGroupItem
              >
              <MDBListGroupItem
                ><b>30 Days</b>:
                <span :style="trendColor(item.day30.change)">{{
                  item.day30.change
                }}</span></MDBListGroupItem
              >
              <MDBListGroupItem
                ><b>90 Days</b>:
                <span :style="trendColor(item.day90.change)">{{
                  item.day90.change
                }}</span></MDBListGroupItem
              >
              <MDBListGroupItem
                ><b>180 Days</b>:
                <span :style="trendColor(item.day180.change)">{{
                  item.day180.change
                }}</span></MDBListGroupItem
              >
            </MDBListGroup>
            <MDBCardBody>
              <MDBCardLink href="#">Card link</MDBCardLink>
              <MDBCardLink href="#">Another link</MDBCardLink>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
  name: 'itemView',
  props: {
    id: { type: String, default: '' },
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
  data() {
    return {
      item: {},
      loaded: true,
    };
  },
  async mounted() {
    this.loaded = false;
    const { data } = await axios.get(`public/item/${this.id}`);
    this.item = data;
    this.loaded = true;
  },
  computed: {
    hasItem() {
      return !!Object.values(this.item).length;
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

<style scoped>
.trends {
  color: gray;
}
</style>