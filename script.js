// Select the output tbody
const output = document.getElementById("output");

// Step 1: Show "Loading..." initially (Cypress expects tr#loading)
const loadingRow = document.createElement("tr");
loadingRow.id = "loading"; // important for the test
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Step 2: Function to create a promise that resolves after random delay (1–3 seconds)
function createPromise(name) {
  const delay = (Math.random() * 2 + 1).toFixed(3); // Random between 1 and 3
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, time: Number(delay) }), delay * 1000);
  });
}

// Step 3: Create 3 promises
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

const startTime = performance.now(); // Start timer

// Step 4: Use Promise.all() to wait for all
Promise.all([promise1, promise2, promise3]).then((results) => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  // Remove "Loading..." row
  output.innerHTML = "";

  // Step 5: Populate rows for each promise
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Step 6: Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime}</strong></td>
  `;
  output.appendChild(totalRow);
});
