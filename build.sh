#!/bin/bash
npm run build:prod && tar -zcvf dist.tgz dist && scp dist.tgz ubuntu@myzhxx.com:

