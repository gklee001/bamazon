This application is similar to an Amazon-like storefront! You can order products and update inventory.

Programs/packaged used:
MySQL
Javascript
Inquirer npm packages


How to use the app:
On gitbash/terminal, you will run: "node bamazonCustomer.js" From here you will receive a list of products. You will then be prompted to select an item, based on the ID number corresponding to the left. Here is a screenshot of that:

![](./assets/images/item%20list%20+%20buy.JPG)


If you select and item, and try to purchase more units than is listed, you will get a text that says "Sorry, the maximum quanity you can purchase is = x"
Here is a screenshot of that:

![](./assets/images/not%20enough%20quantity.JPG)

You will be asked to select a new ID, once you select a new ID and quanity, you will be updated on your completed order, and shown the quanity for x price. Here is a screenshot of that:

![](./assets/images/quantity%20and%20price.JPG)



Once that is complete, in MySQL, you can pull up the bamazon database and select that table and run it and it will show you the updated quantity, here is a screenshot of that:

![](./assets/images/updated%20on%20mysql.JPG)

And that is how my application works!
