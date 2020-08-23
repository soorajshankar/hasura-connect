export function getMutation(message, topic) {
	const device_id = topic.split('/')[1]
	const timestamp = new Date().toISOString()
	// console.log(message)
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
}