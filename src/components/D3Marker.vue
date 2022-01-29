<template>
  <div class="force-pane" :id="id">
    <!-- <svg></svg> -->
  </div>
</template>

<script>
import * as d3 from "d3";

let circle = "",
  text = "",
  edges_line = "",
  edges_text = "";

export default {
  name: "Scale",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    curNode: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    // 监听一下从父组件传来的值
    data(val) {
      this.d3Data = val;
      // 先把svg元素干掉
      document.getElementById(this.id).innerHTML = "";
      this.playUp();
    },
  },
  data() {
    return {
      id: "",
      d3Data: {},
    };
  },
  methods: {
    uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    },
    tick() {
      //path.attr("d", linkArc);//连接线
      circle.attr("transform", this.transform1); //圆圈
      text.attr("transform", this.transform2); //顶点文字
      //edges_text.attr("transform", transform3);
      //text2.attr("d", linkArc);//连接线文字
      //console.log("text2...................");
      //console.log(text2);
      //edges_line.attr("x1",function(d){ return d.source.x; });
      //edges_line.attr("y1",function(d){ return d.source.y; });
      //edges_line.attr("x2",function(d){ return d.target.x; });
      //edges_line.attr("y2",function(d){ return d.target.y; });

      //edges_line.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
      //edges_line.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });

      edges_line.attr("d", function (d) {
        var path =
          "M " +
          d.source.x +
          " " +
          d.source.y +
          " L " +
          d.target.x +
          " " +
          d.target.y;
        return path;
      });

      edges_text.attr("transform", function (d, i) {
        if (d.target.x < d.source.x) {
          var bbox = this.getBBox();
          var rx = bbox.x + bbox.width / 2;
          var ry = bbox.y + bbox.height / 2;
          return "rotate(180 " + rx + " " + ry + ")";
        } else {
          return "rotate(0)";
        }
      });
    },
    linkArc(d) {
      //var dx = d.target.x - d.source.x,
      // dy = d.target.y - d.source.y,
      // dr = Math.sqrt(dx * dx + dy * dy);
      //return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      //打点path格式是：Msource.x,source.yArr00,1target.x,target.y

      return (
        "M " +
        d.source.x +
        " " +
        d.source.y +
        " L " +
        d.target.x +
        " " +
        d.target.y
      );
    },
    //设置圆圈和文字的坐标
    transform1(d) {
      return "translate(" + d.x + "," + d.y + ")";
    },
    transform2(d) {
      return "translate(" + d.x + "," + d.y + ")";
    },
    playUp() {
      var links = this.d3Data.links;
      var nodes = this.d3Data.nodes;
      function getNodeById(id) {
        let r;
        nodes.forEach((node) => {
          // console.log(node)
          if (node.id === id) {
            r = node;
          }
        });
        return r;
      }
      // console.log(getNodeById("30"))
      // var nodes = []
      links.forEach(function (link) {
        link.source = getNodeById(link.source);
        link.target = getNodeById(link.target);
      });

      let marge = { top: 160, bottom: 60, left: 160, right: 60 };
      let width = document.getElementById(this.id).clientWidth;
      let height = document.getElementById(this.id).clientHeight;

      var force = d3.layout
        .force() //layout将json格式转化为力学图可用的格式
        .nodes(d3.values(nodes)) //设定节点数组
        .links(links) //设定连线数组
        .size([width, height]) //作用域的大小
        .linkDistance(180) //连接线长度
        .charge(-1500) //顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
        .on("tick", this.tick) //指时间间隔，隔一段时间刷新一次画面
        .start(); //开始转换

      var svg = d3
        .select(this.$el)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      //箭头
      var marker = svg
        .append("marker")
        //.attr("id", function(d) { return d; })
        .attr("id", "resolved")
        //.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", 32) //箭头坐标
        .attr("refY", -1)
        .attr("markerWidth", 12) //标识的大小
        .attr("markerHeight", 12)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 5) //箭头宽度
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") //箭头的路径
        .attr("fill", "#c3c4c6"); //箭头颜色

      /* 将连接线设置为曲线
    var path = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .style("stroke",function(d){
            //console.log(d);
          return "#A254A2";//连接线的颜色
        })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
    */

      //设置连接线
      edges_line = svg
        .selectAll(".edgepath")
        .data(force.links())
        .enter()
        .append("path")
        .attr({
          d: function (d) {
            return (
              "M " +
              d.source.x +
              " " +
              d.source.y +
              " L " +
              d.target.x +
              " " +
              d.target.y
            );
          },
          class: "edgepath",
          //'fill-opacity':0,
          //'stroke-opacity':0,
          //'fill':'blue',
          //'stroke':'red',
          id: function (d, i) {
            return "edgepath" + i;
          },
        })
        .style("stroke", function (d) {
          //根据关系的不同设置线条颜色
          return "#c3c4c6";
        })
        .style("pointer-events", "none")
        .style("stroke-width", 0.5) //线条粗细
        .attr("marker-end", "url(#resolved)"); //根据箭头标记的id号标记箭头

      edges_text = svg
        .append("g")
        .selectAll(".edgelabel")
        .data(force.links())
        .enter()
        .append("text")
        .style("pointer-events", "none")
        //.attr("class","linetext")
        .attr({
          class: "edgelabel",
          id: function (d, i) {
            return "edgepath" + i;
          },
          dx: 80,
          dy: 0,
          "font-size": 8,
          fill: "#000",
        });

      //设置线条上的文字
      edges_text
        .append("textPath")
        .attr("xlink:href", function (d, i) {
          return "#edgepath" + i;
        })
        .style("pointer-events", "none")
        .text(function (d) {
          return d.type;
        });

      let that = this;
      //圆圈
      circle = svg
        .append("g")
        .selectAll("circle")
        .data(force.nodes()) //表示使用force.nodes数据
        .enter()
        .append("circle")
        .style("fill", function (node) {
          var color =
            node.type === "File"
              ? "#4B9DF2"
              : node.type === "Statetment"
              ? "#F97D69"
              : node.type === "Method"
              ? "#FCE63D"
              : node.type === "Decl"
              ? "#98E75C"
              : node.type === "If"
              ? "#5CD0E7"
              : node.type === "IfCond"
              ? "#6264F4"
              : "#BC5AE7"; //benjingse
          return color;
        })
        .style("stroke", function (node) {
          var color =
            node.type === "File"
              ? "#087CF5"
              : node.type === "Statetment"
              ? "#F52808"
              : node.type === "Method"
              ? "#E3CA0B"
              : node.type === "Decl"
              ? "#56BE07"
              : node.type === "If"
              ? "#04ACCD"
              : node.type === "IfCond"
              ? "#2629F2"
              : "#A713E7"; //圆圈线条颜色
          return color;
        })
        .style("stroke-width", 2)
        .attr("r", 30) //设置圆圈半径
        .attr({ cursor: "pointer" })
        .on("click", function (node) {
          //单击时让连接线加粗
          edges_line.style("stroke-width", function (line) {
            // console.log(line);
            if (
              line.source.name == node.name ||
              line.target.name == node.name
            ) {
              return 1.5;
            } else {
              return 0.5;
            }
          });
          // 单击的时候需要渲染右侧的窗口的内容
          that.$emit("update:curNode", node);
        })
        .on("dblclick", function (node) {
          console.log("双击鼠标了");
        })
        .call(force.drag); //将当前选中的元素传到drag函数中，使顶点可以被拖动
      /*
     circle.append("text")  
    .attr("dy", ".35em")  
    .attr("text-anchor", "middle")//在圆圈内添加文字  
    .text(function(d) { 
        //console.log(d);
        return d.name; 
    }); */

      //圆圈的提示文字
      circle.append("svg:title").text(function (node) {
        // var link=links[node.index];
        return node.name;
        // if(node.name==link.source.name && link.rela=="主营产品"){
        //     return "双击可查看详情"
        // }
      });
      /* 矩形
    var rect=svg.append("rect")
            .attr({"x":100,"y":100,
                    "width":100,"height":50,
                    "rx":5,//水平圆角
                    "ry":10//竖直圆角
                })
              .style({
                "stroke":"red",
                "stroke-width":1,
                "fill":"yellow"
    });*/
      text = svg
        .append("g")
        .selectAll("text")
        .data(force.nodes())
        //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle") //在圆圈中加上数据
        .style("fill", function (node) {
          var color =
            node.type === "File"
              ? "#FFF"
              : node.type === "Statetment"
              ? "#000"
              : node.type === "Method"
              ? "#FFF"
              : node.type === "Decl"
              ? "#000"
              : node.type === "If"
              ? "#FFF"
              : node.type === "IfCond"
              ? "#000"
              : "#FFF"; //圆圈背景色
          return color;
        })
        .attr({ "font-size": 12, "font-weight": "bold" })
        .attr("x", function (d) {
          // console.log(d.name+"---"+ d.name.length);
          // var re_en = /[a-zA-Z]+/g;
          // //如果是全英文，不换行
          // if(d.name.match(re_en)){
          //     d3.select(this).append('tspan')
          //     .attr('x',0)
          //     .attr('y',2)
          //     .text(function(){return d.name;});
          // }
          //如果小于四个字符，不换行
          if (d.name.length <= 6) {
            d3.select(this)
              .append("tspan")
              .attr("x", 0)
              .attr("y", 2)
              .text(function () {
                return d.name;
              });
          } else {
            d3.select(this)
              .append("tspan")
              .attr("x", 0)
              .attr("y", 2)
              .text(function () {
                return d.name.substring(0, 6) + "...";
              });
            // var top=d.name.substring(0,4);
            // var bot=d.name.substring(4,d.name.length);

            // d3.select(this).text(function(){return '';});

            // d3.select(this).append('tspan')
            //     .attr('x',0)
            //     .attr('y',-7)
            //     .text(function(){return top;});

            // d3.select(this).append('tspan')
            //     .attr('x',0)
            //     .attr('y',10)
            //     .text(function(){return bot;});
          }
          //直接显示文字
          /*.text(function(d) { 
            return d.name; */
        });

      /*  将文字显示在圆圈的外面 
    var text2 = svg.append("g").selectAll("text")
        .data(force.links())
        //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
        .enter()
        .append("text")
        .attr("x", 150)//设置文字坐标
        .attr("y", ".50em")
        .text(function(d) { 
            //console.log(d);
            //return d.name; 
            //return d.rela;
            console.log(d);
            return  '1111';
        });*/
    },
  },
  created() {
    this.id = this.uuid();
  },
  mounted() {
    // this.playUp()
  },
};
</script>

<style scoped>
.force-pane {
  width: 100%;
  height: 600px;
}
.link {
  fill: none;
  stroke: #666;
  stroke-width: 1.5px;
}

#licensing {
  fill: green;
}

.link.licensing {
  stroke: green;
}

.link.resolved {
  stroke-dasharray: 0, 2 1;
}

circle {
  fill: #ccc;
  stroke: #333;
  stroke-width: 1.5px;
  cursor: pointer;
}

text {
  font: 12px Microsoft YaHei;
  pointer-events: none;
  text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
}

.linetext {
  font-size: 12px Microsoft YaHei;
}
</style>
