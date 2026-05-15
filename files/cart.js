
let product_object= []
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




