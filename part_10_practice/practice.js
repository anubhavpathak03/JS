const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 1 resolved');
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise 2 rejected');
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise 3 rejected');
  }, 1000);
});

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log(result); // Output: "Promise 3 rejected" (since it rejects first)
  })
  .catch((error) => {
    console.error(error); // Output: "Promise 3 rejected"
  });