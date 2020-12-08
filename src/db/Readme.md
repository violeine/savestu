# Db functions 

## index.js

chứa 2 function read và update global card đang sử dụng 

`useCardState` : lấy dữ liệu của card đang sử dụng

ví dụ

```js
import {useCardState} from "../db"
const component = ()=>{
    myCard=useCardState();
    return <div>
    <h1> {{myCard.name}}</h1>
    <p> {{myCard.money}}</p>
    </div>
}
```

`useCardUpdate`: update dữ liệu của card đang sử dụng
thường sử dụng sau khi tạo transaction hoặc đổi card global


```js 
import {useCardDispatch} from "../db"
import {getCardById} from "../db/card.js"
const component = ()=>{
    updateCardGlobal=useCardDispatch();
    async function changeCardGlobalTo(id){
        data=await getCardById(id);// lấy data của card với id được truyền vào
        updateCardGlobal(data); //update với data vừa nhận được
    }
}
```

## cards.js

các function thao tác với bảng cards

`getCards`: get tất cả các cards có trong db

```js 
getCardsButton = async ()=>{
    data=await getCards();// trả về 1 mảng tất cả các card
    setSomethingUp(data) // sử dụng hook để update state với data đó
}
```
`getCardsById` : get card với id đó

```js 
    async ()=>{
        data=getCardById(1);
    }
```
`createCard`: tạo ra 1 card mới với 1 transaction là số tiền cho sẵn và trả về data

```js 
async ()=>{
    data=await createCard({name:"newCard",
                       money:10000,
                       type:"card mới",
                       note:"somenote"})
}
```

`updateCard`: update card với 1 hoặc nhiều field thay đổi
```js
async ()=>{
    data=await updateCard({name:"newName"});
}
```
