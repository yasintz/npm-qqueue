<h1 align="center">Welcome to qqueue 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/qqueue" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/qqueue.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Install

```sh
yarn add qqueue
```

## Usage

```javascript
import qqueue from 'qqueue';
import waait from 'waait';

waait(3000).then(() => {
  console.log(1);
});

waait(1000).then(() => {
  console.log(2);
});
/* 
output
2
1
*/

/* with qqueue */
qqueue
  .push(() => waait(3000))
  .then(() => {
    console.log(1);
  });

qqueue
  .push(() => waait(1000))
  .then(() => {
    console.log(2);
  });
/* 
output
1
2
*/
```

## Author

👤 **yasintz**

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
