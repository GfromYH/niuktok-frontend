const ENV_MAP={
  dev: '28001'
}

const backendDomain = `http://${location.hostname}`;

const backEndUrl = `${backendDomain}:${ENV_MAP[ENV]}`;


export {
  backEndUrl
}