/**
 * Created by yeanzhi on 17/1/13.
 */
'use strict';
import React, { Component } from 'react';
import classnames from 'classnames';

import { FabricPhoto, consts } from '../src/index';

export default class WrapContainer extends Component {
    constructor(props) {
        super(props);
        console.log('props', props)
        this.state = {
            isTextInset: false,
            width: props.width || 700,
            height: props.height || 400,
            image: props.image,
            imageName: props.imageName || 'image',
            editState: consts.states.NORMAL,
            textName: props.textName,
            textColor:props.textColor || '#FF5500',
            fontSize:props.fontSize ||  50,
            originPosition: props.originPosition ||  {x: 313.69, y: 374.0458015267176} ,
            arrow: {
                color: '#FF3440',
                stroke: 4
            },
            freeDraw: {
                color: '#FF3440',
                stroke: 4
            },
            text: {
                color: '#FF3440'
            },
            mosaic: {
                stroke: '#FF3440'
            }
        };
    }

    componentDidMount() {
        window.fabricPhoto = this.fp = new FabricPhoto('#upload-file-image-preview', {
            cssMaxWidth: this.state.width,
            cssMaxHeight: this.state.height
        });
        this.fp.once('loadImage', (oImage) => {
            this.fp.clearUndoStack();
        });
        this.fp.loadImageFromURL(this.state.image, this.state.imageName);
        // this.fp.loadImageFromURL('/demo.jpeg', 'image name');
        //this.fp.loadImageFromURL('http://mss.ximing.ren/v1/mss_814dc1610cda4b2e8febd6ea2c809db5/image/1484297784312.png', 'image name');
        // this.fp.loadImageFromURL('http://mss.ximing.ren/v1/mss_814dc1610cda4b2e8febd6ea2c809db5/image/1484297783376.jpeg', 'image name');
        //this.fp.loadImageFromURL('http://mss.ximing.ren/v1/mss_814dc1610cda4b2e8febd6ea2c809db5/image/1484297783036.png', 'image name');
        //this.fp.loadImageFromURL('http://mss.ximing.ren/v1/mss_814dc1610cda4b2e8febd6ea2c809db5/image/1486378338826.png','带文字的')
     
      
        this.fp.on('selectObject', (obj) => {
            //console.log('selectObject--->',obj);
            if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
                this.setState({
                    editState: consts.states.SHAPE
                });
                this.activateShapeMode();
            } else if (obj.type === 'text') {
               
                this.setState({
                    editState: consts.states.TEXT
                });
                this.activateTextMode();
            }
        });
       
