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
    35.57,
    35.492,
    35.469,
    ,
    ,
    ,
    ,
    35.242,
    35.16,
    35.176,
    35.172,
    35.168,
    35.156,
    35.187,
    35.176,
    35.25,
    35.234,
    35.316,
    35.316,
    35.402,
    35.402,
    35.398,
    35.441,
    35.414,
    35.434,
    35.48,
    35.5,
    35.488,
    35.559,
    35.555,
    35.574,
    35.652,
    35.668,
    35.664,
    35.66,
    35.734,
    35.824,
    35.824,
    35.82,
    35.836,
    35.836,
    ,
    ,
    ,
    ,
    ,
    35.895,
    35.992,
    35.98,
    35.98,
    36.008,
    35.984,
    35.996,
    36.039,
    36.008,
    36.008,
    36.094,
    36.102,
    36.09,
    36.152,
  ],
  [
    40.961, 40.949, 40.965, 40.922, 40.879, 40.879, 40.828, 40.812, 40.809,
    40.785, 40.789, 40.785, 40.773, 40.789, 40.785, 40.773, 40.812, 40.785,
    40.801, 40.809, 40.797, 40.785, 40.828, 40.863, 40.867, 40.879, 40.809,
    40.895, 40.926, 40.949, 40.965, 40.961, 40.984, 41.02, 41.039, 41.043,
    41.043, 41.043, 41.043, 41.059, 41.098, 41.109, 41.121, 41.129, 41.125,
    41.121, 41.129, 41.148, 41.141, 41.18, 41.211, 41.129, 41.195, 41.211,
    41.207, 41.191, 41.207, 41.207, 41.129, 41.254,
  ],
  [
    47.202, 47.273, 47.25, 47.332, 47.213, 47.372, 47.273, 47.438, 46.691,
    46.599, 46.623, 46.653, 46.136, 46.127, 45.948, 45.935, 45.726, 45.139,
    44.978, 44.937, 44.269, 44.079, 43.741, 43.375, 42.847, 42.322, 42.322,
    41.797, 41.406, 40.924, 40.427, 39.857, 39.517, 38.999, 38.493, 37.954,
    37.552, 37.084, 36.615, 36.098, 35.58, 35.141, 34.184, 34.177, 33.739,
    33.226, 32.913, 32.4, 31.833, 31.862, 31.554, 30.953, 30.639, 30.561,
    30.368, 30.224, 29.79, 29.261, 29.287, 28.866,
  ],
  [
    2.184, 2.184, 2.184, 2.185, 2.178, 2.188, 2.177, 2.18, 2.151, 2.143, 2.156,
    2.166, 2.128, 2.122, 2.137, 2.134, 2.142, 2.12, 2.122, 2.122, 2.087, 2.085,
    2.062, 2.052, 2.021, 1.995, 2.001, 1.979, 1.956, 1.932, 1.916, 1.893, 1.863,
    1.841, 1.828, 1.809, 1.785, 1.763, 1.74, 1.72, 1.692, 1.668, 1.623, 1.623,
    1.608, 1.586, 1.563, 1.538, 1.52, 1.518, 1.509, 1.47, 1.458, 1.452, 1.443,
    1.449, 1.428, 1.401, 1.402, 1.383,
  ],
  [
    68.039,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    69.141,
    69.141,
    ,
    ,
    67.791,
    ,
    ,
    67.504,
    67.657,
    67.657,
    54.079,
    54.079,
    68.728,
    68.728,
    68.7,
    68.7,
    68.74,
    ,
    ,
    ,
    ,
    ,
    69.443,
    69.443,
    69.812,
    69.812,
    69.521,
    69.521,
    69.94,
    69.94,
    79.568,
    79.568,
    68.664,
    68.664,
    68.889,
    68.889,
    68.677,
    68.677,
    68.708,
    68.708,
    74.427,
    74.427,
    68.101,
    68.101,
    68.42,
    68.42,
    68.223,
    68.223,
    68.159,
    68.159,
    68.264,
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
    data: ["TS1", "TS2", "CE", "CP", "SE"],
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
      for (let i = 0; i < 60; i++) {
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
      name: "TS1",
      type: "line",
      data: allData[0],
    },
    {
      name: "TS2",
      type: "line",

      data: allData[1],
    },
    {
      name: "CE",
      type: "line",
      data: allData[2],
    },
    {
      name: "CP",
      type: "line",
      data: allData[3],
    },
    {
      name: "SE",
      type: "line",
      data: allData[4],
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
      op.series[0].data = [
        35.57, 35.492, 35.469, 35.422, 35.414, 35.32, 35.227, 35.242, 35.16,
        35.176, 35.172, 35.168, 35.156, 35.187, 35.176, 35.25, 35.234, 35.316,
        35.316, 35.402, 35.402, 35.398, 35.441, 35.414, 35.434, 35.48, 35.5,
        35.488, 35.559, 35.555, 35.574, 35.652, 35.668, 35.664, 35.66, 35.734,
        35.824, 35.824, 35.82, 35.836, 35.836, 35.828, 35.84, 35.859, 35.918,
        35.914, 35.895, 35.992, 35.98, 35.98, 36.008, 35.984, 35.996, 36.039,
        36.008, 36.008, 36.094, 36.102, 36.09, 36.152,
      ];
      op.series[4].data = [
        68.039, 0, 0, 0, 0, 0, 0, 0, 0, 69.141, 69.141, 68.144, 68.144, 67.791,
        67.791, 67.504, 67.504, 67.657, 67.657, 54.079, 54.079, 68.728, 68.728,
        68.7, 68.7, 68.74, 68.74, 68.609, 68.609, 56.919, 56.919, 69.443,
        69.443, 69.812, 69.812, 69.521, 69.521, 69.94, 69.94, 79.568, 79.568,
        68.664, 68.664, 68.889, 68.889, 68.677, 68.677, 68.708, 68.708, 74.427,
        74.427, 68.101, 68.101, 68.42, 68.42, 68.223, 68.223, 68.159, 68.159,
        68.264,
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
        35.156, 35.187, 35.176, 35.25, 35.234, 35.316, 35.316, 35.402, 35.402,
        35.398, 35.441, 35.414, 35.434, 35.48, 35.5, 35.488, 35.559, 35.555,
        35.574, 35.652, 35.668, 35.664, 35.66, 35.734, 35.824, 35.824, 35.82,
        35.836, 35.836, 35.828, 35.84, 35.859, 35.918, 35.914, 35.895, 35.992,
        35.98, 35.98, 36.008, 35.984, 35.996, 36.039, 36.008, 36.008, 36.094,
        36.102, 36.09, 36.152, 35.57, 35.492, 35.469, 35.422, 35.414, 35.32,
        35.227, 35.242, 35.16, 35.176, 35.172, 35.168,
      ];
      op.series[1].data = [
        40.773, 40.789, 40.785, 40.773, 40.812, 40.785, 40.801, 40.809, 40.797,
        40.785, 40.828, 40.863, 40.867, 40.879, 40.809, 40.895, 40.926, 40.949,
        40.965, 40.961, 40.984, 41.02, 41.039, 41.043, 41.043, 41.043, 41.043,
        41.059, 41.098, 41.109, 41.121, 41.129, 41.125, 41.121, 41.129, 41.148,
        41.141, 41.18, 41.211, 41.129, 41.195, 41.211, 41.207, 41.191, 41.207,
        41.207, 41.129, 41.254, 40.961, 40.949, 40.965, 40.922, 40.879, 40.879,
        40.828, 40.812, 40.809, 40.785, 40.789, 40.785,
      ];
      op.series[2].data = [
        46.136, 46.127, 45.948, 45.935, 45.726, 45.139, 44.978, 44.937, 44.269,
        44.079, 43.741, 43.375, 42.847, 42.322, 42.322, 41.797, 41.406, 40.924,
        40.427, 39.857, 39.517, 38.999, 38.493, 37.954, 37.552, 37.084, 36.615,
        36.098, 35.58, 35.141, 34.184, 34.177, 33.739, 33.226, 32.913, 32.4,
        31.833, 31.862, 31.554, 30.953, 30.639, 30.561, 30.368, 30.224, 29.79,
        29.261, 29.287, 28.866, 47.202, 47.273, 47.25, 47.332, 47.213, 47.372,
        47.273, 47.438, 46.691, 46.599, 46.623, 46.653,
      ];
      op.series[3].data = [
        2.128, 2.122, 2.137, 2.134, 2.142, 2.12, 2.122, 2.122, 2.087, 2.085,
        2.062, 2.052, 2.021, 1.995, 2.001, 1.979, 1.956, 1.932, 1.916, 1.893,
        1.863, 1.841, 1.828, 1.809, 1.785, 1.763, 1.74, 1.72, 1.692, 1.668,
        1.623, 1.623, 1.608, 1.586, 1.563, 1.538, 1.52, 1.518, 1.509, 1.47,
        1.458, 1.452, 1.443, 1.449, 1.428, 1.401, 1.402, 1.383, 2.184, 2.184,
        2.184, 2.185, 2.178, 2.188, 2.177, 2.18, 2.151, 2.143, 2.156, 2.166,
      ];
      op.series[4].data = [
        68.144, 67.791, 67.791, 67.504, 67.504, 67.657, 67.657, 54.079, 54.079,
        68.728, 68.728, 68.7, 68.7, 68.74, 68.74, 68.609, 68.609, 56.919,
        56.919, 69.443, 69.443, 69.812, 69.812, 69.521, 69.521, 69.94, 69.94,
        79.568, 79.568, 68.664, 68.664, 68.889, 68.889, 68.677, 68.677, 68.708,
        68.708, 74.427, 74.427, 68.101, 68.101, 68.42, 68.42, 68.223, 68.223,
        68.159, 68.159, 68.264, 68.039, 0, 0, 0, 0, 0, 0, 0, 0, 69.141, 69.141,
        68.144,
      ];
      op.xAxis.data = (() => {
        let r = [];
        for (let i = 12; i < 72; i++) {
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
              xAxis: 60 + "s",
            },
            {
              xAxis: 59 + 12 + "s",
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
