$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];
  // Initialize varibles
  //var $server = "http://jazmine.co.in:3000";
  var $server = "https://virtual-girl.herokuapp.com";
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $myInput = $('.myInput');
  var $roomName = $('.roomnameInput'); //RoomName
  var $iframe = $('#sc-widget')[0];

  var widget = SC.Widget($iframe);
  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  var $roomsAvailable = $('#roomNames')
  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput ;
  var virtual_girl = 'Jazmine';
  var socket = io();
  //var socket = io.connect("http://jazmine.co.in:8080");


  $myInput.change(function(){
       $.ajax({
          url: $server,
          dataType: 'json',
          crossDomain: true,
          data: {ques: $myInput.val()},
          success: (function( msg ) {
              var msgs = msg;
              if (typeof msgs.say == "string"){
                  var vMessage = msg.say
              }else{
                  var vMessage = msg.say[Object.getOwnPropertyNames(msg.say)[0]];
              }

              if (vMessage == "error"){
                  var message = $myInput.val();
                  if (message.match(/amaze me/i) != null){
                      if ((message.match(/amaze me/i) !== 'undefined') && (message.match(/amaze me/i).length > 0 )) {
                          socket.emit('play_music', {setVolume: 100,prev:false, play:true, next: false,pause:false});
                          widget.setVolume(100);
                          widget.skip(Math.floor((Math.random() * 56) + 1));
                          widget.play();
                      }
                  } else if (message.match(/play some music/i) != null){
                      if ((message.match(/play some music/i) !== 'undefined') && (message.match(/play some music/i).length > 0 )) {
                          socket.emit('play_music',  {setVolume: 100,prev:false, play:true, next: false,pause:false});
                          widget.setVolume(100);
                          widget.play();
                      }
                  } else if (message.match(/play next/i) != null){
                      if ((message.match(/play next/i) !== 'undefined') && (message.match(/play next/i).length > 0 )) {
                          socket.emit('play_music', {setVolume: 100,prev:false, play:false, next: true,pause:false});
                          widget.setVolume(100);
                          widget.next();
                      }
                  } else if (message.match(/play previous/i) != null){
                      if ((message.match(/play previous/i) !== 'undefined') && (message.match(/play previous/i).length > 0 )) {
                          socket.emit('play_music',  {setVolume: 100,prev:true, play:false, next: false,pause:false});
                          widget.setVolume(100);
                          widget.prev();
                      }
                  } else if (message.match(/pause/i) != null){
                      if ((message.match(/pause/i) !== 'undefined') && (message.match(/pause/i).length > 0 )) {
                          socket.emit('play_music',  {setVolume: 100,prev:false, play:false, next: false,pause:true});
                          widget.setVolume(100);
                          widget.pause();
                      }
                  }
              } else {

                  addChatMessage({
                      username: virtual_girl,
                      message: vMessage
                  })
                  socket.emit('new message', { username: virtual_girl ,message: vMessage,youtube: false});
              }
          })
       });



      addChatMessage({
         username: $usernameInput.val().trim(),
         message: $myInput.val()
     })
  });
  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "You are the only participant in "+ data.room+", You can try chating with Jazmine!";
    } else {
      message += "there are " + data.numUsers + " participants in "+ data.room;
    }
    log(message);
  }

  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());
    roomname = cleanInput($roomName.val().trim());
    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell server the room name
      socket.emit('setRoom',roomname);
      // Tell the server your username
      socket.emit('add user', username);

    }
  }

   function ask_sam(message){
       if (message.match(/@/g) != null){
           if ((typeof message.match(/@/g) !== 'undefined') && (message.match(/@/g).length > 0)) {
               $.ajax({
                   url: $server,
                   dataType: 'json',
                   crossDomain: true,
                   data: { ques: message.replace("@", "")},
                   success: (function( msg ) {
                       var msgs = msg;
                       if (typeof msgs.say == "string"){
                           var val = msg.say
                       }else{
                           var val = msgs.say[Object.getOwnPropertyNames(msgs.say)[0]];
                       }
                       addChatMessage({
                           username: virtual_girl,
                           message: val
                       })
                       socket.emit('new message', { username: virtual_girl ,message: val, youtube: false});
                   })
                });
           }
       } else if (message.match(/amaze me/i) != null){
           if ((message.match(/amaze me/i) !== 'undefined') && (message.match(/amaze me/i).length > 0 )) {
               socket.emit('play_music', {setVolume: 100,prev:false, play:true, next: false,pause:false});

               widget.setVolume(100);
               widget.skip(Math.floor((Math.random() * 56) + 1));
               widget.play();
           }
       } else if (message.match(/play some music/i) != null){
           if ((message.match(/play some music/i) !== 'undefined') && (message.match(/play some music/i).length > 0 )) {
               socket.emit('play_music',  {setVolume: 100,prev:false, play:true, next: false,pause:false});
               widget.setVolume(100);
               widget.play();
           }
       } else if (message.match(/play next/i) != null){
           if ((message.match(/play next/i) !== 'undefined') && (message.match(/play next/i).length > 0 )) {
               socket.emit('play_music', {setVolume: 100,prev:false, play:false, next: true,pause:false});
               widget.setVolume(100);
               widget.next();
           }
       } else if (message.match(/play previous/i) != null){
           if ((message.match(/play previous/i) !== 'undefined') && (message.match(/play previous/i).length > 0 )) {
               socket.emit('play_music',  {setVolume: 100,prev:true, play:false, next: false,pause:false});
               widget.setVolume(100);
               widget.prev();
           }
       } else if (message.match(/pause/i) != null){
           if ((message.match(/pause/i) !== 'undefined') && (message.match(/pause/i).length > 0 )) {
               socket.emit('play_music',  {setVolume: 100,prev:false, play:false, next: false,pause:true});
               widget.setVolume(100);
               widget.pause();
           }
       }

   }
  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
        if (message.match(/^\*/g) != null){
          query = message.replace("*","");
          var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&&order_by=rating&&q="+query+"&&type=video&key=AIzaSyDRpnBif-8GCtc4E5DOcLXe2aDBVsdY6BQ";
          $.ajax({
              url: url,
              crossDomain: true
          })
          .done(function( msg ) {
              addChatMessage({
                   username: username,
                   youtube: true,
                   videoId: msg.items[0].id.videoId
              });
          });
          socket.emit('new message', { username: username ,message: query,youtube: true});
      } else if(message.match(/f\*\*dsam/g) != null){
          var feed_data = JSON.parse(message)["f**dsam"]
          socket.emit('feed data', feed_data);
      } else {
          ask_sam(message);
          addChatMessage({
              username: username,
              message: message
          });
          // tell server to execute 'new message' and send along one parameter
          socket.emit('new message', message);
      }
    }
  }

  // Log a message
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }
    if (data.youtube == true){
        var src = "http://www.youtube.com/embed/"+data.videoId+"?autoplay=1";
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<iframe width="100%" height="100%" src='+src+'></iframe>');
        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    } else {
        if (data.username == virtual_girl){

            responsiveVoice.speak(String(data.message.trim()));
            var widgetIframe = document.getElementById('sc-widget'),
                widget = SC.Widget(widgetIframe);
            if(responsiveVoice.isPlaying()) {
                widget.setVolume(0.25);
            }else{
                widget.setVolume(100);
            }
        }
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<span style="font-size: 1.1em" class="messageBody">')
            .text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message" style="text-align: left;"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
//    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
//      $currentInput.focus();
//    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    //$currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome, you are in "+ data.room;
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  updateRooms = function(data){
      for (var key in Object.keys(data.rooms)) {
          if ((data.rooms)[Object.keys(data.rooms)[key]].users.length != 0){
            $roomsAvailable.append(($("<li style=padding-top:1em;cursor:pointer;background-color:"+getUsernameColor(Object.keys(data.rooms)[key])+">"+Object.keys(data.rooms)[key] +" <span class='glyphicon glyphicon-user' aria-hidden='true'> </span> <span class='badge'>" +Object.keys((data.rooms[Object.keys(data.rooms)[key]]).users).length+"</span>"+"</li>").bind('click',function(){ updateRoom( this.textContent )})));
          }
      }

  };
    getLocation = function(){
        $.ajax( {
            url: 'https://freegeoip.net/json/',
            crossDomain: true,
            type: 'POST',
            dataType: 'jsonp',
            success: function(location) {
                // example where I update content on the page.
                window.localStorage.setItem("city", location.city);
                window.localStorage.setItem("region-code",location.region_code);
                window.localStorage.setItem("region-name",location.region_name);
                window.localStorage.setItem("areacode",location.areacode);
                window.localStorage.setItem("ip",location.ip);
                window.localStorage.setItem("longitude",location.longitude);
                window.localStorage.setItem("latitude",location.latitude);
                window.localStorage.setItem("country-name",location.country_name);
                window.localStorage.setItem("country-code",location.country_code);
            }
        });
    };

    socket.on('getRooms',function(data){
      getLocation();
      updateRooms(data);
      var randomRoomName = selectRandomRoom(data);
        window.localStorage.setItem("rooms",randomRoomName);
  });

    selectRandomRoom = function(data){
        var randomRoom;
        for (var key in Object.keys(data.rooms)) {
            if ((data.rooms)[Object.keys(data.rooms)[key]].users.length != 0){
                randomRoom = Object.keys(data.rooms)[Math.floor(Math.random()*(Object.keys(data.rooms)).length)];
            }
        }
        return randomRoom;
    };




  updateRoom = function(newRoom){
      var newRoom = newRoom.split("  ")[0];
      username = cleanInput($usernameInput.val().trim());
      roomname = cleanInput(newRoom.trim());
      // If the username is valid
      if (username) {
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          // Tell server the room name
          socket.emit('setRoom',roomname);
          // Tell the server your username
          socket.emit('add user', username);

      }else{
          $usernameInput = "Anonymous User ";
          username = "Anonymous User ";
          $loginPage.fadeOut();
          $chatPage.show();
          $loginPage.off('click');
          $currentInput = $inputMessage.focus();

          // Tell server the room name
          socket.emit('setRoom',roomname);
          // Tell the server your username
          socket.emit('add user', username);
      }
  };
    peopleNearMe = function(){

            var newRoom = window.localStorage.getItem("city");
            if (newRoom == ""){
                newRoom = window.localStorage.getItem("country-name");
            }
            username = cleanInput($usernameInput.val().trim());
            roomname = cleanInput(newRoom.trim());
            // If the username is valid
            if (username) {
                $loginPage.fadeOut();
                $chatPage.show();
                $loginPage.off('click');
                $currentInput = $inputMessage.focus();

                // Tell server the room name
                socket.emit('setRoom',roomname);
                // Tell the server your username
                socket.emit('add user', username);

            } else {
                username = "Anonymous User "
                $loginPage.fadeOut();
                $chatPage.show();
                $loginPage.off('click');
                $currentInput = $inputMessage.focus();

                // Tell server the room name
                socket.emit('setRoom',roomname);
                // Tell the server your username
                socket.emit('add user', username);

            }
    };

    trustYourDestiny = function(){
        var newRoom = window.localStorage.getItem("rooms");
        username = cleanInput($usernameInput.val().trim());
        roomname = cleanInput(newRoom.trim());
        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell server the room name
            socket.emit('setRoom',roomname);
            // Tell the server your username
            socket.emit('add user', username);

        } else {
            username = "Anonymous User "
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell server the room name
            socket.emit('setRoom',roomname);
            // Tell the server your username
            socket.emit('add user', username);

        }
    };

    peopleNotSoNearMe = function(){
        var newRoom = window.localStorage.getItem("region-name");
        if (newRoom == ""){
            newRoom = window.localStorage.getItem("country-name");
        }
        username = cleanInput($usernameInput.val().trim());
        roomname = cleanInput(newRoom.trim());
        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell server the room name
            socket.emit('setRoom',roomname);
            // Tell the server your username
            socket.emit('add user', username);

        } else {
            username = "Anonymous User"
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell server the room name
            socket.emit('setRoom',roomname);
            // Tell the server your username
            socket.emit('add user', username);

        }
    }

  socket.on('play_music',function(data){
      if (data.play == true){
          widget.setVolume(data.setVolume);
          widget.play();
      }else if (data.next == true){
          widget.setVolume(data.setVolume);
          widget.next();
      }else if (data.prev == true){
          widget.setVolume(data.setVolume);
          widget.prev();
      }else if (data.pause == true){
          widget.setVolume(data.setVolume);
          widget.pause();
      }else{
          widget.setVolume(data.setVolume);
          widget.pause();
      }
  })
  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined ' + data.room);
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left ' + data.room);
      if (data.numUsers == 0){
          window.localStorage.removeItem(data.room);
      }
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });
});
