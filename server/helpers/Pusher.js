const Pusher = require('pusher')

var pusher = new Pusher({
   appId: '1097721',
   key: 'd7374f71e545a295d4f4',
   secret: '96a7999925ed80513928',
   cluster: 'ap1',
   encrypted: true,
   // useTLS: true
});

module.exports = {pusher}