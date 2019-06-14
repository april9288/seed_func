const faker = require('faker');

let fakeImage = "https://loremflickr.com/320/240/fashion"

const keyword = () => {
	return faker.commerce.productName()
}

const image1 = () => {
	return [fakeImage,fakeImage,fakeImage]
}

const image2 = () => {
	return [fakeImage,fakeImage,fakeImage]
}

module.exports = {
	keyword,
	image1,
	image2
}
