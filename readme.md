<!--
 * @Author: your name
 * @Date: 2022-04-20 09:32:29
 * @LastEditTime: 2022-05-19 14:12:12
 * @LastEditors: M.re c1029mq@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fabric-photo/readme.md
-->
##  photo text

基于 canvas 的纯前端的图片文字编辑器

## online Demo

```js
import ImageTextEdit from 'mq-photo-text-edit';
var ImageTextEditData = new ImageTextEdit({
    el: 'demo_container',
    width: 700,
    height: 400,
    image: 'https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    imageName: 'test',
    textName: '测试',
    originPosition: {x: 313.69, y: 374.0458015267176},

})
setTimeout(()=> {
    ImageTextEditData.save('base64').then(res=> {
        console.log(res)
    })
}, 3000)
```

## 启动 demo

```bash
# 安装依赖
npm run i
# 运行项目
npm run dev
```


