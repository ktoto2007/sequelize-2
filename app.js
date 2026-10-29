const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'storage/database.sqlite'
});

const Author = sequelize.define('authors', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
})

const Book = sequelize.define('books', {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    genre: DataTypes.STRING
})

Author.hasMany(Book)
Book.belongsTo(Author)

// sequelize.sync({ force: true })

async function createAuthor() {
    const author = await Author.create({
        name: 'Пушкин',
        country: 'Россия'
    });
    const book = await author.createBook({
        title: 'Евгений Онегин',
        year: 1831,
        genre: 'Роман'
    })
    console.log(book.toJSON())
}

createAuthor()

async function getAuthors() {
    const authors = await Author.findAll({
        include: Book
    })
    console.log(JSON.parse(JSON.stringify(authors)))
}

getAuthors()