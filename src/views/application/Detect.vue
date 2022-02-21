<template>
  <div>
    <div class="title">上传代码</div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="手动输入" name="typein"
        ><div style="text-align: left; height: 330px">
          <el-input
            type="textarea"
            :rows="13"
            :placeholder="palceholder"
            v-model="textarea"
            resize="none"
          >
          </el-input>
          <div style="margin-top: 10px">
            <el-button type="primary" @click="detect">开始检测</el-button>
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="上传文件" name="upload">
        <div style="text-align: left">
          <el-upload class="upload-demo" drag action="#" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传C/C++文件，且不能超过10M。
            </div>
          </el-upload>
          <div style="margin-top: 10px">
            <el-button type="primary" @click="detect">开始检测</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="block"></div>
    <div class="title">检测结果</div>
    <el-card style="width: 100%; height: 350px; text-align: initial">
      <div class="el-descriptions__header" style="font-weight: bold">
        漏洞代码位置
      </div>
      <div
        v-for="sentence in sourceCodeList"
        :key="sentence.code"
        style="margin: 10px 0px"
      >
        <pre :class="sentence.type == 'danger' ? 'danger' : 'normal'">{{
          sentence.code
        }}</pre>
      </div>
    </el-card>
    <div class="block"></div>
    <div style="width: 100%; display: flex; justify-content: space-between">
      <el-card
        style="width: 48.5%; height: 350px"
        v-for="info in infos"
        :key="info.id"
      >
        <el-descriptions
          title="漏洞信息"
          :column="1"
          border
          :labelStyle="{ width: '130px' }"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message-solid"></i>
              漏洞类型
            </template>
            {{ info.type }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-error"></i>
              漏洞原因
            </template>
            {{ info.reason }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection-tag"></i>
              漏洞类型代号
            </template>
            {{ info.code }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              漏洞位置
            </template>
            {{ info.loc }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              备注
            </template>
            {{ info.info }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <div class="block"></div>
    <el-card style="width: 100%; height: 650px">
      <div class="el-descriptions__header" style="font-weight: bold">
        漏洞代码图谱
      </div>
      <d-3-marker :data="graphData" :curNode.sync="currentNode" />
    </el-card>
    <el-dialog
      title="检测中..."
      :visible.sync="centerDialogVisible"
      width="30%"
      :show-close="false"
      center
      style="margin-top: 20vh"
    >
      <el-progress
        type="dashboard"
        :percentage="percentage"
        :color="colors"
        :status="proessStatus"
      ></el-progress>
    </el-dialog>
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
let sourceCode = `
void demo() {
  int a[2];
  int b = a[3];
  char c = 'c';
  char d = c;
  int e = 2;
  if(b>0) {
    int f = e / 0; 
  }
}
`;
let sourceCodeList = [
  {
    code: `void demo() {`,
    type: "normal",
  },
  {
    code: `  int a[2];`,
    type: "normal",
  },
  {
    code: `  int b = a[3];`,
    type: "danger",
  },
  {
    code: `  char c = 'c';`,
    type: "normal",
  },
  {
    code: `  char d = c;`,
    type: "normal",
  },
  {
    code: `  if(b>0) {`,
    type: "normal",
  },
  {
    code: `    int f = e / 0;`,
    type: "danger",
  },
  {
    code: `  }`,
    type: "normal",
  },
  {
    code: `}`,
    type: "normal",
  },
];

let infos = [
  {
    type: "数组使用相关漏洞",
    reason: "数组越界访问",
    code: "AUCVL",
    loc: "3:7",
    info: "无",
  },
  {
    type: "算术表达式相关漏洞",
    reason: "除数为0",
    code: "AECVL",
    loc: "8:9",
    info: "无",
  },
];

import D3Marker from "../../components/D3Marker.vue";

export default {
  components: {
    D3Marker,
  },
  data() {
    return {
      infos: [
        {
          type: "数组使用相关漏洞",
          reason: "数组越界访问",
          code: "AUCVL",
          loc: "3:7",
          info: "无",
        },
        {
          type: "算术表达式相关漏洞",
          reason: "除数为0",
          code: "AECVL",
          loc: "8:9",
          info: "无",
        },
      ],
      sourceCodeList: [],
      proessStatus: "",
      percentage: 0,
      colors: [
        { color: "#f56c6c", percentage: 30 },
        { color: "#e6a23c", percentage: 60 },
        { color: "#5cb87a", percentage: 80 },
      ],
      centerDialogVisible: false,
      graphData: {},
      currentNode: {},
      activeName: "typein",
      textarea: sourceCode,
      palceholder: `请输入需要检测漏洞的代码...
示例：
int main() {
  printf('hello world');
}
      `,
    };
  },
  created() {},
  methods: {
    setData() {
      setTimeout(() => {
        this.graphData = {
          links: [
            {
              source: 1,
              target: 2,
              type: "has_method",
            },
            {
              source: 2,
              target: 3,
              type: "has_compound",
            },
            {
              source: 2,
              target: 4,
              type: "has_compound",
            },
            {
              source: 2,
              target: 5,
              type: "has_compound",
            },
            {
              source: 2,
              target: 6,
              type: "has_compound",
            },
            {
              source: 2,
              target: 7,
              type: "has_compound",
            },
            {
              source: 4,
              target: 3,
              type: "data_denpendence",
            },
            {
              source: 6,
              target: 5,
              type: "data_denpendence",
            },
            {
              source: 9,
              target: 10,
              type: "data_denpendence",
            },
            {
              source: 7,
              target: 4,
              type: "control_denpendence",
            },
            {
              source: 7,
              target: 8,
              type: "if_cond",
            },
            {
              source: 7,
              target: 9,
              type: "if_true",
            },
          ],
          nodes: [
            {
              id: 1,
              name: "file",
              type: "File",
            },
            {
              id: 2,
              name: "demo",
              type: "File",
            },
            {
              id: 3,
              name: "int a[2];",
              type: "File",
            },
            {
              id: 4,
              name: "int b = a[3];",
              type: "Statetment",
            },
            {
              id: 5,
              name: "int c = 'c';",
              type: "File",
            },
            {
              id: 6,
              name: "int d = c",
              type: "File",
            },
            {
              id: 7,
              name: "if(b>0)",
              type: "File",
            },
            {
              id: 8,
              name: "b>0",
              type: "File",
            },
            {
              id: 9,
              name: "int f = e / 0;",
              type: "Statetment",
            },
            {
              id: 10,
              name: "int e = 2;",
              type: "File",
            },
          ],
        };
        this.sourceCodeList = sourceCodeList;
        this.infos = infos;
      }, 1000);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    detect() {
      this.centerDialogVisible = true;
      let timer = setInterval(() => {
        this.percentage = this.percentage + 10;
        if (this.percentage == 100) {
          clearInterval(timer);
          this.proessStatus = "success";
          setTimeout(() => {
            this.centerDialogVisible = false;
            this.setData();
          }, 1000);
        }
      }, 2000);
    },
  },
};
</script>
