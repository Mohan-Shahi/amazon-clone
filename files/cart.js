
const Estimated_tax = 10

let product_object= []
let saved_value;

const days= [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let futureDate_two = new Date()
futureDate_two.setDate(futureDate_two.getDate()+2)
// console.log(futureDate_two)
let month_two = months[futureDate_two.getMonth()]
// console.log(month_two)
let day_two = days[futureDate_two.getDay()]
// console.log(day_two)
let date_two = futureDate_two.getDate()
// console.log(date_two)

let futureDate_four = new Date()
futureDate_four.setDate(futureDate_four.getDate()+4)
// console.log(futureDate_four)
let month_four = months[futureDate_four.getMonth()]
// console.log(month_four)
let day_four = days[futureDate_four.getDay()]
// console.log(day_four)
let date_four = futureDate_four.getDate()
// console.log(date_four)

let futureDate_ten= new Date()
futureDate_ten.setDate(futureDate_ten.getDate()+10)
// console.log(futureDate_ten)
let month_ten = months[futureDate_ten.getMonth()]
// console.log(month_ten)
let day_ten = days[futureDate_ten.getDay()]
// console.log(day_ten)
let date_ten = futureDate_ten.getDate()
// console.log(date_ten)



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
    
    
    // console.log(product_object)
    
    
    
    let card_display = document.querySelector('.card-container')
    
    let newhtml = '';
    if(product_object.length<1){
        newhtml = `
        <div class="card" style = "border:none;">
                    <p>Your cart is empty</p>
                    <a href="/files/amazon.html"><button>View Product</button></a>                    
                </div>`
    }
    else{
        for(let i = 0;i<product_object.length;i++){
            saved_value =  JSON.parse(localStorage.getItem(`delivery-${i}`))|| day_ten+', '+month_ten+' '+date_ten ;
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
                                    <p class="ud" data-index = ${i}>delate</p>
                                </div>
                            </div>
                            <div class="option">
                                <div class="head1">Choose a delivery option:</div>
                                <div class="option-1">
                                    <input type="radio"
                                        name="date-${i}"
                                        value="${day_ten+', '+month_ten+' '+date_ten}"
                                        ${saved_value === day_ten+', '+month_ten+' '+date_ten
                                            ? 'checked' : ''}>
                                        <div>
                                        <p class="p1">${day_ten+', '+month_ten+' '+date_ten}</p>
                                        <p class="p2">FREE Shipping</p>
                                        </div>
                                </div>
                                
                                <div class="option-2">
                                    <input type="radio"
                                        name="date-${i}"
                                        value="${day_four+', '+month_four+' '+date_four}"
                                        ${saved_value === day_four+', '+month_four+' '+date_four
                                            ? 'checked' : ''}>
                                        <div>
                                        <p class="p1">${day_four+', '+month_four+' '+date_four}</p>
                                        <p class="p2">$4.99 - Shipping</p>
                                        </div>
                                </div>
                               
                                <div class="option-3">
                                    <input type="radio"
                                        name="date-${i}"
                                        value="${day_two+', '+month_two+' '+date_two}"
                                        ${saved_value === day_two+', '+month_two+' '+date_two
                                            ? 'checked' : ''}>
                                        <div>
                                        <p class="p1">${day_two+', '+month_two+' '+date_two}</p>
                                        <p class="p2">$9.99 - Shipping</p>
                                        </div>
                                 </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
            `
    }
}
card_display.innerHTML = newhtml;

}
console.log(saved_value)


function delate(){
    const deletebtn = document.querySelectorAll('.ud')
    console.log(deletebtn)
    deletebtn.forEach(btn =>{
        const index = btn.dataset.index
        btn.onclick = ()=>{
            console.log(product_list.splice(index,1))
            localStorage.setItem('product_list',JSON.stringify(product_list))
            product_display()
            calculation()
            select_radio()
        }
    })
}




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
            calculation()
        });
            
        });

}
function calculation(){

    let total_quantity = 0;
    let total_price = 0;
    let total_shipping_amount = 0;
    let final_total = 0


    let tendaystring = day_ten+', '+month_ten+' '+date_ten;
    let fourdaystring = day_four+', '+month_four+' '+date_four;

    for(let i = 0; i < product_object.length; i++){

        total_quantity += product_object[i].quantity;

        total_price +=
        (product_object[i].priceCents / 100) *
        product_object[i].quantity;

        let saved_delivery =
        JSON.parse(localStorage.getItem(`delivery-${i}`)) || tendaystring;


        if(saved_delivery === tendaystring){
            total_shipping_amount += 0;
        }
        else if(saved_delivery === fourdaystring){
            total_shipping_amount += 4.99;
        }
        else{
            total_shipping_amount += 9.99;
        }
    }
    total_price = Number(total_price.toFixed(2))

    let total_before_tax = total_price + total_shipping_amount
    total_before_tax = total_before_tax.toFixed(2)
    total_before_tax = Number(total_before_tax)


    let tax_amount = (total_before_tax*Estimated_tax)/100
    tax_amount = tax_amount.toFixed(2)
    tax_amount = Number(tax_amount)

    final_total = Number((total_before_tax + tax_amount).toFixed(2))
    let item_number_display = document.getElementById('item_number')
    item_number_display.innerText =` ${total_quantity} items`
    

    const calculation_display = document.querySelector('.calculation-container')

    calculation_display.innerHTML = `
                <div class="title">Order Summary</div>
                <div class="item">
                    <div id="item">Items (${total_quantity}):</div>
                    <div id="item_calculation">$${total_price}</div>
                </div>
                <div class="shipping">
                    <div id="shipping">Shipping & handling:</div>
                    <div id="shipping_calculation">$${total_shipping_amount}</div>
                </div>
                <div class="Total">
                    <div id="Total">Total before tax:</div>
                    <div id="Total_calculation">$${total_before_tax}</div>
                </div>
                <div class="tax">
                    <div id="tax">Estimated tax (10%):</div> 
                    <div id="tax_calculation">$${tax_amount}</div>
                </div>
                <div class="final_total">
                    <div id="final_total">Order total:</div>
                    <div id="final_total_calculation">$${final_total}</div>
                </div>
                <button class="btn">Place your order</button>
    `
    delate()
}

function onload2(){
    product_display();
    select_radio();
    calculation()
    delate();
}
onload2()


