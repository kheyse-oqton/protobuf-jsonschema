#!/usr/bin/env node

const commander = require('commander');
const compile = require('./');
const yaml = require('js-yaml');
const path = require('path');

commander
  .version(require('./package.json').version)
  .arguments('<file> [model]')
  .option('-f, --format [format]', 'output format: json or yaml [json]', 'json')
  .option('-I, --import [dir]', 'directory to search for imports (repeatable)', collect, [])
  .action((file, model) => {
    const format = commander.format || 'json';
    const imports = commander.import;
    const result = compile(file, model, imports);

    if (format === 'json') { process.stdout.write(`${JSON.stringify(result, false, 2)}\n`); } else if (format === 'yaml') { process.stdout.write(yaml.dump(result, { noRefs: true })); }
  })
  .parse(process.argv);

function collect(val, memo) {
  memo.push(val);
  return memo;
}
