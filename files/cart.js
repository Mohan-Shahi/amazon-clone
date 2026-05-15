
let product_object= []



let product_display = ()=>{
    product_object = product_list.map(item =>{

        let product = products.find(product_item=>{
            return product_item.id == item.id 
        })
        return {
            ...product,
            quantity:item.quantity
        }
    })

    let item_number_display = document.getElementById('item_number')
    item_number_display.innerText =` ${item_count.length} items`
    console.log(product_object)



    let card_display = document.querySelector('.card-container')
    
    let newhtml = '';
    for(let i = 0;i<product_object.length;i++){
        newhtml +=`
                <div class="card">
                    <div class="date">Delivery date: Tuesday, May 26</div>
                    <div class="item-detail">
                        <div class="image">
                            <img src="${product_object[i].image}" alt="">
                        </div>
                        <div class="detail">
                            <div class="name">Black and Gray Athletic Cotton Socks - 6 Pairs</div>
                            <div class="price">$${product_object[i].priceCents/100}</div>
                            <div class="quantity-item">
                                <p id="quantity">Quantity: ${product_object[i].quantity}</p>
                                <p class="ud">update</p>
                                <p class="ud">delate</p>
                            </div>
                        </div>
                        <div class="option">
                            <div class="head1">Choose a delivery option:</div>
                            <div class="option-1">
                                <input type="radio" name="date" checked value="">
                                <div>
                                    <p class="p1">Tuesday, May 26</p>
                                    <p class="p2">FREE Shipping</p>
                                </div>
                            </div>
                            <div class="option-2">
                                <input type="radio" name="date" value="">
                                <div>
                                    <p class="p1">Wednesday, May 20</p>
                                    <p class="p2">FREE Shipping</p>
                                </div>
                            </div>
                            <div class="option-3">
                                <input type="radio" name="date" value="">
                                <div>
                                    <p class="p1">Monday, May 18</p>
                                    <p class="p2">FREE Shipping</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
        `
    }
    card_display.innerHTML = newhtml;
}


function onload2(){
    product_display();
}
onload2()
