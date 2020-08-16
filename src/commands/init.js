var fs = require('fs')
const { Command, flags } = require('@oclif/command')

const getDefaultConfig = ({
	HASURA_HOST = 'http://localhost:8080',
	MQTT_HOST = 'http://127.0.0.1:1883',
	MODE = 'NORMAL',
	MQTT_CHANNEL = 'payloads/#',
}) => ({
	HASURA_HOST,
	MQTT_HOST,
	MODE,
	MQTT_CHANNEL,
})
const sparkplugConfig = {
	HASURA_HOST: 'http://localhost:8080',
	MQTT_HOST: 'http://127.0.0.1:1883',
	MODE: 'spBv1.0',
	MQTT_CHANNEL: 'spBv1.0/#',
}
var moduleData = `export function getMutation(message, topic) {
	const device_id = topic.split('/')[1]
	const timestamp = new Date().toISOString()
	console.log(message)
	return {
		query: 'mutation AddDeviceData($data: jsonb!, $device_id: String!, $timestamp: timestamptz!){insert_device_data_one(object: {data: $data, device_id: $device_id,  timestamp:$timestamp}) {id}}',
		variables: {
			data: message,
			device_id,
			timestamp: message.timestamp
				? new Date(message.timestamp).toISOString()
				: timestamp,
		},
		operationName: 'AddDeviceData',
	}
}`
// var b64moduleData =moduleData
class InitCommand extends Command {
	async run() {
		const { flags } = this.parse(InitCommand)
		const config =
			flags.MODE === 'spBv1.0' ? sparkplugConfig : getDefaultConfig(flags)

		fs.writeFile('config.json', JSON.stringify(config), (err) => {
			if (err) throw err
			fs.writeFile('parse.js', moduleData, (err) => {
				if (err) throw err
				this.log('Hasura-connect initialised successfully!')
			})
		})

	}
}

InitCommand.description = `init command used to intialise hasura connect configuration file at the current directory
...
`

InitCommand.flags = {
	HASURA_HOST: flags.string({ char: 'h', description: 'hasura host url' }),
	MQTT_HOST: flags.string({ char: 'm', description: 'mqtt host url' }),
	MQTT_CHANNEL: flags.string({ char: 'c', description: 'MQTT channel' }),
	MODE: flags.string({
		char: 'm',
		description: 'mode : sparkplug or normal',
	}),
}

module.exports = InitCommand
