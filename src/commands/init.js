var fs = require("fs");
const { Command, flags } = require("@oclif/command");

const defaultConfig={
      HASURA_HOST:"http://localhost:8080",
      MQTT_HOST:"http://127.0.0.1:1883",
      DEVICE_COUNT:10,
      FREQUENCY:1000
    }
class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);
    const name = flags.name || "world";

    fs.appendFile("config.json", JSON.stringify(defaultConfig), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    this.log(
      `hello ${name} from /Users/sooraj/dev/personal/hasura-connect2/hasura-connect/src/commands/init.js`
    );
  }
}

InitCommand.description = `Describe the command here
...
Extra documentation goes here
`;

InitCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = InitCommand;
