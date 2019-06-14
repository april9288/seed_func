const fs = require('fs');
const {	keyword , image1, image2 } = require('./random.js');
const writeStream = fs.createWriteStream('pg_copy.csv', {flags : 'a'}); 

let counter = 1
const sampleData = () => {
	let oneRow = ''
	oneRow += `${counter}|`
	oneRow += `${keyword()}|`
	oneRow += `{${image1()}}|`
	oneRow += `{${image2()}}`
	oneRow += '\n'

	counter++
	return oneRow
}

let loop = 100//10000000 - 1
const mainGenerator = async () => {
	if (loop % 1000 === 0) {
		process.stdout.write('.')
	}
	let ok = true
	while(ok && loop > 0) {
		loop--
		ok = await writeStream.write(sampleData(), 'utf-8')
	}
	if (loop > 0) {
		writeStream.once('drain', mainGenerator)
	}

	if (loop === 0) {
		//last time
		await writeStream.write(sampleData(), 'utf-8')
	}
}


process.stdout.write('processing.')
mainGenerator()
