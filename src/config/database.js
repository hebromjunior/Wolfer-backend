module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
    database: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
    },
}