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
                <el-option key="3" label="3" :value="3"> </el-option>
                <el-option key="6" label="6" :value="6"> </el-option>
                <el-option key="9" label="9" :value="9"> </el-option>
                <el-option key="12" label="12" :value="12"> </el-option>
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
let allData = [
  [
    119.73, 119.68, 119.52, 124.93, 0.109, 20, 30, 40, 50, 60, 70, 80, 90,
    123.43, 120.0, 119.96, 120.82, 119.53, 119.86, 119.84,
  ],
  [
    124.93, 0.109, 20, 30, 40, 50, 60, 70, 80, 90, 123.43, 120.0, 119.96,
    120.82, 119.53, 119.86, 119.84, 119.73, 119.68, 119.52,
  ],
  [
    38.633, 38.535, 38.469, 38.379, 38.297, 38.223, 38.125, 38.062, 37.977,
    37.969, 37.887, 37.902, 37.965, 38.047, 38.18, 38.203, 38.367, 38.406,
    38.457, 38.629,
  ],
  [
    43.039, 43.043, 43.039, 43.0, 42.957, 42.887, 42.879, 42.879, 42.875,
    42.809, 42.805, 42.852, 42.867, 42.867, 42.934, 42.961, 43.027, 43.027,
    43.125, 43.121,
  ],
  [
    20.857, 21.052, 21.039, 20.926, 20.912, 20.989, 20.882, 20.596, 20.465,
    20.604, 20.672, 20.453, 20.479, 20.621, 20.717, 20.342, 20.777, 21.54,
    21.419, 21.565,
  ],
];

let op = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["PS1", "PS2", "TS1", "TS2", "CE"],
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
    name: "时间",
    boundaryGap: false,
    data: (() => {
      let r = [];
      for (let i = 0; i < 20; i++) {
        r.push(i + "s");
      }
      return r;
    })(),
  },
  yAxis: {
    type: "value",
    name: "值",
  },
  series: [
    {
      name: "PS1",
      type: "line",
      data: [
        150.48, 191.14, 191.14, 191.2, 191.11, 191.15, 191.17, 191.25, 191.06,
        191.11, 151.14, 145.99, 145.81, 146.19, 145.32, 145.62, 145.73, 145.52,
        145.38, 145.3,
      ],
    },
    {
      name: "PS2",
      type: "line",

      data: [
        124.93,
        0.109,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        123.43,
        120.0,
        119.96,
        120.82,
        119.53,
        119.86,
        119.84,
        119.73,
        119.68,
        119.52,
      ],
    },
    {
      name: "TS1",
      type: "line",
      data: [
        38.633, 38.535, 38.469, 38.379, 38.297, 38.223, 38.125, 38.062, 37.977,
        37.969, 37.887, 37.902, 37.965, 38.047, 38.18, 38.203, 38.367, 38.406,
        38.457, 38.629,
      ],
    },
    {
      name: "TS2",
      type: "line",
      data: [
        43.039, 43.043, 43.039, 43.0, 42.957, 42.887, 42.879, 42.879, 42.875,
        42.809, 42.805, 42.852, 42.867, 42.867, 42.934, 42.961, 43.027, 43.027,
        43.125, 43.121,
      ],
    },
    {
      name: "CE",
      type: "line",
      data: [
        21.54, 21.419, 21.565, 20.857, 21.052, 21.039, 20.926, 20.912, 20.989,
        20.882, 20.596, 20.465, 20.604, 20.672, 20.453, 20.479, 20.621, 20.717,
        20.342, 20.777,
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
          value: "PS1",
          label: "PS1",
        },
        {
          value: "PS2",
          label: "PS2",
        },
        {
          value: "PS3",
          label: "PS3",
        },
        {
          value: "PS4",
          label: "PS4",
        },
        {
          value: "PS5",
          label: "PS5",
        },
        {
          value: "EPS1",
          label: "EPS1",
        },
        {
          value: "FS1",
          label: "FS1",
        },
        {
          value: "FS2",
          label: "FS2",
        },
        {
          value: "TS1",
          label: "TS1",
        },
        {
          value: "TS2",
          label: "TS2",
        },
        {
          value: "TS3",
          label: "TS3",
        },
        {
          value: "TS4",
          label: "TS4",
        },
        {
          value: "VS1",
          label: "VS1",
        },
        {
          value: "SE",
          label: "SE",
        },
        {
          value: "CE",
          label: "CE",
        },
        {
          value: "CP",
          label: "CP",
        },
      ],
      options2: [
        {
          value: "数据集1",
          label: "数据集1",
        },
        {
          value: "数据集2",
          label: "数据集2",
        },
        {
          value: "数据集3",
          label: "数据集3",
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
      op.series[1].data = [
        124.93, 0.109, 20, 30, 40, 50, 60, 70, 80, 90, 123.43, 120.0, 119.96,
        120.82, 119.53, 119.86, 119.84, 119.73, 119.68, 119.52,
      ];
      this.myecharts.setOption(op);
    },
    predict() {
      // allData.forEach((one, index) => {
      //   let d = one.splice(0, this.form2.value);
      //   console.log(one);
      //   one.splice(one.length, 0, d);
      //   op.series[index].data = one;
      //   console.log(one);
      // });
      op.series[0].data = [
        191.2, 191.11, 191.15, 191.17, 191.25, 191.06, 191.11, 151.14, 145.99,
        145.81, 146.19, 145.32, 145.62, 145.73, 145.52, 145.38, 145.3, 150.48,
        191.14, 191.14,
      ];
      op.series[1].data = [
        30, 40, 50, 60, 70, 80, 90, 123.43, 120.0, 119.96, 120.82, 119.53,
        119.86, 119.84, 119.73, 119.68, 119.52, 124.93, 0.109, 20,
      ];
      op.series[2].data = [
        38.379, 38.297, 38.223, 38.125, 38.062, 37.977, 37.969, 37.887, 37.902,
        37.965, 38.047, 38.18, 38.203, 38.367, 38.406, 38.457, 38.629, 38.633,
        38.535, 38.469,
      ];
      op.series[3].data = [
        43.0, 42.957, 42.887, 42.879, 42.879, 42.875, 42.809, 42.805, 42.852,
        42.867, 42.867, 42.934, 42.961, 43.027, 43.027, 43.125, 43.121, 43.039,
        43.043, 43.039,
      ];
      op.series[4].data = [
        20.857, 21.052, 21.039, 20.926, 20.912, 20.989, 20.882, 20.596, 20.465,
        20.604, 20.672, 20.453, 20.479, 20.621, 20.717, 20.342, 20.777, 21.54,
        21.419, 21.565,
      ];
      op.xAxis.data = (() => {
        let r = [];
        for (let i = this.form2.value; i < 20 + this.form2.value; i++) {
          r.push(i + "s");
        }
        return r;
      })();
      op.series[0].markArea = {
        itemStyle: {
          color: "rgba(255, 173, 177, 0.4)",
        },
        data: [
          [
            {
              name: "预测的数值",
              xAxis: 20 + "s",
            },
            {
              xAxis: 19 + this.form2.value + "s",
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
