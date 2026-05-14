let item_count  = JSON.parse(localStorage.getItem('item_count'))||[]
let product_list = [];
let product_render = ()=>{
    let product_display_container = document.querySelector('.container')
    let newHtml = '';
    for(let i = 0;i<products.length;i++){
        newHtml +=`
            <div class="card">
                    <div class="content">
                        <div class="image-container">
                        <img id="product_img" src="${products[i].image}" alt="">
                        </div>
                        <div class="name">${products[i].name}</div>
                    </div>
                    <div class="ratting">
                            <img src="images/ratings/rating-${(products[i].rating.stars)*10}.png" alt="">
                            <div class="person-to-rate">${products[i].rating.count}</div>
                    </div>
                    <div class="price">$${products[i].priceCents/100}</div>
                    <div class="quantity">10</div>
                    <div class="last-container">
                        <div class="message">
                            <i class="ri-checkbox-circle-fill"></i>
                            <div>Added</div>
                        </div>
                        <button class="btn" data-index="${i}">Add to cart</button>
                    </div>
            </div>
        `
    }
    product_display_container.innerHTML = newHtml
}

let add_to_cart = ()=>{
    const add_button = document.querySelectorAll('.btn')
    const message = document.querySelectorAll('.message')
    add_button.forEach(btn =>{
        
        btn.addEventListener('click',(e)=>{
            message_popup(btn)
            
        })
    })
}

let message_popup = (btn)=>{
    const message = btn.parentElement.querySelector('.message')
    count_display(btn);
    message.style.visibility = 'visible'
    setTimeout(() => {
        message.style.visibility = 'hidden'
    }, 2000);
}

let count_display = (btn)=>{
    let cart_number = document.querySelector('#cart-number')
    let index = btn.dataset.index
    let exist_item = product_list.find(item =>
        item.id == products[index].id 
    )
    if(exist_item){
        console.log(exist_item.quantity++)
    }
    else {
        product_list.push({quantity: 1, id: products[index].id})
        }
    
    item_count.push(products[index].id)
    cart_number.innerText = item_count.length
}




function onload(){
    product_render();
    add_to_cart()
}

onload()

