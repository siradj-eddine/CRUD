let title = document.getElementById("title");
let category = document.getElementById("category");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let total =document.getElementById("total");
let btnCreate = document.getElementById("btn-create");
let btnDeleteAll = document.getElementById("btn-delete-all");
let count = document.getElementById("count");



let i;
let mood='create'
let temp;



let products;

    if(localStorage.products!=null)
        {
            products=JSON.parse(localStorage.products);
        }else{
            products=[]
        }

     // getTotal
        
function getTotal(){
    if(price.value!=""){
        let result = +price.value + +ads.value + +taxes.value;
        total.innerHTML=`total : ${result}`
        total.style.backgroundColor='green'
    }else{
        total.innerHTML=`total:`
        total.style.backgroundColor='#780606'
    }
    showData()
}

// createData




 btnCreate.onclick= function create () {
    
    
    // Object

    if(title.value!=""){
        
      let product = {
    title: title.value,
    category: category.value,
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    total: total.innerHTML,
    }

    // buttom create or update

if(mood==='create')
  {
    // number of elements want to create
    if(count.value>1)
      {
        for(let i=0;i<count.value;i++)
         {
            products.push(product)
         }
      }
    else  
      {
         products.push(product)
      }
    }
else
  {
    products[temp]=product;
    mood='create';
    btnCreate.innerHTML=`create`;
  }


// localStorage


localStorage.setItem('products',JSON.stringify(products));
console.log(products);
showData();
clearData();
    }
}

// showData

function showData(){
    let table=''
   
    
    for( let i=0;i<products.length;i++){
       
       table+=`
            <tr>
              <td style="padding-left:40px;">${i+1}</td>
              <td style="padding-left:40px;">${products[i].title}</td>
              <td style="padding-left:40px;">${products[i].category}</td>
              <td style="padding-left:40px;">${products[i].price}</td>
              <td style="padding-left:40px;">${products[i].ads}</td>
              <td style="padding-left:40px;">${products[i].taxes}</td>
               <td style="padding-left:40px;">${products[i].total}</td>
               <td><button id="update-1" style="width:90%; border-radius:15px; border:none; " onclick="updateData(${i})" >update</button></td>
               <td><button id="delete-1" style="width:90%; border-radius:15px; border:none; " onclick="delete1(${i})" >delete</button></td>
            </tr>
            `
       
    }
    document.getElementById("table").innerHTML=table;
    if(products.length < 1){
        btnDeleteAll.style.display="none";
    }
    else{
        btnDeleteAll.style.display="flex";
        btnDeleteAll.innerHTML= `delete all (${products.length})`
    }
   
}
showData()
 
// clearData


function clearData ()
{
     title.value='';
     category.value='';
     price.value='';
     ads.value='';
     taxes.value='';
     count.value='';
}

// deleteAllData

btnDeleteAll.onclick = function deleteAllData(){
    products=[];
    localStorage.products = JSON.stringify(products)
    showData();
}

// delete-1

function delete1(i){
    
    products.splice(i,1);
    localStorage.products = JSON.stringify(products);
    showData();

}


// updateData
function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    ads.value = products[i].ads;
    taxes.value = products[i].taxes;
    total.innerHTML = `total : ${products[i].total}`;
    category.value = products[i].category;
    mood='update';
    btnCreate.innerHTML=`update`;
    temp=i;
   
}