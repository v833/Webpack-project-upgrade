const REG = /<script>([\s\S]*)<\/script>/;

module.exports = function (source) {
  const _source = source.match(REG);
  // console.log("_source: ", _source);
  return _source && _source[1] ? _source[1] : source;
};

// if (require.main === module) {
//   const source = `<script>
//   export default {
//     a: 1,
//     b: 2,
//   }
// </script>`;
//   const match = source.match(REG);
//   console.log('match: ', match);
// }
