#!/usr/bin/env node

const tencentCloud = require("tencentcloud-sdk-nodejs");
const {Command} = require('commander');

const CdnClient = tencentCloud.cdn.v20180606.Client;
const program = new Command();

program
  .requiredOption('-i, --secretId <value>', 'tencent secretId, String.')
  .requiredOption('-k, --secretKey <value>', 'tencent secretKey, String.')
  .requiredOption('-u, --urls [value...]', 'urls list, Array Of String.')
program.parse();

const options = program.opts();

const clientConfig = {
  credential: {
    secretId: options.secretId, secretKey: options.secretKey,
  }, profile: {
    httpProfile: {
      endpoint: "cdn.tencentcloudapi.com",
    },
  },
};

const client = new CdnClient(clientConfig);
const params = {
  "Paths": options.urls, "FlushType": "delete" //flush：刷新产生更新的资源 delete：刷新全部资源
};

client.PurgePathCache(params).then((data) => {
  console.log(data);
}, (err) => {
  console.error("error", err);
});