const {Command, flags} = require('@oclif/command')

class ConnectCommand extends Command {
  async run() {
    const {flags} = this.parse(ConnectCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/sooraj/dev/personal/hasura-connect2/hasura-connect/src/commands/connect.js`)
  }
}

ConnectCommand.description = `Describe the command here
...
Extra documentation goes here
`

ConnectCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ConnectCommand
