/**
 * Created by Administrator on 2017/10/23.
 */

new Vue({
    el:"#app",
    data:{
        msg:"你好呀，买买买~",
        itemList:[],
	    currentProduct:'',
	    deleteFlag:false,
	    isActive: true,
	    hasError:0,
	    url:''
    },
    mounted:function () {
        this.getData();
        //Q： 钩子的用法
    },

    computed: {
        allChecked: {
            get: function(){
              return this.checkedCount == this.itemList.length;
            },
            set: function(value){
              this.itemList.forEach(function(item){
                item.checked = value
              });
              // console.log(value);//true
              return value;
            }
        },
        checkedCount: {
            get: function(){
	              var i = 0;
	              this.itemList.forEach(function(item){
	                  if(item.checked == true) i++;
	              });
	              return i;
            }
        },

        calTotalCost:{
        	get:function () {
		        var totalCost = 0;
		        this.itemList.forEach(function (item,index) {
			        if(item.checked){
				        totalCost += item.productPrice * item.counter;
			        }
		        });
		        return totalCost;
	        }
        },

		calTotalAmount:{
			get: function () {
				var totalAmount = 0;
				this.itemList.forEach(function (item, index) {
					if(item.checked){
						totalAmount += item.counter;
					}
				});
				return totalAmount;
			},
		}
    },

    methods:{
        getData: function () {
            var _this = this;
            _this.$http.get("data/cartData.json").then(function(res){
                for(var i=0, len=res.body.data.list.length; i<len; i++){
                   var productList = res.body.data.list[i];
                   _this.itemList.push(productList);
                }
            });
        },
        amountChange:function (item, pm) {
            if( pm>0 ){
                item.counter++;
            }else {
                item.counter--;
                if(item.counter < 1){
                  item.counter = 1;
                }
            }
        },

//         //注册一个字段 Vue.$set(obj, key, value)
//         selectProduct:function (item) {
//             if (typeof item.checked =='undefined'){
//                 this.$set(item, 'checked', true)
//             }else {
//                 item.checked = !item.checked;
//             }
//         },

		deleteConfirm: function (item) {
			this.deleteFlag = true;
			this.currentProduct = item;
		},
		removeProduct: function (index) {
			// console.log(index);
			this.itemList.splice(index, 1);
			this.deleteFlag = false;
		},

	    toLink:function (fn) {
			    var href = '';
			    if(fn>0){
				    console.log('跳转成功');
				    this.isActive = false;
				    href = 'address.html';
			    }else {
				    this.isActive = true;
				    href = 'javascript:void(0)'
			    }
			    return href;
		    }


/*        selectAllProduct:function () {
            var _this = this;
            if(this.selectAllFlag){
                // console.log('说好的全选呢...');
                this.checkboxModel = [];
            }else{
                // console.log('咋就变成全选了');
                this.checkboxModel=[];
                _this.itemList.forEach(function (item,index) {
                    _this.checkboxModel.push(item.productId);
              });
            }
        },*/

    },
/*    watch:{
        'checkboxModel':{
            handler:function () {
                if(this.checkboxModel.length === this.itemList.length){
                    this.selectAllFlag = true;
                }else {
                    this.selectAllFlag = false;
                }
            }
        },
        deep:true
    },*/
});


