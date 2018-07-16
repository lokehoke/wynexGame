'use strict';

const express = require('express');

let app = express();

app.use(express.static('public'));

app.listen(1337, (res, req) => {
	console.log('warking');
});