import { ChatFeed, Message } from 'react-chat-ui';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

const Chat = ({ auth, user }) => {
  var socket = io();
  const [refreshMessage, setRefreshMessage] = useState('');
  const [message, setMessage] = useState('');
  const messageArray = [];
  // const [localUser, setLocalUser] = useState([]);
  // const [locaChat, setLocalChat] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    // new Message({
    //   id: 1,
    //   message: "I'm the recipient! (The person you're talking to)",
    // }), // Gray bubble
    // new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
  ]);

  useEffect(() => {
    axios.get(`/api/chat/${user.id}/${auth.id}`).then((response) => {
      if (!response.data) {
        axios.post('/api/createchat', [auth.id, user.id]).then((response) => {
          window.localStorage.setItem('chat', JSON.stringify(response.data));
        });
      } else {
        window.localStorage.setItem('chat', JSON.stringify(response.data));
      }
    });
  });

  const localUser = JSON.parse(window.localStorage.getItem('user'));
  const localChat = JSON.parse(window.localStorage.getItem('chat'));
  // useEffect(() => {
  // let localUserIfPresent = JSON.parse(window.sessionStorage.getItem('user'));
  // let localChatIfPresent = JSON.parse(window.sessionStorage.getItem('chat'));
  //   if (localUserIfPresent) {
  //     setLocalUser(localUserIfPresent);
  //   }
  //   if (localChatIfPresent) {
  //     setLocalChat(localChatIfPresent);
  //   }
  // }, [setLocalUser, setLocalChat]);

  // const getMessages = async (id) => {
  //   const response = await axios.get(`/api/getMessages/${id}`);
  //   response.data.forEach((messageObj) => {
  //     if (messageObj.sender_id === auth.id) {
  //       messageArray.push(
  //         new Message({
  //           id: 0,
  //           message: messageObj.message,
  //           senderName: messageObj.sender_id,
  //         })
  //       );
  //     } else {
  //       messageArray.push(
  //         new Message({
  //           id: 1,
  //           message: messageObj.message,
  //           senderName: messageObj.sender_id,
  //         })
  //       );
  //     }
  //     setMessages([...messageArray]);
  //   });
  // };

  // useEffect(() => {
  //   getMessages(localChat.id);
  // }, []);

  useEffect(() => {
    console.log('messages that should be displaying: ', messages);
  }, [setMessages]);

  useEffect(() => {
    console.log('refreshMessage triggered');
    axios.get(`/api/getMessages/${localChat.id}`).then((response) => {
      console.log(
        'all messages in this chat from getMessages: ',
        response.data
      );
      response.data.forEach((messageObj) => {
        //console.log('each message: ', messageObj);
        if (messageObj.sender_id === auth.id) {
          let count = messageArray.push(
            new Message({
              id: 0,
              message: messageObj.message,
            })
          );
          //console.log('count is: ', count);
        } else {
          let count = messageArray.push(
            new Message({
              id: 1,
              message: messageObj.message,
            })
          );
        }
      });
      setMessages([...messageArray]);
    });
  }, []);

  socket.on('chat message', (msg) => {
    const socketMessage = JSON.parse(msg);
    console.log(
      socketMessage.sender_id === auth.id,
      'should be true always right nows',
      socketMessage.sender_id
    );
    if (socketMessage.sender_id === auth.id) {
      console.log(auth.id, 'i send this one it should be a blue bubble');
      setMessages([
        ...messages,
        new Message({ id: 0, message: socketMessage.message }),
      ]);
    } else {
      setMessages([
        ...messages,
        new Message({
          id: 1,
          message: socketMessage.message,
        }),
      ]);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/sendMessages', [localChat.id, auth.id, message, moment()])
      .then((response) => {
        console.log(response);
        socket.emit(
          'chat message',
          JSON.stringify({
            message: message,
            sender_id: response.data.sender_id,
            typing: 'yes',
          })
        );
      });
    // socket.on('is typing', (isTyping) => {
    //   setIsTyping(true);
    // });
    setMessage('');
    setIsTyping(false);
  };

  return (
    <div id="chatPage">
      <span>
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem('chat');
            localStorage.removeItem('user');
          }}
        >
          X
        </Link>
        Chat with: {localUser.firstname + localUser.lastname}
        <form onSubmit={handleSubmit}>
          <ChatFeed
            messages={messages} // Boolean: list of message objects
            isTyping={isTyping} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={{
              text: {
                fontSize: 30,
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40,
              },
            }}
          />
          <input
            type="text"
            value={message}
            onChange={(ev) => {
              setMessage(ev.target.value);
            }}
            placeholder="message"
          />
          <button>Submit</button>
        </form>
      </span>
    </div>
  );
};

export default Chat;

//add delete feature - add two tables in db and have it be renderuser default false
//then upon useeffect if render user is false dont get the old messages

//add online as well
//add notifications for chat -

//separate find players and chat more -

/*In find players
//upon clicking the players name - find players component should pass the user through to chat - roght now using local storage
//then make an http request to see if there is an existing chat or create a new chat if there is a new one
//then take the chat object and ssend it to chat component - right now using local storage

In chat component
run useeffect to look for any messages with the chat id - display messages using set messages

on submit - send the message via http request to save in db and use socket io for the realtime chat portion


*/
