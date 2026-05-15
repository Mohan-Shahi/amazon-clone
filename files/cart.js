
let product_object= []
let saved_value;

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
    // console.log(product_object)
    
    
    
    let card_display = document.querySelector('.card-container')
    
    let newhtml = '';
    for(let i = 0;i<product_object.length;i++){
        saved_value =  JSON.parse(localStorage.getItem(`delivery-${i}`))|| 'Tuesday, May 26';
        newhtml +=`
                <div class="card">
                    <div class="date">
                    Delivery date: ${saved_value}
                    </div>
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
                                <input type="radio"
                                    name="date-${i}"
                                    value="Tuesday, May 26"
                                    ${saved_value === 'Tuesday, May 26'
                                        ? 'checked' : ''}>
                                    <div>
                                    <p class="p1">Tuesday, May 26</p>
                                    <p class="p2">FREE Shipping</p>
                                    </div>
                            </div>
                            
                            <div class="option-2">
                                <input type="radio"
                                    name="date-${i}"
                                    value="Wednesday, May 20"
                                    ${saved_value === 'Wednesday, May 20'
                                        ? 'checked' : ''}>
                                    <div>
                                    <p class="p1">Wednesday, May 20</p>
                                    <p class="p2">FREE Shipping</p>
                                    </div>
                            </div>
                           
                            <div class="option-3">
                                <input type="radio"
                                    name="date-${i}"
                                    value="Monday, May 18"
                                    ${saved_value === 'Monday, May 18'
                                        ? 'checked' : ''}>
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
console.log(saved_value)


function select_radio(){

    const radios = document.querySelectorAll(
        'input[type="radio"]'
    );
    
    radios.forEach(radio => {
        
        
        radio.addEventListener('change', (e) => {
            
            const card = e.target.closest('.card');
            
            const selected_radio = card.querySelector(
                'input[type="radio"]:checked'
            );
            
            
            const date_display = card.querySelector('.date')
            
            const name = selected_radio.name;

            date_display.innerText = `Delivery date: ${selected_radio.value}`
            const index = name.split('-')[1];


            saved_value = selected_radio.value
            localStorage.setItem(
                `delivery-${index}`,
                JSON.stringify(saved_value));
        });

    });

}


function onload2(){
    product_display();
    select_radio();
}
console.log(saved_value)
onload2()
