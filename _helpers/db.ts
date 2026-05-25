import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/accounts-model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

export const dbReady: Promise<void> = initialize().catch(err => {
    console.error('DB initialization failed:', err.message);
    console.error('DB_HOST:', process.env.DB_HOST);
    console.error('DB_PORT:', process.env.DB_PORT);
});

async function initialize() {
    const host = process.env.DB_HOST!;
    const port = parseInt(process.env.DB_PORT || '3306');
    const user = process.env.DB_USER!;
    const password = process.env.DB_PASSWORD!;
    const database = process.env.DB_NAME!;

    console.log('Connecting to DB at:', host, port);

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql',
        pool: {
            max: 2,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    await sequelize.sync();
    console.log('DB initialized successfully');
}