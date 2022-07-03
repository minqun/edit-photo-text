/*
 * @Author: your name
 * @Date: 2022-04-20 09:32:29
 * @LastEditTime: 2022-07-03 23:19:37
 * @LastEditors: M.re c1029mq@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fabric-photo/demo/index.js
 */
/**
 * Created by yeanzhi on 16/12/1.
 */
'use strict';
import 'babel-polyfill';
import './scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

export const ImageTextEdit = function (props) {
    this.save = function(type ='blob', fileType = "image/png", quality = 1){
        const event = document.createEvent('MouseEvents');
        event.initEvent('mousedown', true, true);
        this.dom.querySelector('.upper-canvas').dispatchEvent(event);
        return new Promise((resolve,reject) => {
            if (type == 'blob') {
                this.dom.querySelector('.lower-canvas').toBlob(function(blob) {
                    resolve(URL.createObjectURL(blob))
                }, fileType, quality);
            } else if (type == 'base64') {
                resolve(this.dom.querySelector('.lower-canvas').toDataURL(fileType, quality))
            } else {
                reject('no type data')
            }
        
        })
        
    }
    if (props.el) {
this.dom = ReactDOM.render(
        <div>
            <Main {...props}/>
        </div>,
        document.getElementById(props.el)
    );
    }
    
    return this
}
window.ImageTextEdit = ImageTextEdit
// var ImageTextEditData = new ImageTextEdit({
//     el: 'demo_container',
//     width: 700,
//     height: 400,
//     image: 'https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
//     imageName: 'test',
//     rotate: 60,
//     textNames: [{
//         textName: '测试11',
//         originPosition: {x: 313.69, y: 374.0458015267176},
//         textColor: '#000',
//         fontSize: 14,
//     },{
//         textName: '测试22',
//         originPosition: {x: 313.69, y: 374.0458015267176},
//         textColor: '#000',
//         fontSize: 14,
//     }],
//     originPosition: {x: 313.69, y: 374.0458015267176},

// })
// setTimeout(()=> {
//     ImageTextEditData.save('base64').then(res=> {
//         console.log(res)
//     })
// }, 3000)

