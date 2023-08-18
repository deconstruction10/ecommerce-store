/* eslint-disable */

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is routing between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
