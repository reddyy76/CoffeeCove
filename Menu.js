//! filterItems

function filterItems(category) {
    let cards = document.querySelectorAll('.card')
    let buttons = document.querySelectorAll("#filter_btns>button")

    cards.forEach((card)=>{
        if(category == 'all'){
            cart.style.display = "flex"
        }else{
            if(card.classList.contains(category)){
                card.style.display = "flex"
            }else{
                card.style.display = "none"
            }
        }
    })

    buttons.forEach((btn) => {
        btn.classList.remove("active")
    })
    event.target.classList.add("active")
}

//! Cart Quantity
let cart = [];
let cards = document.querySelectorAll(".card")

cards.forEach((card)=>{
    let name = card.querySelector(".card_one>.card_info>h4").innerText
    let price = card.querySelector(".card_one>.card_info>p").innerText.replace("₹","")
    let quantity = card.querySelector(".card_two>.card_quantity>.quantity")

    let plus = card.querySelector(".plus")
    plus.addEventListener("click",()=>{
        quantity.innerText = Number(quantity.innerText) + 1
    })

    let minus = card.querySelector(".minus")
    minus.addEventListener("click",()=>{
        let current = Number(quantity.innerText)
        if(current > 0){
            quantity.innerText = current - 1
        }
    })

//! AddToCart
let addBtn = card.querySelector(".addToCart > button")
addBtn.addEventListener("click",()=>{
    let qty = Number(quantity.innerText)
    if(qty > 0){
        let existingItem = cart.find(item => item.name == name)
        if(existingItem){
            existingItem.qty += qty
        }
        else{
            cart.push({name,qty,price})
            addBtn.style.background = "orangered"
        }
        quantity.innerText = 0
        updateCart()
    }else{
        alert("Please Add Min 1 Item") 
    }
})
})

//! updateCart()
function updateCart(){
    let totalQty = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
        totalQty += item.qty
        totalPrice += item.price * item.qty
    })

    let cart_qty = document.getElementById("cart_quatity")
    let cart_price = document.getElementById("cart_price")

    cart_qty.innerText = totalQty
    cart_price.innerText = `₹${totalPrice.toFixed(2)}`


    let slidebar_items = document.querySelector("#slidebar_items")
    slidebar_items.innerHTML = ""
    cart.forEach((item, index) => {
        slidebar_items.innerHTML += `
        <div class="slidebar_item">
            <h1>${item.name}</h1>
            <p>Quantity: ${item.qty}</p>
            <p>Price: ₹${item.price} x ${item.qty} = <b>₹${(item.price * item.qty).toFixed(2)}</b></p>
            <button class="removeBtn" item_index="${index}">Remove</button>
        </div>
        `
    })
    
    if(cart.length > 0){
        slidebar_items.innerHTML += `
            <div class="cart_summary">
                <h2>Total Quantity : ${totalQty}</h2>
                <h2>Total Price : ${totalPrice.toFixed(2)}</h2>
            </div>
        `
    }

    //! Delete Items Functionality
    let removeBtn = document.querySelectorAll(".removeBtn")
    removeBtn.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            let index = e.target.getAttribute("item_index")
            cart.splice(index,1)
            updateCart()
        })
    })
}

//! Buy Now button logic
document.addEventListener("DOMContentLoaded", () => {
    let buyBtn = document.getElementById("buyBtn");

    buyBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty");
        } else {
            alert("Thank you for your purchase !");
            cart = [];
            updateCart();
        }
    });
});



//! SlideBar 

let cart_icon = document.getElementById("cart_icon")
let slidebar = document.getElementById("slidebar")
cart_icon.addEventListener("click",()=>{
    slidebar.style.right = "0px"
})

let close_slidebar = document.getElementById("close_slidebar")
close_slidebar.addEventListener("click",()=>{
    slidebar.style.right = "-350px"
})


//! NavBar List

let nav_img = document.querySelector("#nav_one > img")
let navbar_list = document.getElementById("navBar_list")

nav_img.addEventListener("click", () => {
        nav_img.addEventListener("click", () => {
            navbar_list.style.left = "0px"
        })
})

