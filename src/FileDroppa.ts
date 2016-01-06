import {Directive, ElementRef, Renderer, Input, EventEmitter, Output} from 'angular2/core';

@Directive({
    selector: '[fileDroppa]',
    host:{
        '(drop)':'drop($event)',
        '(dragenter)':'dragenter($event)',
        '(dragover)':'dragover($event)',
        '(dragleave)':'dragleave($event)'
    }
})

export class FileDroppa {
    private _url:string = "/";
    private _overCls:string = "defaultOver";
    private _files:any[] = [];
    @Input() set url(url:string){
        this._url = url || this._url;
    }
    @Input() set overCls(overCls:string){
        this._overCls = overCls || this._overCls;
    }
    @Output() fileUploaded = new EventEmitter();
    constructor(private el: ElementRef, private renderer: Renderer) {

    }
    updateStyles(dragOver:boolean=false){
        this.renderer.setElementClass(this.el, this._overCls, dragOver);
    }
    drop(e){
        e.preventDefault();
        if (!e.dataTransfer || !e.dataTransfer.files.length) {
            return;
        }
        this._files = [...this._files, ...e.dataTransfer.files];
        this.fileUploaded.emit(this._files);
        this.updateStyles();
    }
    dragenter(e){
        e.preventDefault()
    }
    dragover(e){
        e.preventDefault();
        this.updateStyles(true);
    }
    dragleave(e){
        e.preventDefault();
        this.updateStyles();
    }
}