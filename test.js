var mqtt = require('mqtt')
var os = require('os')
var client = mqtt.connect('http://127.0.0.1:1883')

client.on('connect', function () {
	setInterval(() => {
		client.publish('payloads/device2', `{"data":"ss sass","time":${Date.now()},}"cpu:"${JSON.stringify(os.cpus())}}`)
	}, 1000)
})
