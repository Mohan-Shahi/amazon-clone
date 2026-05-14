let cart_number = document.querySelector('#cart-number')


let item_count  = JSON.parse(localStorage.getItem('item_count'))||[]
let product_list = JSON.parse(localStorage.getItem('product_list'))||[];



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
                    <div class="quantity">
                        <select name="" id="number-menu">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
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
        
        btn.addEventListener('click',()=>{
            message_popup(btn)
            
        })
    })
    cart_number.innerText = item_count.length
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
    let index = btn.dataset.index

    let number_menu = btn.closest('.card').querySelector('#number-menu')

    let quantity = Number(number_menu.value)
    console.log(quantity)

    let exist_item = product_list.find(item =>
        item.id == products[index].id 
    )

    if(exist_item){
        exist_item.quantity += quantity
    }
    else {
        product_list.push({ quantity: quantity, id: products[index].id})

    }
    for(let i=1 ;i<=quantity ;i++){
        item_count.push(products[index].id)
    }
    cart_number.innerText = item_count.length
    store();   
}

let store = ()=>{
    localStorage.setItem('product_list',JSON.stringify(product_list))
    localStorage.setItem('item_count',JSON.stringify(item_count))
    
}

function onload(){
    product_render();
    add_to_cart()
    
}
console.log(product_list)
onload()

console.log(item_count)