        this.fp.on('activateText', (obj) => {
            //console.log('activateText----obj--->',obj);
            // add new text on cavas
            console.log(obj, 'obj.originPosition')
            if (obj.type === 'new' && !this.state.isTextInset) {
                this.setState({
                    isTextInset: true
                })
                // console.log('--activateText--new-->', obj);
                // this.fp.addText('双击编辑', {
                //     styles: {
                //         fill: this.state.text.color,
                //         fontSize: 50
                //     },
                //     position: obj.originPosition
                // });
                console.log('--activateText--new-->', obj, this.state);
                this.fp.addText(this.state.textName, {
                    styles: {
                        fill: this.state.textColor,
                        fontSize: this.state.fontSize
                    },
                    position: this.state.originPosition
                });
            }
        });
        this.fp.on({
            emptyUndoStack: () => {
                // $btnUndo.addClass('disabled');
                // resizeEditor();
            },
            emptyRedoStack: () => {
                // $btnRedo.addClass('disabled');
                // resizeEditor();
            },
            pushUndoStack: () => {
                // $btnUndo.removeClass('disabled');
                // resizeEditor();
            },
            pushRedoStack: () => {
                // $btnRedo.removeClass('disabled');
                // resizeEditor();
            },
            endCropping: () => {
                // $cropSubMenu.hide();
                // resizeEditor();
            },
            endFreeDrawing: () => {
                //$freeDrawingSubMenu.hide();
            },
            adjustObject: (obj, type) => {
                if (obj.type === 'text' && type === 'scale') {
                    //$inputFontSizeRange.val(obj.getFontSize());
                }
            }
        });
        if (this.state.text) {
            this.onTextBtnClick()
            const event = document.createEvent('MouseEvents');
            event.initEvent('mousedown', true, true);
            document.querySelector('.upper-canvas').dispatchEvent(event);
        }
    }

    componentWillUnmount() {
        if (this.fp) {
            this.fp.destory();
            this.fp = null;
            $('#upload-file-image-preview-paper').empty();
        }
    }

    activateShapeMode() {
        if (this.fp.getCurrentState() !== consts.states.SHAPE) {
            this.fp.endFreeDrawing();
            this.fp.endTextMode();
            this.fp.endLineDrawing();
            this.fp.endMosaicDrawing();
            this.fp.endCropping();
            this.fp.endArrowDrawing();
            this.fp.endPan();
            this.fp.startDrawingShapeMode();
        }
    }

    activateTextMode() {
        if (this.fp.getCurrentState() !== consts.states.TEXT) {
            this.fp.endFreeDrawing();
            this.fp.endLineDrawing();
            this.fp.endArrowDrawing();
            this.fp.endMosaicDrawing();
            this.fp.endCropping();
            this.fp.endDrawingShapeMode();
            this.fp.endTextMode();
            this.fp.endPan();
            this.fp.startTextMode();
        }
    }

    getWindowViewPort() {
        return {
            height: $(window).height(),
            width: $(window).width()
        };
    }

    getDialogViewPort() {
        const { height, width } = this.getWindowViewPort();
        return {
            width: width < 680 ? 680 : width > 900 ? 900 : width,
            height: height < 450 ? 450 : height > 600 ? 600 : height
        };
    }

    resetEditorState() {
        this.setState({
            editState: consts.states.NORMAL
        });
    }

    onArrowBtnClick() {
        this.fp.endAll();
        //this.fp.startLineDrawing();
        if (this.state.editState === consts.states.ARROW) {
            this.resetEditorState();
        } else {
            this.setState({
                editState: consts.states.ARROW
            });
            this.fp.startArrowDrawing({
                width: this.state.arrow.stroke,
                color: this.state.arrow.color
            });
        }
    }

    onFreeDrawBtnClick() {
        this.fp.endAll();
        if (this.state.editState === consts.states.FREE_DRAWING) {
            this.resetEditorState();
        } else {
            this.setState({
                editState: consts.states.FREE_DRAWING
            });
            this.fp.startFreeDrawing({
                width: this.state.freeDraw.stroke,
                color: this.state.freeDraw.color
            });
        }
    }

    onMosaicBtnClick() {
        this.fp.endAll();
        if (this.state.editState === consts.states.MOSAIC) {
            this.resetEditorState();
        } else {
            this.setState({
                editState: consts.states.MOSAIC
            });
            this.fp.startMosaicDrawing({
                dimensions: this.state.mosaic.stroke
            });
        }
    }

    onTextBtnClick() {
        if (this.fp.getCurrentState() === consts.states.TEXT) {
            this.fp.endAll();
            this.resetEditorState();
        } else {
            this.setState({
                editState: consts.states.TEXT
            });
            //this.activateTextMode();
            this.fp.endAll();
            this.fp.startTextMode();
        }
    }

    onRotationBtnClick() {
        this.fp.endAll();
        this.fp.rotate(90);
        this.resetEditorState();
    }

    onCropBtnClick() {
        this.fp.startCropping();
    }

    onClearBtnClick() {
        this.resetEditorState();
        this.fp.clearObjects();
    }
    onApplyCropBtn() {
        this.fp.endCropping(true);
    }

    onCancleCropBtn() {
        this.fp.endCropping();
    }

    onUndoBtn() {
        this.fp.undo();
    }
    onRedoBtn() {
        this.fp.redo();
    }

    onPanBtnClick() {
        this.fp.endAll();
        this.fp.startPan();
    }

    renderArrowMenus() {
        return (
            <div className="tools-panel">
                <div className="tools-panel-brush">
                    <div>
                        <span className="small-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="normal-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="big-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                </div>
                <span className="tools-divider"> </span>
                <div className="tools-panel-color">
                    <span className="color red" onClick={this.changeEditorColor('#FF3440')}>
                        {' '}
                    </span>
                    <span className="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
                        {' '}
                    </span>
                    <span className="color green" onClick={this.changeEditorColor('#00A344')}>
                        {' '}
                    </span>
                    <span className="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
                        {' '}
                    </span>
                    <span className="color grey" onClick={this.changeEditorColor('#999999')}>
                        {' '}
                    </span>
                    <span className="color black" onClick={this.changeEditorColor('#ffffff')}>
                        {' '}
                    </span>
                    <span className="color white" onClick={this.changeEditorColor('#000000')}>
                        {' '}
                    </span>
                </div>
            </div>
        );
    }

    renderFreeDrawMenus() {
        return (
            <div className="tools-panel">
                <div className="tools-panel-brush">
                    <div>
                        <span className="small-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="normal-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="big-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                </div>
                <span className="tools-divider"> </span>
                <div className="tools-panel-color">
                    <span className="color red" onClick={this.changeEditorColor('#FF3440')}>
                        {' '}
                    </span>
                    <span className="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
                        {' '}
                    </span>
                    <span className="color green" onClick={this.changeEditorColor('#00A344')}>
                        {' '}
                    </span>
                    <span className="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
                        {' '}
                    </span>
                    <span className="color grey" onClick={this.changeEditorColor('#999999')}>
                        {' '}
                    </span>
                    <span className="color black" onClick={this.changeEditorColor('#ffffff')}>
                        {' '}
                    </span>
                    <span className="color white" onClick={this.changeEditorColor('#000000')}>
                        {' '}
                    </span>
                </div>
            </div>
        );
    }

    renderMosaicMenus() {
        return (
            <div className="tools-panel">
                <div className="tools-panel-brush">
                    <div>
                        <span className="small-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="normal-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                    <div>
                        <span className="big-brush" onClick={() => {}}>
                            {' '}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    renderTextMenus() {
        return (
            <div className="tools-panel">
                <div className="tools-panel-color">
                    <span className="color red" onClick={this.changeEditorColor('#FF3440')}>
                        {' '}
                    </span>
                    <span className="color yellow" onClick={this.changeEditorColor('#FFCF50')}>
                        {' '}
                    </span>
                    <span className="color green" onClick={this.changeEditorColor('#00A344')}>
                        {' '}
                    </span>
                    <span className="color blue" onClick={this.changeEditorColor('#0DA9D6')}>
                        {' '}
                    </span>
                    <span className="color grey" onClick={this.changeEditorColor('#999999')}>
                        {' '}
                    </span>
                    <span className="color black" onClick={this.changeEditorColor('#ffffff')}>
                        {' '}
                    </span>
                    <span className="color white" onClick={this.changeEditorColor('#000000')}>
                        {' '}
                    </span>
                </div>
            </div>
        );
    }

    renderCropMenus() {
        return (
            <div className="tools-panel">
                <div className="tools-panel-crop">
                    <span
                        className="tools-panel-crop-apply-btn"
                        onClick={this.onApplyCropBtn.bind(this)}
                    >
                        {' '}
                    </span>
                    <span
                        className="tools-panel-crop-cancel-btn"
                        onClick={this.onCancleCropBtn.bind(this)}
                    >
                        {' '}
                    </span>
                </div>
            </div>
        );
    }

    zoomOut(delta) {
        let nextZoom = this.fp.getZoom() + delta;
        if (nextZoom > 4) {
            return;
        }
        this.fp.setZoom(nextZoom);
    }

    zoomIn(delta) {
        let nextZoom = this.fp.getZoom() - delta;
        if (nextZoom < 1) {
            return;
        }
        this.fp.setZoom(nextZoom);
    }

    changeEditorColor() {
        return () => {};
    }
    onURL() {
        this.fp.toDataURL('image/png');
    }
    render() {
        let btnClassname = classnames({
            'file-button': true,
            'file-button--pc': process.env.APP_ENV === 'pc',
            'upload-success': true
        });
        let menus = null;
        this.fp && console.log('editor state', this.fp.getCurrentState());
        if (this.fp && this.fp.getCurrentState() === consts.states.FREE_DRAWING) {
            menus = this.renderFreeDrawMenus();
        } else if (this.fp && this.fp.getCurrentState() === consts.states.ARROW) {
            menus = this.renderArrowMenus();
        } else if (this.fp && this.fp.getCurrentState() === consts.states.MOSAIC) {
            menus = this.renderMosaicMenus();
        } else if (this.fp && this.fp.getCurrentState() === consts.states.TEXT) {
            menus = this.renderTextMenus();
        } else {
            menus = null;
        }
        return (
            <div className="wrap_inner">
                <div className="main">
                    <div className="upload-file-image-preview" id="upload-file-image-preview"></div>
                    <div className={btnClassname}>
                        {/* <div className="image-thumb-btns">
                            <i
                                className="dxicon dxicon-image-suoxiao"
                                onClick={this.zoomIn.bind(this, 0.2)}
                            />
                            <div className="thumb-divider"></div>
                            <i
                                className="dxicon dxicon-image-fangda"
                                onClick={this.zoomOut.bind(this, 0.2)}
                            />
                        </div> */}
                        {/* <div className="image-tools-btns">
                            <i
                                className="dxicon dxicon-image-jiantou"
                                onClick={this.onArrowBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-huabi"
                                onClick={this.onFreeDrawBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-text"
                                onClick={this.onTextBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-masaike"
                                onClick={this.onMosaicBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-xuanzhuan"
                                onClick={this.onRotationBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-jiancai"
                                onClick={this.onCropBtnClick.bind(this)}
                            />
                            <i
                                className="dxicon dxicon-image-jiancai"
                                onClick={this.onPanBtnClick.bind(this)}
                            />
                            <span className="tools-divider"> </span>
                            <span
                                className="file-button-cancel"
                                onClick={this.onClearBtnClick.bind(this)}
                            >
                                复原
                            </span>
                            <span
                                className="file-button-cancel"
                                onClick={this.onUndoBtn.bind(this)}
                            >
                                undo
                            </span>
                            <span
                                className="file-button-cancel"
                                onClick={this.onRedoBtn.bind(this)}
                            >
                                redo
                            </span>
                            <span className="file-button-cancel" onClick={this.onURL.bind(this)}>
                                url
                            </span>
                            {menus}
                        </div>
                        <div className="ctn-btns"></div> */}
                    </div>
                </div>
            </div>
        );
    }
}
