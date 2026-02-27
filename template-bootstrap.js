import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const REQUIRED_ARGS = ['appName', 'clientId', 'redirectUri', 'sentryDsn'];

const { values } = parseArgs({
    options: {
        appName: { type: 'string' },
        clientId: { type: 'string' },
        redirectUri: { type: 'string' },
        sentryDsn: { type: 'string' },
        help: { type: 'boolean', short: 'h' },
    },
    strict: true,
    allowPositionals: false,
});

const usageMessage = `Usage example:

  node template-bootstrap.js \\
    --appName my-app \\
    --clientId my-client-id \\
    --redirectUri "https://example.com/callback" \\
    --sentryDsn "https://abc123.ingest.sentry.io/42"`;

if (values.help) {
    console.log(usageMessage);
    process.exit(0);
}

const missingArgs = REQUIRED_ARGS.filter(argName => {
    const value = values[argName];
    return typeof value !== 'string' || value.length === 0;
});
if (missingArgs.length > 0) {
    console.error(`\x1b[31mMissing required arguments: ${missingArgs.join(', ')}\x1b[0m`);
    console.error('');
    console.error(usageMessage);
    process.exit(1);
}
await updatePackageJson(values.appName);
await updateIndexHtml(values.appName);

await updateProductionEnv(values.clientId, values.redirectUri, values.sentryDsn);

console.log('Configuration updated successfully.');

async function updatePackageJson(appName) {
    const packageJsonPath = new URL('./package.json', import.meta.url);
    const packageJsonRaw = await readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonRaw);

    packageJson.name = appName;

    await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 4)}\n`, 'utf8');
}

async function updateIndexHtml(appName) {
    const indexHtmlPath = new URL('./index.html', import.meta.url);
    const indexHtml = await readFile(indexHtmlPath, 'utf8');

    const escapedTitleAppName = escapeHtml(appName);
    const updatedHtml = indexHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>RIO | ${escapedTitleAppName}</title>`);

    if (updatedHtml === indexHtml) {
        throw new Error('Could not find <title> tag in index.html');
    }

    await writeFile(indexHtmlPath, updatedHtml, 'utf8');
}

async function updateProductionEnv(clientId, redirectUri, sentryDsn) {
    const envPath = new URL('./.env.production', import.meta.url);

    let content = await readFile(envPath, 'utf8');
    content = setEnvValue(content, 'VITE_LOGIN_CLIENT_ID', clientId);
    content = setEnvValue(content, 'VITE_LOGIN_REDIRECT_URI', redirectUri);
    content = setEnvValue(content, 'VITE_LOGIN_SILENT_REDIRECT_URI', redirectUri);
    content = setEnvValue(content, 'VITE_SENTRY_DSN', sentryDsn);

    await writeFile(envPath, content, 'utf8');
}

function setEnvValue(content, key, value) {
    const escapedKey = escapeRegex(key);
    const linePattern = new RegExp(`^${escapedKey}=.*$`, 'm');
    const replacement = `${key}=${value}`;

    if (linePattern.test(content)) {
        return content.replace(linePattern, replacement);
    }

    const needsTrailingNewline = content.length > 0 && !content.endsWith('\n');
    const separator = needsTrailingNewline ? '\n' : '';
    return `${content}${separator}${replacement}\n`;
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
