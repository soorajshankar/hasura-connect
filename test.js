var mqtt = require('mqtt')
var client = mqtt.connect('http://127.0.0.1:1883')

client.on('connect', function () {
	client.publish('payloads/device2', '{"data":"ss mqtt"}', null, () => {
		console.log('published')
	})
})
