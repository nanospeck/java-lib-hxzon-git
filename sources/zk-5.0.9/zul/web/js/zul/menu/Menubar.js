(function(){function a(b){if(!b._noFloatUp&&!b._bOver&&zul.menu._nOpen){zWatch.fire("onFloatUp",b)}}zul.menu.Menubar=zk.$extends(zul.Widget,{_orient:"horizontal",$define:{orient:function(){this.rerender()},scrollable:function(b){if(this.checkScrollable()){this.rerender()}},autodrop:null},setWidth:function(){this.$supers("setWidth",arguments);this._checkScrolling()},getZclass:function(){return this._zclass==null?"z-menubar"+("vertical"==this.getOrient()?"-ver":"-hor"):this._zclass},unbind_:function(){if(this.checkScrollable()){var c=this.$n("left"),b=this.$n("right");if(c&&b){this.domUnlisten_(c,"onClick","_doScroll").domUnlisten_(c,"onMouseover","_onOver").domUnlisten_(c,"onMouseout","_onOut").domUnlisten_(b,"onClick","_doScroll").domUnlisten_(b,"onMouseover","_onOver").domUnlisten_(b,"onMouseout","_onOut")}zWatch.unlisten({onSize:this})}this._lastTarget=null;this.$supers(zul.menu.Menubar,"unbind_",arguments)},bind_:function(){this.$supers(zul.menu.Menubar,"bind_",arguments);if(this.checkScrollable()){var c=this.$n("left"),b=this.$n("right");if(c&&b){this.domListen_(c,"onClick","_doScroll").domListen_(c,"onMouseover","_onOver").domListen_(c,"onMouseout","_onOut").domListen_(b,"onClick","_doScroll").domListen_(b,"onMouseover","_onOver").domListen_(b,"onMouseout","_onOut")}zWatch.listen({onSize:this})}this._syncChdWidth()},checkScrollable:function(){return this._scrollable&&("horizontal"==this.getOrient())},onSize:function(){this._checkScrolling()},onChildAdded_:function(b){this.$supers("onChildAdded_",arguments);this._checkScrolling();this._syncChdWidth()},onChildRemoved_:function(b){this.$supers("onChildRemoved_",arguments);if(!this.childReplacing_){this._checkScrolling()}this._syncChdWidth()},_checkScrolling:function(){if(!this.checkScrollable()){return}var f=this.$n();if(!f){return}jq(f).addClass(this.getZclass()+"-scroll");if(zk.ie6_){this._doFixWidth(f)}var c=zk(f).offsetWidth(),b=this.$n("body"),g=jq(this.$n("cave")).children();totalWidth=0;for(var d=g.length;d--;){totalWidth+=g[d].offsetWidth}var e=c-zk(this.$n("left")).offsetWidth()-zk(this.$n("right")).offsetWidth();if(this._scrolling){if(totalWidth<=c){this._scrolling=false;b.scrollLeft=0;if(zk.ie7_){zk(b).redoCSS()}}else{b.style.width=jq.px0(e);this._fixScrollPos(f)}this._fixButtonPos(f)}else{if(totalWidth>c){this._scrolling=true;this._fixButtonPos(f);b.style.width=jq.px0(e)}}},_syncChdWidth:zk.$void,_fixScrollPos:function(){var b=this.$n("body"),d=jq(this.$n("cave")).children();if(d[d.length-1].offsetLeft<b.scrollLeft){var c=d[d.length-1].offsetLeft;b.scrollLeft=c}},_fixButtonPos:function(e){var g=this.getZclass(),b=this.$n("body"),f=this.$n("left"),d=this.$n("right"),c=this._scrolling?"addClass":"removeClass";jq(e)[c](g+"-scroll");jq(b)[c](g+"-body-scroll");jq(f)[c](g+"-left-scroll");jq(d)[c](g+"-right-scroll")},_doFixWidth:function(){var c=this.$n(),b=c.style.width;if(zk.ie6_&&(!b||"auto"==b)){this._forceStyle(c,"100%")}},_forceStyle:function(b,c){if(zk.parseInt(c)<0){return}b.style.width=zk.ie6_?"0px":"";b.style.width=c},doMouseOver_:function(b){this._bOver=true;this._noFloatUp=false;this.$supers("doMouseOver_",arguments)},doMouseOut_:function(b){this._bOver=false;this._closeOnOut();this.$supers("doMouseOut_",arguments)},_onOver:function(c){this._bOver=true;if(!this.checkScrollable()){return}var b=c.domTarget,e=this.$n(),f=this.$n("left"),d=this.$n("right"),g=this.getZclass();if(f==b){jq(f).addClass(g+"-left-scroll-over")}else{if(d==b){jq(d).addClass(g+"-right-scroll-over")}}},_onOut:function(c){this._bOver=false;if(!this.checkScrollable()){return}var b=c.domTarget,e=this.$n(),f=this.$n("left"),d=this.$n("right"),g=this.getZclass();if(f==b){jq(f).removeClass(g+"-left-scroll-over")}else{if(d==b){jq(d).removeClass(g+"-right-scroll-over")}}},_doScroll:function(b){var c=b.domTarget;this._scroll(c.id.endsWith("left")?"left":"right")},_scroll:function(e){if(!this.checkScrollable()||this._runId){return}var c=this;body=this.$n("body"),currScrollLeft=body.scrollLeft,childs=jq(this.$n("cave")).children(),childLen=childs.length,movePos=0;if(!childLen){return}switch(e){case"left":for(var d=0;d<childLen;d++){if(childs[d].offsetLeft>=currScrollLeft||childs[d].offsetLeft+(childs[d].offsetWidth-body.offsetWidth)>=currScrollLeft){var g=childs[d].previousSibling;if(!g){return}movePos=currScrollLeft-(currScrollLeft-g.offsetLeft);if(isNaN(movePos)){return}c._runId=setInterval(function(){if(!c._moveTo(body,movePos)){clearInterval(c._runId);c._runId=null}},10);return}}break;case"right":var f=currScrollLeft+body.offsetWidth;for(var d=0;d<childLen;d++){var b=childs[d].offsetLeft+childs[d].offsetWidth;if(b>f){movePos=currScrollLeft+(b-f);if(isNaN(movePos)){return}c._runId=setInterval(function(){if(!c._moveTo(body,movePos)){clearInterval(c._runId);c._runId=null}},10);return}}break}},_moveTo:function(b,d){var f=b.scrollLeft,e=5;if(f==d){return false}if(f>d){var c=f-e;b.scrollLeft=c<d?d:c;return true}else{var c=f+e;b.scrollLeft=c>d?d:c;return true}return false},insertChildHTML_:function(d,b,c){if(b){jq(b.$n("chdextr")||b.$n()).before(this.encloseChildHTML_({child:d,vertical:"vertical"==this.getOrient()}))}else{jq(this.$n("cave")).append(this.encloseChildHTML_({child:d,vertical:"vertical"==this.getOrient()}))}d.bind(c)},removeChildHTML_:function(b){this.$supers("removeChildHTML_",arguments);jq(b.uuid+"-chdextr",zk).remove()},encloseChildHTML_:function(d){var c=d.out||[],e=d.child,b=d.vertical;if(b){c.push('<tr id="',e.uuid,'-chdextr"');if(e.getHeight()){c.push(' height="',e.getHeight(),'"')}c.push(">")}e.redraw(c);if(b){c.push("</tr>")}if(!d.out){return c.join("")}},_closeOnOut:function(){var b=this;if(b._autodrop&&!zul.Widget.getOpenTooltip()){setTimeout(function(){a(b)},200)}}})})();