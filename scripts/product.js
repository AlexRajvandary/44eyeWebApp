class Product {
    constructor(id, name, description, category, price, image, season, gender) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.season = season;
        this.gender = gender;
    }
}

module.exports = Product;
