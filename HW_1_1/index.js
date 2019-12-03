const reverse = str => Array.from(str).reverse().join('');

process.stdin.on('data', function (data) {
  process.stdout.write( reverse(data.toString().trim())+'\n' );
});
