<template>
  <div>
    <div class="title">加载数据</div>
    <div style="">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择数据">
          <el-select
            v-model="form.value2"
            multiple
            placeholder="请选择数据集"
            style="width: 100%"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择维度">
          <el-select
            v-model="form.value1"
            multiple
            placeholder="请选择维度"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date3"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date4"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <div style="text-align: left">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="title">数据渲染</div>
    <div id="echarts" style="width: 100%; height: 300px"></div>
    <div class="title">操作</div>
    <el-tabs type="border-card">
      <el-tab-pane label="数据补全">
        <div style="text-align: left">
          <el-button type="primary" @click="add">开始补全</el-button>
        </div></el-tab-pane
      >
      <el-tab-pane label="数据预测">
        <div style="text-align: left">
          <el-form ref="form2" :model="form2" label-width="80px">
            <el-form-item label="选择步长">
              <el-select v-model="form2.value" placeholder="请选择步长">
                <el-option key="3" label="3" value="3"> </el-option>
                <el-option key="6" label="6" value="6"> </el-option>
                <el-option key="9" label="9" value="9"> </el-option>
                <el-option key="12" label="12" value="12"> </el-option>
              </el-select>
            </el-form-item>
            <div style="text-align: left">
              <el-form-item>
                <el-button type="primary" @click="predict">预测</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.el-upload {
  width: 100%;
}
.el-upload-dragger {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-dialog--center .el-dialog__body {
  text-align: center;
}

.title {
  width: 100%;
  height: 32px;
  border-bottom: 1px solid black;
  margin: 10px 0px 30px 0px;
  padding: 10px;
  line-height: 32px;
  text-align: left;
  font-size: 20px;
  font-weight: bolder;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.block {
  width: 100px;
  height: 30px;
}
.danger {
  border: 1px solid red;
}
</style>

<script>
let op = {
  title: {
    text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["温度", "湿度", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {},
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "温度",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, , 90, 230, 210, 120, 132, 101, , 90, 230, 210],
    },
    {
      name: "湿度",
      type: "line",
      stack: "Total",
      data: [
        220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310,
      ],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [
        150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410,
      ],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [
        320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320,
      ],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [
        820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330,
        1320,
      ],
    },
  ],
};

export default {
  data() {
    return {
      myecharts: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value1: [],
        value2: "",
      },
      form2: {
        value: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.draw();
    },
    draw() {
      let mycharts = this.echarts.init(document.querySelector("#echarts"));
      this.myecharts = mycharts;
      mycharts.setOption(op);
    },
    add() {
      op.series[0].data = [
        120, 132, 101, 200, 90, 230, 210, 120, 132, 101, 200, 90, 230, 210,
      ];
      this.myecharts.setOption(op);
    },
    predict() {
      op.series[0].data = [
        120, 132, 101, 200, 90, 230, 210, 120, 132, 101, 200, 90, 230, 210, 120,
        132, 101, 200, 90, 230, 210, 120, 132, 101, 200, 90, 230, 210,
      ];
      op.series[1].data = [
        220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310,
        220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310,
      ];
      op.series[2].data = [
        150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410,
        150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410,
      ];
      op.series[3].data = [
        320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320,
        320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320,
      ];
      op.series[4].data = [
        820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330,
        1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
        1330, 1320,
      ];
      op.xAxis.data = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat3",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri2",
        "Sat",
        "Sun",
      ];
      op.series[0].markArea = {
        itemStyle: {
          color: "rgba(255, 173, 177, 0.4)",
        },
        data: [
          [
            {
              name: "预测的数值",
              xAxis: "Sat3",
            },
            {
              xAxis: "Fri2",
            },
          ],
        ],
      };
      this.myecharts.setOption(op);
    },
  },
  mounted() {},
  created() {},
};
</script>
