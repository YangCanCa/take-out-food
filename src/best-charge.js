const loadAllItems = require('../src/items.js');
const  loadPromotions =   require('../src/promotions.js');

 var  allItems=loadAllItems();
module.exports =function bestCharge(selectedItems) {
  let goods =CaculateSubtotal(selectedItems);
  let bestchoice=ChooseCharge(goods);
  let totalSum=CalculateTotalSum(goods,bestchoice);
   Print(goods,bestchoice,totalSum);


 function CaculateSubtotal(Inputs){
    let goods = [];

   
    for(let item of Inputs){
        let array = item.split("x",2);
        let price=findPrize(allItems,array[0]);
        goods.push({id:array[0],count:array[1],subtotal:price*array[1]});//price is undefined, but findPrize is true.
    } 
    //分开字符,
        
    //计算优惠前小计
    return goods;
}

function findPrize(collection,ch){
    for(let item of collection){
        if(ch===item.id){
            return item.price;
        }
    }
}
// 查找价格
function summarize(collection){
    let sum=0;
     for(let item of collection){
        sum+=item.subtotal;
    }
}//计算优惠前的zong'ji总价
function ChooseType1(collection){
    let total=summarize(collection);
    if(total>=30){
        return 6;
    }
    else return 0;
}//计算第一种优惠方式
function ChooseType2(collection1,collection2){
    let discount=0;
    for(let item of collection1 ){
        for(let alldisitems of collection2){
            if(item.id  ===alldisitems){
               //如何添加对象shu'xi属性
                discount+=item.subtotal/2;
            }
        }
    }
    return discount;
}//计算第二种优惠方式
function ChooseCharge(collection){
    let bestchoice=[];
    let promotions=loadPromotions();
    let discount1=ChooseType1(collection);
    let discount2=ChooseType2(collection,promotions[1].items)
    if ((discount1!=0)||(discount2.discount!=0)){
        if(discount1>discount2.discount){
            bestchoice.push({type:promotions[0].type,discount:discount1});
            /*object.defineproperty(bestchoice,"type",promotions[0].type);如果bestchoice定义为对象，用这种方法用来对象输入新的属性及值，总是报错
            object.defineproperty(bestchoice,"discount",discount1);*/
           }
         else {
           bestchoice.push({type:promotions[1].type,discount:discount2});// bestchoice["type"]=promotions[1].type;
          /*object.defineproperty(bestchoice,"type",promotion[1].type);如果bestchoice定义为对象，用这种方法用来对象输入新的属性及值，总是报错
        /bestchoice["diacount"]=discount2;//object.defineproperty(bestchoice,"discount",discount2);*/
           
         }
        /* else if(discount1==discount2.discount){
             相同如何输出
         }*/
         
    }
    else {
       bestchoice.push({type:null,discount:0});//bestchoice["type"]=null; //object.defineproperty(bestchoice,"type",null);
        //bestchoice["discount"]=0;//object.defineproperty(besthoice,"discount",0);
}

    return bestchoice;
}
//选择优惠方式
function CalculateTotalSum(collection,object){
    return summarize(collection)-object.discount;
    
}
//优惠后总价
function Print(collection,object,total){

  
     console.log("============= 订餐明细 =============");
     
     for(let item of collection){
     console.log(findName(allItems,item.id)+"x"+item.count+"="+item.subtotal+"元");//+"x"+item.count+"="+item.subtotal+"元");
     }
      console.log("-----------------------------------");
   if(object.type){
        console.log("使用优惠：");
        console.log(object.type);
    if(object.type===loadPromotions()[0].type){
        console.log("满30元减6元"+",省6元");
    }
    else if (object.type===loadPromotions()[1].type){
        console.log(object.type+"(黄焖鸡，凉皮)省"+object.discount+"元");
   }
     }  
  console.log("-----------------------------------");
  console.log("总计："+total+"元");
  console.log("===================================");
}
//输出
function findName(collection,ch){
    for(let item of collection){
        if (ch===item.id){
            return item.name;
        }
    }
}//输出菜名

}