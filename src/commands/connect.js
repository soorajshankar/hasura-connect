const { Command, flags } = require('@oclif/command')
var mqtt = require('mqtt')
var fs = require('fs')
var fetch = require('node-fetch')
var sparkplug = require('sparkplug-payload').get('spBv1.0')

let debug = false

class ConnectCommand extends Command {
	async run() {
		const { flags } = this.parse(ConnectCommand)
		if (flags.debug) debug = true
		this.loadConfig(this.subScribeMQTT)
	}
	async loadConfig(subscribe) {
		fs.readFile('config.json', 'utf8', function (err, data) {
			if (err) throw err
			const config = JSON.parse(data)
			if (!config.HASURA_HOST || !config.MQTT_HOST)
				throw 'Invalid configuration file detected'
			subscribe(config)
		})
	}
	async subScribeMQTT({ HASURA_HOST, MQTT_HOST }) {
		var client = mqtt.connect(MQTT_HOST)
		client.on('connect', function () {
			debug && debug && console.log('CONNECTED')
			client.subscribe('spBv1.0/#', function (err) {
				if (!err) {
					console.log('Connected & subscibed to MQTT broker')	
					debug && console.log('SUBSCRIBED TO spBv1.0/#')
					//       client.publish("spBv1.0/test", "Hello mqtt"); // test publish
				}
			})
		})

		client.on('message', function (topic, message) {
			// message is Buffer
			debug && console.log(topic)
			const decoded = { message: decode(message), ...parseTopic(topic) }
			debug && console.log('_DECODED')

			sendToHasura(decoded, HASURA_HOST)
		})
	}
}
function sendToHasura(
	{
		message = "{test:'test'}",
		device_id = 'testDevice',
		timestamp = new Date().toISOString(),
	},
	HASURA_HOST
) {
	debug &&
		console.log(
			JSON.stringify(
				{
					data: JSON.stringify(message),
					device_id,
					timestamp: message.timestamp || timestamp,
				},
				null,
				2
			)
		)
	fetch(`${HASURA_HOST}/v1/graphql`, {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9,ml;q=0.8',
			'content-type': 'application/json',
			'x-hasura-admin-secret': 'xghoglwsefhhdtofjwtvkrkykivpfowv',
			// 'X-Hasura-User-Id': device_id,
		},
		body: JSON.stringify({
			query:
				'mutation AddDeviceData($data: jsonb!, $device_id: String!, $timestamp: timestamptz!) {  insert_device_data(objects: {data: $data, device_id: $device_id, timestamp: $timestamp}) {    returning {      device_id      id    }  }}',
			variables: {
				data: JSON.stringify(message),
				device_id,
				timestamp:
					new Date(message.timestamp).toISOString() || timestamp,
			},
			operationName: 'AddDeviceData',
		}),
		method: 'POST',
	})
		.then((res) => res.json())
		.then((resp) => debug && console.log(JSON.stringify(resp, null, 2)))
}

function decode(encoded) {
	return sparkplug.decodePayload(encoded)
}

function parseTopic(topic) {
	// namespace/group_id/message_type/edge_node_id/[device_id]
	if (topic.length && topic.split('/').length === 5) {
		const arr = topic.split('/')
		return {
			namespace: arr[0],
			group_id: arr[1],
			message_type: arr[2],
			edge_node_id: arr[3],
			device_id: arr[4],
		}
	}
	return {}
}

ConnectCommand.description = `Describe the command here
...
Extra documentation goes here
`

ConnectCommand.flags = {
	// name: flags.string({ char: 'n', description: 'name to print' }),
	debug: flags.boolean({
		char: 'd',
		description: 'pass true to enable debugging ',
	}),
}

module.exports = ConnectCommand
