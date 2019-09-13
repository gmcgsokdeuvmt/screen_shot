from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import screen_shot

class SimpleEcho(WebSocket):
 
    def handleMessage(self):
        # echo message back to client
        print(self.address, self.data)
        
        self.sendMessage('ok')
 
 
    def handleConnected(self):
        print(self.address, 'connected')
 
    def handleClose(self):
        print(self.address, 'closed')

class CaptureImage(WebSocket):
     
    def handleMessage(self):
        print(self.address, self.data)
        img = screen_shot.capture_img()
        obj = screen_shot.encode_img_to_fileobj(img)
        encoded_obj = screen_shot.encode_fileobj_to_base64(obj)
        datauri = screen_shot.base64_to_datauri(encoded_obj)
        self.sendMessage(datauri)
 
    def handleConnected(self):
        print(self.address, 'connected')
 
    def handleClose(self):
        print(self.address, 'closed')

def launchWebsocketServer(serverClass, port=8000):
    server = SimpleWebSocketServer('', port, serverClass)
    return server

if __name__ == '__main__':
    #server = launchWebsocketServer(serverClass=SimpleEcho,port=8000)
    #server.serveforever()

    server = launchWebsocketServer(serverClass=CaptureImage,port=8000)
    server.serveforever()
    