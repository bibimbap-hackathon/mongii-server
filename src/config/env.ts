import { config } from 'dotenv';

config();

const CountPerPage = Number(process.env.COUNTPERPAGE);
const GrafanaURL = String(process.env.GRAFANA_URL);
const GrafanaToken = String(process.env.GRAFANA_TOKEN);
const RemoteURL = String(process.env.REMOTE_URL);
export { CountPerPage, GrafanaURL, GrafanaToken, RemoteURL };
