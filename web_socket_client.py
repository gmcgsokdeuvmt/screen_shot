import time
from websocket import create_connection

def send_word_wait_one_sec(word):
    print("send: %s"% str(word))
    ws.send(str(word))

    result =  ws.recv()
    print("Received: %s" % result)
    time.sleep(1)


if __name__ == '__main__':
    uri = "ws://localhost:8000/"
    ws = create_connection(uri)
 
    word = 1
    
    while True:
        send_word_wait_one_sec(word)
        word += 1
    
    ws.close()