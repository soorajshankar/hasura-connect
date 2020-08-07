# hasura-connect

Hasura connector with MQTT
hasura-connect cli helps us to connect MQTT broker with hasura graphql engine securely just with 2 commands.

Currently this project supports [eclipse-sparkplug ](https://www.eclipse.org/tahu/spec/Sparkplug%20Topic%20Namespace%20and%20State%20ManagementV2.2-with%20appendix%20B%20format%20-%20Eclipse.pdf) payload specification only.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/hasura-connect.svg)](https://npmjs.org/package/hasura-connect)
[![Downloads/week](https://img.shields.io/npm/dw/hasura-connect.svg)](https://npmjs.org/package/hasura-connect)
[![License](https://img.shields.io/npm/l/hasura-connect.svg)](https://github.com/soorajshankar/hasura-connect/blob/master/package.json)

<!-- toc -->

-   [Usage](#usage)
-   [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g hasura-connect
$ hasura-connect COMMAND
running command...
$ hasura-connect (-v|--version|version)
hasura-connect/0.2.3 darwin-x64 node-v14.2.0
$ hasura-connect --help [COMMAND]
USAGE
  $ hasura-connect COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

-   [`hasura-connect connect`](#hasura-connect-connect)
-   [`hasura-connect help [COMMAND]`](#hasura-connect-help-command)
-   [`hasura-connect init`](#hasura-connect-init)

## `hasura-connect connect`

Describe the command here

```
USAGE
  $ hasura-connect connect

OPTIONS
  -d, --debug  pass true to enable debugging

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/connect.js](https://github.com/soorajshankar/hasura-connect/blob/v0.2.3/src/commands/connect.js)_

## `hasura-connect help [COMMAND]`

display help for hasura-connect

```
USAGE
  $ hasura-connect help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `hasura-connect init`

Init command used to intialise hasura connect configuration

```
USAGE
  $ hasura-connect init

OPTIONS
  -c, --MQTT_CHANNEL=MQTT_CHANNEL  MQTT channel
  -h, --HASURA_HOST=HASURA_HOST    hasura host url
  -m, --MODE=MODE                  mode : sparkplug or normal
  -m, --MQTT_HOST=MQTT_HOST        mqtt host url

DESCRIPTION
  ...
```

_See code: [src/commands/init.js](https://github.com/soorajshankar/hasura-connect/blob/v0.2.3/src/commands/init.js)_

<!-- commandsstop -->