zul.inp.ComboWidget=zk.$extends(zul.inp.InputWidget,{_buttonVisible:true,$define:{buttonVisible:function(a){var d=this.$n("btn"),b=this.getZclass();if(d){if(!this.inRoundedMold()){if(!this._inplace||!a){jq(d)[a?"show":"hide"]()}else{d.style.display=""}jq(this.getInputNode())[a?"removeClass":"addClass"](b+"-right-edge")}else{var c=a?"removeClass":"addClass";jq(d)[c](b+"-btn-right-edge");if(zk.ie6_){jq(d)[c](b+(this._readonly?"-btn-right-edge-readonly":"-btn-right-edge"));if(jq(this.getInputNode()).hasClass(b+"-text-invalid")){jq(d)[c](b+"-btn-right-edge-invalid")}}}this.onSize()}},autodrop:null},setWidth:function(){this.$supers("setWidth",arguments);if(this.desktop){this.onSize()}},onSize:function(){var a=this.getWidth();if(!a||a.indexOf("%")!=-1){this.getInputNode().style.width=""}this.syncWidth()},onFloatUp:function(b){if(jq(this.getPopupNode_()).is(":animated")||(!this._inplace&&!this.isOpen())){return}var c=b.origin;if(!zUtl.isAncestor(this,c)){if(this.isOpen()){this.close({sendOnOpen:true})}if(this._inplace){var d=this.$n(),a=this.getInplaceCSS();if(jq(d).hasClass(a)){return}d.style.width=jq.px0(zk(d).revisedWidth(d.offsetWidth));jq(this.getInputNode()).addClass(a);jq(d).addClass(a);this.onSize();d.style.width=this.getWidth()||""}}},onResponse:function(d,e){if((e.rtags.onOpen||e.rtags.onChanging)&&this.isOpen()){if(zk.animating()){var c=this;setTimeout(function(){c.onResponse(d,e)},50);return}var a=this.getPopupNode_(),b=this.getPopupSize_(a);a.style.height=b[1];if(zk.ie8){a.style.width=b[0]}this._fixsz(b)}},setOpen:function(a,b){if(a){this.open(b)}else{this.close(b)}},isOpen:function(){return this._open},open:function(a){if(this._open){return}this._open=true;if(a&&a.focus){this.focus()}var b=this.getPopupNode_(),f=this.getInputNode();if(!b){return}this.setFloating_(true,{node:b});zWatch.fire("onFloatUp",this);var i=this.setTopmost();var g=this.getPopupSize_(b);b.style.width=g[0];b.style.height="auto";b.style.zIndex=i>0?i:1;var c=this.getPopupNode_(true);if(c){c.style.width=c.style.height="auto"}b.style.position="absolute";b.style.display="block";b.style.visibility="hidden";b.style.left="-10000px";var l=zk(b);l.makeVParent();zWatch.fireDown("onVParent",this);b.style.left="";this._fixsz(g);l.position(f,"after_start");b.style.display="none";b.style.visibility="";this.slideDown_(b);if(zk.gecko){var k=c?c.rows:null;if(k){var h=b.offsetHeight-b.clientHeight;if(h>10&&b.offsetHeight<150){var d=0;for(var e=k.length;e--;){d+=k[e].offsetHeight}b.style.height=(d+20)+"px"}}}if(!this._shadow){this._shadow=new zk.eff.Shadow(b,{left:-4,right:4,top:-2,bottom:3})}if(a&&a.sendOnOpen){this.fire("onOpen",{open:true,value:f.value},{rtags:{onOpen:1}})}},slideDown_:function(a){zk(a).slideDown(this,{afterAnima:this._afterSlideDown,duration:100})},slideUp_:function(a){a.style.display="none"},zsync:function(){this.$supers("zsync",arguments);if(!zk.css3&&this.isOpen()&&this._shadow){this._shadow.sync()}},_afterSlideDown:function(a){if(!this.desktop){zk(a).undoVParent();jq(a).remove()}if(this._shadow){this._shadow.sync()}},getPopupNode_:function(a){return a?this.$n("cave"):this.$n("pp")},close:function(c){if(!this._open){return}var b=this;if(zk.animating()){setTimeout(function(){b.close(c)},50);return}this._open=false;if(c&&c.focus){this.focus()}else{jq(this.$n()).removeClass(this.getZclass()+"-focus")}var a=this.getPopupNode_();if(!a){return}this.setFloating_(false);zWatch.fireDown("onHide",this);this.slideUp_(a);zk.afterAnimate(function(){zk(a).undoVParent();zWatch.fireDown("onVParent",b)},-1);if(this._shadow){this._shadow.destroy();this._shadow=null}var d=this.$n("btn");if(d){jq(d).removeClass(this.getZclass()+"-btn-over")}if(c&&c.sendOnOpen){this.fire("onOpen",{open:false,value:this.getInputNode().value},{rtags:{onOpen:1}})}},_fixsz:function(d){var c=this.getPopupNode_();if(!c){return}var b=this.getPopupNode_(true);if(d[1]=="auto"&&c.offsetHeight>350){c.style.height="350px"}else{if(c.offsetHeight<10){c.style.height="10px"}}if(d[0]=="auto"){var a=this.$n();if(c.offsetWidth<a.offsetWidth){c.style.width=a.offsetWidth+"px";if(b){b.style.width="100%"}}else{var e=jq.innerWidth()-20;if(e<a.offsetWidth){e=a.offsetWidth}if(c.offsetWidth>e){c.style.width=e}}}},dnPressed_:zk.$void,upPressed_:zk.$void,otherPressed_:zk.$void,enterPressed_:function(a){this.close({sendOnOpen:true});this.updateChange_();a.stop()},escPressed_:function(a){this.close({sendOnOpen:true});a.stop()},getPopupSize_:function(a){return["auto","auto"]},redraw_:function(a){var c=this.uuid,d=this.getZclass(),b=this._buttonVisible;a.push("<i",this.domAttrs_({text:true}),'><input id="',c,'-real" class="',d,"-inp");if(!b){a.push(" ",d,"-right-edge")}a.push('" autocomplete="off"',this.textAttrs_(),'/><i id="',c,'-btn" class="',d,"-btn");if(this.inRoundedMold()){if(!b){a.push(" ",d,"-btn-right-edge")}if(this._readonly){a.push(" ",d,"-btn-readonly")}if(zk.ie6_&&!b&&this._readonly){a.push(" ",d,"-btn-right-edge-readonly")}}else{if(!b){a.push('" style="display:none')}}a.push('"></i>');this.redrawpp_(a);a.push("</i>")},redrawpp_:function(a){},syncWidth:function(){zul.inp.RoundUtl.syncWidth(this,this.$n("btn"))},beforeParentMinFlex_:function(a){if("w"==a){this.syncWidth()}},doFocus_:function(a){var b=this.$n();if(this._inplace){b.style.width=jq.px0(zk(b).revisedWidth(b.offsetWidth))}this.$supers("doFocus_",arguments);if(this._inplace){if(jq(b).hasClass(this.getInplaceCSS())){jq(b).removeClass(this.getInplaceCSS());this.onSize()}}},doBlur_:function(a){var b=this.$n();if(this._inplace&&this._inplaceout){b.style.width=jq.px0(zk(b).revisedWidth(b.offsetWidth))}this.$supers("doBlur_",arguments);if(this._inplace&&this._inplaceout){jq(b).addClass(this.getInplaceCSS());this.onSize();b.style.width=this.getWidth()||""}},afterKeyDown_:function(a,b){if(!b&&this._inplace){jq(this.$n()).toggleClass(this.getInplaceCSS(),a.keyCode==13?null:false)}return this.$supers("afterKeyDown_",arguments)},bind_:function(){this.$supers(zul.inp.ComboWidget,"bind_",arguments);var a,b=this.getInputNode();if(this._inplace){jq(b).addClass(this.getInplaceCSS())}if(a=this.$n("btn")){this._auxb=new zul.Auxbutton(this,a,b);this.domListen_(a,"onClick","_doBtnClick")}zWatch.listen({onSize:this,onFloatUp:this,onResponse:this});if(!zk.css3){jq.onzsync(this)}},unbind_:function(){this.close();var a=this.$n("btn");if(a){this._auxb.cleanup();this._auxb=null;this.domUnlisten_(a,"onClick","_doBtnClick")}zWatch.unlisten({onSize:this,onFloatUp:this,onResponse:this});if(!zk.css3){jq.unzsync(this)}this.$supers(zul.inp.ComboWidget,"unbind_",arguments)},_doBtnClick:function(a){if(this.inRoundedMold()&&!this._buttonVisible){return}if(!this._disabled&&!zk.animating()){if(this._open){this.close({focus:true,sendOnOpen:true})}else{this.open({focus:true,sendOnOpen:true})}}a.stop()},doKeyDown_:function(a){this._doKeyDown(a);if(!a.stopped){this.$supers("doKeyDown_",arguments)}},doClick_:function(a){if(!this._disabled){if(a.domTarget==this.getPopupNode_()){this.close({focus:true,sendOnOpen:true})}else{if(this._readonly&&!this.isOpen()&&this._buttonVisible){this.open({focus:true,sendOnOpen:true})}}this.$supers("doClick_",arguments)}},_doKeyDown:function(a){var d=a.keyCode,b=this._open;if((a.target==this||!(a.target.$instanceof(zul.inp.InputWidget)))&&(d==9||(zk.safari&&d==0))){if(b){this.close({sendOnOpen:true})}return}if(a.altKey&&(d==38||d==40)){if(b){this.close({sendOnOpen:true})}else{this.open({sendOnOpen:true})}var c={propagation:true};if(zk.ie){c.dom=true}a.stop(c);return}if(b&&(d==13||d==27)){if(d==13){this.enterPressed_(a)}else{this.escPressed_(a)}return}if(d==18||d==27||d==13||(d>=112&&d<=123)){return}if(this._autodrop&&!b){this.open({sendOnOpen:true})}if(d==38){this.upPressed_(a)}else{if(d==40){this.dnPressed_(a)}else{this.otherPressed_(a)}}},onChildAdded_:_zkf=function(a){if(this._shadow){this._shadow.sync()}},onChildRemoved_:_zkf,onChildVisible_:_zkf});