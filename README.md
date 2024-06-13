# Airbean-API-individual

### userId hittas i users.db efter att en användare har registrerats. Id:n är fyra siffror.

## HTTP anrop som admin - dessa är skyddade genom att bara users med role: admin kan utföra dessa punkter.

### POST ny product till meny- http://localhost:8080/addproduct?userid=:userId

### JSON body. Välj de punkter som ska uppdateras (title, desc, price):
### {
### "id": :id // Antal tecken min 1
### "title": "new title",
### "desc": "new description",
### "price": new price
### }

### PUT redigera produkt i menyn- http://localhost:8080/updateproduct/:id?userid=:userId

### JSON body. Välj de punkter som ska uppdateras (title, desc, price):
### {
### "title": "new title",
### "desc": "new description",
### "price": new price
### }

### DELETE produkt från menyn- http://localhost:8080/deleteproduct/:id?userid=:userId

### POST ny erbjudande - http://localhost:8080/offer?userid=:userId

### JSON body:
### {
### "products": [:id, :id], //en eller flera produkter i arrayn. Minst 2 st.
### "offerPrice": offerPrice, //i siffror
### "title": "offer title",
### "description": "offer description"
### }


## HTTP anrop som anvädare

### GET menu - http://localhost:8080/menu

### GET info - http://localhost:8080/info

### POST register account - http://localhost:8080/register

### JSON body:
### {
###	"username": "username", //Antal tecken min 5 max 10
###	"password": "password", //Antal tecken min 8
###	"email": "email@mail.com",
### "role": "admin or user"
### }

### POST login - http://localhost:8080/login
### JSON body:
### {
###	"username": "username", //antal tecken min 5 max 10.
###	"password": "password" //antal tecken min 8
### }

### PUT update account info - http://localhost:8080/update-account

### JSON body:
### {
### "userId": "userId", (required)
###	"username": "username", (skrivs in body om man vill ändra det) //Antal tecken min 5 max 10
###	"password": "password", (skrivs in body om man vill ändra det) //Antal tecken min 8
###	"email": "email@mail.com" (skrivs in body om man vill ändra det)
### }

### POST add to cart by product id - http://localhost:8080/cart/add/:userID/:id

### DELETE from cart by product id - http://localhost:8080/cart/remove/:userID/:id

### GET cart by userId - http://localhost:8080/cart?userId=:userId

### DELETE whole cart - http://localhost:8080/cart/clear/:userId

### POST create order - http://localhost:8080/order/create/:userId

### GET order confirmation - http://localhost:8080/confirmation/:userId

### GET order history - http://localhost:8080/order-history/:userId

### Om man inte har ett konto och inte vill skapa ett - används 'guest' istället för userId