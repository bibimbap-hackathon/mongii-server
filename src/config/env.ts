import { config } from 'dotenv';

config();

const countPerPage = Number(process.env.countPerPage);

export { countPerPage };
