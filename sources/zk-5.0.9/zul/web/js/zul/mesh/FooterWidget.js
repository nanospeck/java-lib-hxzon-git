zul.mesh.FooterWidget=zk.$extends(zul.LabelImageWidget,{_span:1,$define:{span:function(a){var b=this.$n();if(b){b.colSpan=a}},align:function(a){var b=this.$n();if(b){b.align=a}},valign:function(a){var b=this.$n();if(b){b.vAlign=a}}},getMeshWidget:function(){return this.parent?this.parent.parent:null},getHeaderWidget:function(){var a=this.getMeshWidget();if(a){var b=a.getHeadWidget();if(b){return b.getChildAt(this.getChildIndex())}}return null},getAlignAttrs:function(){return(this._align?' align="'+this._align+'"':"")+(this._valign?' valign="'+this._valign+'"':"")},domStyle_:function(b){var a="";if(zk.ie8&&this._align){a+="text-align:"+this._align+";"}return a+this.$super("domStyle_",b)},domAttrs_:function(){var a=this.getHeaderWidget(),b;if(a){b=a.getColAttrs()}if(this._align||this._valign){b=this.getAlignAttrs()}return this.$supers("domAttrs_",arguments)+(this._span>1?' colspan="'+this._span+'"':"")+(b?" "+b:"")},deferRedrawHTML_:function(a){a.push("<td",this.domAttrs_({domClass:1}),' class="z-renderdefer"></td>')}});