/*
 * @Author: your name
 * @Date: 2022-04-20 09:32:29
 * @LastEditTime: 2022-04-28 14:28:06
 * @LastEditors: Please set LastEditors
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


export const ImageTextEdit = (props) => {
    return ReactDOM.render(
        <div>
            <Main {...props}/>
        </div>,
        document.getElementById(props.el)
    );
}
window.ImageTextEdit = ImageTextEdit

// new ImageTextEdit({
//     el: 'demo_container',
//     width: 700,
//     height: 400,
//     image: 'https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
//     imageName: 'test',
//     textName: '测试',
//     originPosition: {x: 313.69, y: 374.0458015267176}
// })
