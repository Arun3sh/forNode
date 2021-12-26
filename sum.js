// const sum = (a, b) => +a + +b;
// const [, , num1, num2] = process.argv;
// console.log(sum(num1, num2));
// const os = require('os');
// console.log('Free memory', os.freemem());
// console.log('version', os.version());
// console.log('Processor', os.cpus());

// fs.readFile('./names.txt', 'utf-8', (err, data) => {
// 	console.log(data);
// });

// const data = '\nVike';

// fs.appendFile('./names.txt', data, (err) => {
// 	console.log('Completed');
// });
const fs = require('fs');
fs.readFile('./names.txt', 'utf-8', (err, data) => {
	console.log(data);
});

const quote = 'The road to success is always under construction';
const [, , n] = process.argv;
// fs.writeFile('test.html', quote, (err) => {
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log('completed writing');
// });
var dir = './backups';

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
for (let i = 1; i <= +n; i++) {
	fs.writeFile(`./backups/test${i}.html`, quote, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log('completed writing');
	});
}
